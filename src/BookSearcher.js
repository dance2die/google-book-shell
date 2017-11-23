const axios = require('axios');

class BookSearcher {
    constructor() {
        this.constants = {
            searchURL: `https://www.googleapis.com/books/v1/volumes`
        };
    }
    
    async getSearchedBooksAsync(book) {
        return new Promise((resolve, reject) => {
            const params = {
                params: {
                    q: book
                }
            };

            axios.get(this.constants.searchURL, params)
                .then(response => {
                    resolve(response.data.items);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}

module.exports = BookSearcher;