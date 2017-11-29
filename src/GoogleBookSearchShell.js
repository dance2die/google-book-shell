const d = require('debug')('GoogleBookSearchShell');
const opn = require('opn');
const vorpal = require('vorpal')();
const inquirer = require('inquirer-question');
const ora = require('ora');
const chalk = require('chalk');

const BookSearchService = require('./services/BookSearchService');
const Writer = require('./Writer');

class GoogleBookSearchShell {
    constructor() {
        this.books = [];

        this.BookSearchService = new BookSearchService();
        this.writer = new Writer();
    }

    validateBookNumber(number) {
        if (number == undefined) return true;

        // make sure that a user has entered a numeric value.
        if (!Number.isInteger(number)) {
            return "Enter a number for <number> argument!";
        }
        // remind user to search for a book first
        else if (this.books.length === 0) {
            return "Search for a book first...";
        }
        // check that number falls between the searched book count
        else if (0 >= parseInt(number) || parseInt(number) > this.books.length) {
            return `Enter a number between 1 and ${this.books.length}`;
        }

        return true;
    }

    async getAmazonBookURLByISBN(isbn) {
        const books = await this.BookSearchService.getAmazonBookAsync(isbn);
        d("getAmazonBookURLByISBN.books", books);
        return books[0].DetailPageURL[0];
    }

    async setupCommands() {
        // "search" command
        vorpal
            .command('search <book>', 'search for a book in Google Books')
            .alias('s')
            .action(async (args, callback) => {
                this.books = await this.BookSearchService.getGoogleBooks(args.book);
                this.writer.printBooks(this.books);

                callback();
            });

        // "open" in browser command
        vorpal
            .command('open <number>', 'open # in searched book list')
            // Populate 1-N https://stackoverflow.com/a/34388474/4035
            // .autocomplete(Array(10).fill().map((e,i) => (i + 1).toString()))
            .alias('o')
            // Get Amazon Book link.
            .option('-a, --amazon', 'open Amazon link')
            // If you are uncomfortable with Affiliate links, strip it out
            .option('-s, --strip-amazon-affiliate', 'strip affiliate query parameter')
            // later on add options to open preview, info links.
            .validate(args => this.validateBookNumber(args.number))
            .action(async (args, callback) => {
                const bookIndex = args.number - 1;
                const book = this.books[bookIndex];
                let bookURL = book.volumeInfo.previewLink;
                d("args", args);

                if (args.options.amazon) {
                    const spinner = ora(chalk.red('Fetching data from Amazon Product Advertising API...')).start();

                    try {
                        const isbns = book.volumeInfo.industryIdentifiers;
                        // isbn[0] = ISBN 10, while isbn[1] contains ISBN 13
                        const isbn = isbns && isbns[0] ? isbns[0].identifier : "";
                        bookURL = await this.getAmazonBookURLByISBN(isbn);

                        spinner.stop();

                        // Remove Amazon affiliate link if user choose to do so.
                        if (args.options["strip-amazon-affiliate"]) {
                            bookURL = bookURL.split('?')[0];
                        }
                    } catch (ex) {
                        spinner.fail('Error while fetching Amazon URL from Product Advertising API...');
                    } finally {
                        spinner.clear();
                    }
                }

                d("finally bookURL", bookURL);
                opn(bookURL);

                callback();
            });

        // "view" (description) command
        vorpal
            .command('view [number]', 'view detailed description of the book')
            .alias('v')
            .validate(args => this.validateBookNumber(args.number))
            .action(async (args, callback) => {
                if (args.number) {
                    this.writer.viewBookDescription(this.books[args.number - 1]);
                } else {
                    vorpal.hide();

                    // build choices
                    let choices = {};
                    this.books.forEach((book, i) => {
                        let number = (i + 1).toString().padStart(2, '0');
                        const choice = `${number}: ${book.volumeInfo.title}`;
                        choices[choice] = i;
                    });

                    inquirer.prompt({
                        type: 'list',
                        message: 'Select a book to view the detail',
                        choices: choices
                    }).then((result) => {
                        // console.log(result); //=> 1 or 2
                        this.writer.viewBookDescription(this.books[result]);
                        vorpal.show();
                    });
                }


                callback();
            });

        // "print" searched books
        vorpal
            .command("print", "print searched books")
            .alias('p')
            .action((args, callback) => {
                this.writer.printBooks(this.books);

                callback();
            });
    }

    async run() {
        await this.setupCommands();

        vorpal
            .delimiter('google book search$')
            .show();
    }
}

module.exports = GoogleBookSearchShell;