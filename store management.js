window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
})

class Shop {

    products=[];
    outOfStock=[]

    constructor(products){
        this.products=products;
        this.getAllProducts(this.products);
    }

    getAllProducts(products){
    if(products){
        products.forEach(product => this.viewProducts(product))
         }
    }  

    viewProducts(product) {
        var element = document.getElementById("temp-card");
        var cln = element.content.cloneNode(true);
        cln.querySelector(".name").innerText = product.productName ;
        cln.querySelector(".id").innerText = "product id:  " + product.productId ;
        cln.querySelector(".price").innerText = "price:  " + product.productPrice + " $ ";
        cln.querySelector(".unitsInStock").innerText = "units in stock:  " + product.unitsInStock;
        cln.querySelector(".deleteProduct").addEventListener("click", () => {
            this.deleteProduct(product)    
        });
        cln.querySelector(".editProduct").addEventListener("click", () => {
            this.editProduct(product)    
        });
        document.getElementById("PoductList").appendChild(cln);
    }

    deleteProduct(productsToDelete){
        let index = this.products.findIndex(p => p === productsToDelete)
        if(index !== -1){
            if(this.products[index].unitsInStock>1){
                this.products[index].unitsInStock-=1;
            }
            else{
                this.products.splice(index , 1);
                this.outOfStock = [...this.outOfStock,productsToDelete];
            }
            this.deleteAndGet();
            this.products.forEach(product => { return (this.viewProducts(product)) });
            alert(`Product: id: ${productsToDelete.productId} name:${productsToDelete.productName} deleted successfully`);

        }
        else
        alert(`This product: id:${productsToDelete.productId} name:${productsToDelete.productName} does not exist in our store `);
    }

    get(){
        document.getElementById("search").style.display = "none";
        this.deleteAndGet();
        this.getAllProducts(this.products);
    }

    deleteAndGet(){
        document.body.removeChild(document.getElementById("PoductList"));
            let div = document.createElement('div');
            div.setAttribute("id", "PoductList");
            document.body.appendChild(div);
    }

    add(){
        document.getElementById("addProd").style.display = "block";
    }

    addProduct() {
        let productId= document.getElementById("pid").value;
        let productName= document.getElementById("pname").value;
        let productCategory= document.getElementById("pcategory").value;
        let productPrice= document.getElementById("pprice").value;
        let unitsInStock= document.getElementById("punitsInStock").value;

        if(productId === "" || productName === "" || productCategory ==="" || productPrice === "" || unitsInStock === ""){
            alert(`Invalid product, please enter all the data do product`);
        }
        else{
            const newProduct = new Product(productId,productName , productCategory, productPrice, unitsInStock);
            let index = this.products.findIndex(p => p === newProduct)
            if(index !== -1){
                    this.products[newProduct].unitsInStock+=1;
            }
            
            else{
            this.products = [...this.products,newProduct]
            }
            alert(`Your product: id: ${newProduct.productId} name:${newProduct.productName} added successfully`);
            document.getElementById("addProd").style.display = "none";
            this.deleteAndGet();
            this.getAllProducts(this.products);

        }

    }
    
    editProduct(productsToEdit){
        document.getElementById("edit").style.display = "block";
        prodIndex = this.products.findIndex((prod => prod.productId === productsToEdit.productId));
        console.log("Before update: ", this.products[prodIndex]);

        document.getElementById("prodId").value= productsToEdit.productId;
        document.getElementById("prodName").value= productsToEdit.productName;
        document.getElementById("prodCategory").value= productsToEdit.productCategory;
        document.getElementById("prodPrice").value= productsToEdit.productPrice;
        document.getElementById("prodUnitsInStock").value= productsToEdit.unitsInStock;
    }

