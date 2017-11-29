const d = require('debug')('GoogleBookSearchShell');

const CommandBuilder = require('./commands/CommandBuilder');
const BookSearchService = require('./services/BookSearchService');


class GoogleBookSearchShell {
    constructor() {
        this.books = [];

        this.BookSearchService = new BookSearchService();

        this.vorpal = null;
    }

    async setupCommands() {
        return new CommandBuilder().buildAsync();
    }

    async run() {
        const vorpal = await this.setupCommands();

        vorpal
            .delimiter('google book search$')
            .show();
    }
}

module.exports = GoogleBookSearchShell;