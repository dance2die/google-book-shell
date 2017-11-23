const chalk = require('chalk');

const log = console.log;

class Writer {
    constructor() {
        this.chalks = {
            name: chalk.bgRgb(15, 100, 204),
            title: chalk.blue
        }
    }

    printBooks(books) {
        books.forEach((book, i) => {
            let number = (i + 1).toString().padStart(2, '0');
            log(`${this.chalks.name(number)}: ${this.chalks.title(book.volumeInfo.title)}`);
        });
    }

    logDescription(name, value) {
        log(`${this.chalks.title(name)}: ${value || ""}`);
    }

    viewBookDescription(book) {
        // volumeInfo => 
        // title, subtitle, authors, publisher, publishDate, description, 
        //      => industryIdentifiers
        //          0.type = "ISBN_10", 0.identifier = "1234341"
        //          1.type = "ISBN_13", 1.identifier = "91701927309123"
        //      => pageCount: 256
        //      => categories: 0: "Computers"
        const {
            title, subtitle, authors, 
            publisher, publishedDate, description,
            industryIdentifiers, pageCount, categories,
        } = book.volumeInfo;

        this.logDescription("Title", title);
        this.logDescription("Subtitle", subtitle);
        this.logDescription("Authors", authors ? authors.join(", ") : "");
        this.logDescription("Publisher", publisher);
        this.logDescription("Published Date", publishedDate);
        this.logDescription("ISBN 10", industryIdentifiers && industryIdentifiers[0] ? industryIdentifiers[0].identifier: "");
        this.logDescription("ISBN 13", industryIdentifiers && industryIdentifiers[1] ? industryIdentifiers[1].identifier : "");
        this.logDescription("Page Count", pageCount);
        this.logDescription("Categories", categories ? categories.join(", ") : "");
        this.logDescription("description", description);
    }
}

module.exports = Writer;