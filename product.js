class Product{   

    #productId;
    #productName;
    #productCategory;
    #productPrice;
    #unitsInStock;

    constructor(productId,productName,productCategory,productPrice,unitsInStock){
            this.#productId = productId
            this.#productName=productName;
            this.#productCategory=productCategory;
            this.#productPrice=productPrice;
            this.#unitsInStock=unitsInStock;
    }

    get productId() {return `${this.#productId}`;}

    set productName(name) {this.#productName=name;}
    get productName() {return `${this.#productName}`;}

    set productCategory(category) {this.#productCategory=category;}
    get productCategory() {return `${this.#productCategory}`;}

    set productPrice(price) {this.#productPrice=price;}
    get productPrice() {return `${this.#productPrice}`;}

    set unitsInStock(units) {this.#unitsInStock=units;}
    get unitsInStock() {return `${this.#unitsInStock}`;}

}