    edit(){
        let productToUpdate = {
            productId: document.getElementById("prodId").value,
            productName: document.getElementById("prodName").value,
            productCategory: document.getElementById("prodCategory").value,
            productPrice: document.getElementById("prodPrice").value,
            unitsInStock: document.getElementById("prodUnitsInStock").value,
        }
        if(productToUpdate.unitsInStock === 0){
            this.deleteProduct(productToUpdate);
        }
        else{
        this.products[prodIndex] = productToUpdate;
        console.log("After update: ", this.products[prodIndex]);
    }
        this.deleteAndGet();
        this.getAllProducts(this.products);
        alert(`Product id: ${productToUpdate.productId} updated successfully`);
        document.getElementById("edit").style.display = "none";

    }

    search(){
        document.getElementById("search").style.display = "block";

    }

    serchBy() {
        let parameter = document.getElementById("parameter").value;
        let selectBox = document.getElementById("selectBox");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        switch (selectedValue) {
            case "productId" : 
                this.serchById(parameter);
                break;
            case "productName" : 
                this.serchByName(parameter)
                break;
            case "outOfStock" :
                document.getElementById("parameter");
                this.serchByOutOfStock();
                break;
            case "closeOutOfStock" :
                document.getElementById("parameter");
                this.serchByCloseOutOfStock();
                break;
        }
        document.getElementById("search").style.display = "none";

    }

    serchById(id){
        let found = this.products.find(p => p.productId === id);
        if(found === undefined){
            alert(`no product with id: ${id}`)
        }
        else{
            this.deleteAndGet();
            this.viewProducts(found);
        }
        document.getElementById("search").style.display = "none";

    } 

    serchByName(name){
        let found = this.products.find(p => p.productName === name);
        if(found === undefined){
            alert(`no product with name: ${name}`)
        }
        else{
            this.deleteAndGet();
            this.viewProducts(found);
        }
        document.getElementById("search").style.display = "none";
        
    }

    serchByOutOfStock(){
        if(this.outOfStock < 1){
            alert(`no out of stock products`);
        }
        else{
            this.deleteAndGet();
            this.getAllProducts(this.outOfStock);
        }    
        document.getElementById("search").style.display = "none";

    }

    serchByCloseOutOfStock(){
        let found = this.products.find(p => p.unitsInStock < 4 );
        if(found === undefined){
            alert(`no product close to out of stock`)
        }
        else{
        let temp=[];
        for(let i = 0; i<this.products.length; i++){
            if(this.products[i].unitsInStock < 4){
                temp = [...temp, this.products[i]];
            }
        }
        this.deleteAndGet();
        this.getAllProducts(temp);
     }
     document.getElementById("search").style.display = "none";
    }

    serchByCategory(){
        let temp = [];
        let selectBox = document.getElementById("selectBoxCatgory");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;
        for( let i = 0; i < this.products.length; i++){
            if(this.products[i].productCategory === selectedValue){
                temp = [...temp, this.products[i]];
            }
        }
        this.deleteAndGet();
        this.getAllProducts(temp);
        document.getElementById("search").style.display = "none";

    }
    

    serchByRange(){
        let temp =[];
        let min = document.getElementById("min").value;
        let max = document.getElementById("max").value;
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].productPrice < min && this.products[i].productPrice > max){
                temp = [...temp, this.products[i]];
            }
        }
        this.deleteAndGet();
        this.getAllProducts(temp);
        document.getElementById("search").style.display = "none";

    }

}
var prodIndex;

function onLoad(){
var list =[
     p1 = new Product(1, "sofa", "living room", 1000, 1),
     p2 = new Product(2, "work surface", "kitchen", 500,30),
     p3 = new Product(3, "tap", "kitchen", 100,53),
     p4 = new Product(4, "closet", "bedroom", 540, 42),
     p5 = new Product(5, "dresser", "bedroom", 760, 86),
     p6 = new Product(5, "bed", "bedroom", 845, 48),
     p7 = new Product(6, "rug", "living room", 375, 43),

]
myShop = new Shop(list);
}    
