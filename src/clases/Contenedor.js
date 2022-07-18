const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename;
    }

    async save(product) {
        try {
            let content = await this.readFile();
            product.id = this.buildId(content);
            
            content.push(product);
            
            await this.writeFile(content);

            return product;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            let content = await this.readFile();
            content = content.filter((product) => product.id === id);
            return content.length == 0 ? null : content;
        } catch (error) {
            console.error(error);
        }
    }
    
    getAll() {
        try {
            return this.readFile();
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteById(id) {
        try {
            let content = await this.readFile();
            this.writeFile(content.filter((product) => product.id !== id));
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteAll() {
        try {
            this.writeFile([]);
        } catch (error) {
            console.error(error);
        }
    }

    async updateById(id, product) {
        try {
            let products = await this.readFile();
            const productFound = await this.getById(id);
            
            if (!productFound) {
                return productFound
            }
            
            let index = products.findIndex((product) => product.id == id);

            products.splice(index, 1, product);
            this.writeFile(products);

            return `Product with ID: ${id} Updated`;

        } catch (error) {
            console.error(error);
        }
    }
    
    async readFile() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
        } catch (error) {
            console.error(error);
        }
    }
    
    async writeFile(content) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(content));
        } catch (error) {
            console.error(error);
        }
    }

    buildId(content) {
        try {
            if (content.length === 0) {
                return 1;
            } else {
                content.sort((a, b) => (a.id > b.id ? 1 : -1));
                return content[content.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Contenedor;