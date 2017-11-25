const axios = require('axios');

class AmazonProductAPIRepository {
    constructor() {
        this.constants = {
            searchURL: `https://amazonproductapibyisbn.azurewebsites.net/api/GetAmazonBookByISBN?code=5Y3wX6lcBc7WpVH/KpHnKDCD9uM0GZHSD1HTnZfPzvMniUMcxDnUEQ==`
        };
    }
    
    async getBookAsync(isbn) {
        return new Promise((resolve, reject) => {
            const params = {
                params: { isbn }
            };

            axios.get(this.constants.searchURL, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}

module.exports = AmazonProductAPIRepository;