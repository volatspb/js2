class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    
    productsSum(){
        let sum = 0;
        for(let item of this.allProducts){
            sum += item.price;
        }
        return sum;
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p class  = "price-text">${this.price} руб. </p>
                        <button class="buy-btn">Купить</button>
                    </div>    
                </div>`;
    }
}

class Cart {
    constructor(){
        this.cartProducts = [];
        this.container = container;
    }
    cartText(){} 
    
    cartPrice(){} 

    сartCount(){} 

    addProduct(id , quantity = 1){} 
    removeProduct(id , quantity = 1){} 
    ClearCart(){} 
    render(){} 
}

class CartItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id ; 
        this.title ; 
        this.price ; 
        this.quantity ; 
        this.img = img; 
    }
    render(){} 
}
const products = new ProductsList();