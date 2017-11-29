const axios = require('axios');

class BookSearchService {
    constructor() {
        this.constants = {
            googleBookSearchURL: `https://www.googleapis.com/books/v1/volumes`,
            amazonBookSearchURL: `https://amazonproductapibyisbn.azurewebsites.net/api/GetAmazonBookByISBN?code=5Y3wX6lcBc7WpVH/KpHnKDCD9uM0GZHSD1HTnZfPzvMniUMcxDnUEQ==`
        };
    }
    
    async getGoogleBooks(book) {
        return new Promise((resolve, reject) => {
            const params = {
                params: {
                    q: book
                }
            };

            axios.get(this.constants.googleBookSearchURL, params)
                .then(response => {
                    resolve(response.data.items);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    async getAmazonBookAsync(isbn) {
        return new Promise((resolve, reject) => {
            const params = {
                params: { isbn }
            };

            axios.get(this.constants.amazonBookSearchURL, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}

module.exports = BookSearchService;