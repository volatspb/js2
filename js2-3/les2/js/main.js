const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

// абстрактный класс каталог
class List {
    constructor(url, container) {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.url = url;
        this.filtered = [];
        this._init();
    }

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log('error'));
    }

    handleData(data) {
        this.data = [...data];
        this._render();
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new lists[this.constructor.name](item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('afterbegin', product.render());
        }
    }

    // будет обрабатываться в каждом классе отдельно
    _init() { }

    getItem(id) {
        return this.allProducts.find(el => el.id_product === id);
    }

    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible')
            }
        })
    }
}

// абстрактный класс элемент
class Item {
    constructor(elem, img = `https://placehold.it/200x150`) {
        this.id_product = elem.id_product;
        this.product_name = elem.product_name;
        this.price = elem.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p class  = "price-text">${this.price} руб. </p>
                        <button class="buy-btn" data-id = "${this.id_product}"'>Купить</button>
                    </div>    
                </div>`;
    }
}


// Класс каталог товаров
class ProductsList extends List {
    constructor(cart, container = '.products') {
        super(`/catalogData.json`, container);
        this.cart = cart;
        this.getJson() // Получаем промис 
            .then(data => this.handleData(data))
    }
    _init() {
        const block = document.querySelector(this.container);
        block.addEventListener("click", event => {
            // разные варианты, что лучше не знаю
            //if(e.target.classList.contains('buy-btn')){
            //if (event.target.tagName === "BUTTON") {
            if (event.target.textContent === "Купить") {
                let id_product = +event.target.dataset["id"];
                this.cart.addProduct(this.getItem(id_product), 1)
            }
        })

        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        })


    }
}

// Класс элемент каталога товаров
class ProductItem extends Item { }


// Класс корзина
class Cart extends List {
    constructor(container = '.drop-cart') {
        super(`/getBasket.json`, container)
        this.getJson()
            .then(data => this.handleData(data.contents))
            .then(a => this.cartPrice())// обновляем итог только после получения данных

    }

    _init() {
        const block = document.querySelector(this.container);
        block.addEventListener('click', event => {

            // проверяем что нажали на кнопку
            if (event.target.tagName === "BUTTON") {
                let id_product = +event.target.dataset.id;
                
                if (event.target.textContent === "-") {
                    this.removeProduct(this.getItem(id_product), 1)
                } else if (event.target.textContent === "+") {
                    this.addProduct(this.getItem(id_product), 1)
                } else if (event.target.textContent === "X") {
                    this.ClearProduct(id_product)
                }
            }
        })

        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('drop-cart-on');
        })
        this.cartPrice();

    }

    cartText() { } // возвращает текущее представление корзины, например "Корзина пуста", "В корзине n товаров на s рублей"

    // добавляет товар в корзину, на вход id товара и количество
    addProduct(product, quantity = 1) {

        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {

                    // ищем товар в корзине
                    let foundProduct = this.getItem(product.id_product);
                    // если в корзине нет нужного товара то добавляем его

                    if (!foundProduct) {
                        //так было не красиво
                        //let foundProduct = products.allProducts.find(x => x.id_product == id_product);
                        // так лучше
                        let foundProduct = Object.assign({quantity: quantity}, product);
                        this.data = [foundProduct];
                        this._render();
                        // тоже переделал
                        //const product = new CartItem(foundProduct);
                        //this.allProducts.push(product);
                        //const block = document.querySelector(this.container);
                        //block.insertAdjacentHTML('afterBegin', product.render());

                        // если товар уже есть в корзине, то добавляем к найденой позиции количество (count + 1)
                    } else {
                        ++foundProduct.quantity;
                        let block = document.querySelector(`.drop-cart-product[data-id="${product.id_product}"]`);
                        block.getElementsByClassName("drop-cart-p")[0].textContent = foundProduct.quantity + " x " + foundProduct.price;
                    }
                    this.cartPrice();

                } else {
                    console.log('Error');
                }

            })
    }

    // удаляет товар из корзины, на вход id товара и количество
    removeProduct(product, quantity = 1) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let foundProduct = this.getItem(product.id_product);
                    if (foundProduct) {
                        let block = document.querySelector(`.drop-cart-product[data-id="${product.id_product}"]`);
                        --foundProduct.quantity;
                        if (foundProduct.quantity === 0) {
                            // удалим из корзины
                            let index = this.allProducts.indexOf(foundProduct);
                            if (index >= 0) {
                                this.allProducts.splice(index, 1);
                                // удалим div из корзины
                                block.remove();
                            }
                        } else {
                            block.getElementsByClassName("drop-cart-p")[0].textContent = foundProduct.quantity + " x " + foundProduct.price;
                        }
                    }
                    this.cartPrice();
                }
            })

    }

    // удаляет товар из корзины 
    ClearProduct(id_product) {
        let foundProduct = this.getItem(id_product);
        let index = this.allProducts.indexOf(foundProduct);
        if (index >= 0) {
            this.allProducts.splice(index, 1);
            // удалим div из корзины
            let block = document.querySelector(`.drop-cart-product[data-id="${id_product}"]`);
            block.remove();
        }
        this.cartPrice();
    }

    // возвращает количество товарв в корзине
    сartCount() {
        let sum = 0;
        for (let item of this.allProducts) {
            sum += item.quantity;
        }
        return sum;
    }
    // Метод, определяет суммарную стоимость всех товаров.
    productsSum() {
        let sum = 0;
        for (let item of this.allProducts) {
            sum += item.price * item.quantity;
        }
        return sum;
    }
    //  сумма корзины
    cartPrice() {
        let sum = this.productsSum();
        let block = document.querySelector(".drop-cart-total").textContent = sum + " руб";
    }

}

// Класс элемент корзины
class CartItem extends Item {
    constructor(product, img = `https://placehold.it/100x75`, quantity = 1) {
        super(product, img)
        this.quantity = quantity; // количество товара
    }

    // рендерит элемент корзины
    render() {
        return `<div class="drop-cart-product" data-id = ${this.id_product} '> 
                    <div class="drop-cart-div-img">
                        <a href="SinglePage.html"> <img class="drop-cart_img" src="${this.img}"></a>
                    </div>
                    <div class="drop-cart-details">
                        <h3 class="drop-cart-h3">${this.product_name}</h3>
                        <p class="drop-cart-p" data-id = ${this.id_product} >${this.quantity} x ${this.price}</p>
                    </div>
                    <div class="drop-cart-action-box">
                        <button class="productButtonRem" data-id = ${this.id_product} >-</button>
                        <button class="productButtonAdd" data-id = ${this.id_product} >+</button>
                        <button class="productButtonDel" data-id = ${this.id_product} >X</button>                  
                          </div>
                </div>`;
    }

}

const lists = {
    ProductsList: ProductItem,
    Cart: CartItem
};

const cart = new Cart;
const products = new ProductsList(cart);

products.getJson(`getProducts.json`).then(data => products.handleData(data));