// Класс каталог
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
    
    // Метод, определяет суммарную стоимость всех товаров.
    productsSum(){
        let sum = 0;
        for(let item of this.allProducts){
            sum += item.price;
        }
        return sum;
    }
}

// Класс элемент каталога
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

// Класс корзина
class Cart {
    constructor(){
        this.cartProducts = []; // массив добавленных в корзину товаров
        this.container = container; // расположение корзины на странице
    }
    cartText(){} // возвращает текущее представление корзины, например "Корзина пуста", "В корзине n товаров на s рублей"
    
    cartPrice(){} // возвращает сумму корзины

    сartCount(){} // возвращает количество товарв в корзине

    addProduct(id , quantity = 1){} // добавляет товар в корзину, на вход id товара и количество

    removeProduct(id , quantity = 1){} // удаляет товар из корзины, на вход id товара и количество

    ClearCart(){} // очищает корзину

    render(){} // рендерит содержимое корзины
}

// Класс элемент корзины
class CartItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id ; // идентификатор товара
        this.title ; // наименование товара
        this.price ; // стоимость товара
        this.quantity ; // количество товара
        //this.sum ; // Сначала хотел добавить сумму, но решил что ее не стоит хранить. При необходимости ее всегда можно рассчитать
        this.img = img; // картинка товара
    }
    render(){} // рендерит элемент корзины
}
const products = new ProductsList();