const d = require('debug')('shell');
const opn = require('opn');
const vorpal = require('vorpal')();

const BookSearcher = require('./BookSearcher');
const Writer = require('./Writer');

class GoogleBookSearchShell {
    constructor() {
        this.books = [];
        this.bookSearcher = new BookSearcher();

        this.writer = new Writer();
    }

    validateBookNumber(number) {
        // make sure that a user has entered a numeric value.
        if (!Number.isInteger(number)) {
            return "Enter a number for <number> argument!";
        }
        // remind user to search for a book first
        else if (this.books.length === 0) {
            return "Search for a book first...";
        }
        // check that number falls between the searched book count
        else if (parseInt(number) > this.books.length) {
            return "Enter a number less than the number of books returned from the search...";
        }

        return true;
    }

    async setupCommands() {
        // "search" command
        vorpal
            .command('search <book>', 'search for a book in Google Books')
            // .option('-n, --number <number>', 'Hackernews #')
            .action(async (args, callback) => {
                this.books = await this.bookSearcher.getSearchedBooksAsync(args.book);
                this.writer.printBooks(this.books);

                callback();
            });

        // "open" in browser command
        vorpal
            .command('open <number>', 'open # in searched book list')
            // later on add options to open preview, info links.
            .validate(args => this.validateBookNumber(args.number))
            .action(async (args, callback) => {
                const bookURL = this.books[args.number - 1].volumeInfo.previewLink;
                opn(bookURL);

                callback();
            });

        // "view" (description) command
        vorpal
            .command('view <number>', 'view detailed description of the book')
            .validate(args => this.validateBookNumber(args.number))
            .action(async (args, callback) => {
                this.writer.viewBookDescription(this.books[args.number - 1]);

                callback();
            });

        // "print" searched books
        vorpal
            .command("print", "print searched books")
            .action((args, callback) =>{
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