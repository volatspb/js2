/* Некая сеть фастфуда предлагает несколько видов гамбургеров:
Маленький (50 рублей, 20 калорий).
Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
С сыром (+10 рублей, +20 калорий).
С салатом (+20 рублей, +5 калорий).
С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
*/


class Hamburger {
    // Возможно это выглядит не красиво, но я хочу хранить все настройки бургера внутри класса
    // Для этого использую static
    // Запишу их заглавными буквами(не должны редактироваться)
    // Варианты размеров
    static  sizes = {
        SIZE_SMALL: { id: "SIZE_SMALL", price: 50, calories: 20 },
        SIZE_BIG: { id: "SIZE_BIG", price: 100, calories: 40 },
    }
    // Варианты начинок
    static stuff = {
        STUFF_CHEESE: { id: "STUFF_CHEESE", price: 10, calories: 20 },
        STUFF_SALAD: { id: "STUFF_SALAD", price: 20, calories: 5 },
        STUFF_POTATO: { id: "STUFF_POTATO", price: 15, calories: 10 },
    };
    // Варианты добавок
    static toppings = {
        TOPPING_SPICES: { id: "TOPPING_SPICES", price: 15, calories: 0 },
        TOPPING_MAYON: { id: "TOPPING_MAYON", price: 20, calories: 5 }
    };

    // Конструктор класса
    constructor(size, stuffing) {

        if (size === Hamburger.sizes.SIZE_SMALL || size === Hamburger.sizes.SIZE_BIG) {
            this.size = size;
        } else {
            // ошибочный размер бургера
        }
        if (stuffing === Hamburger.stuff.STUFF_CHEESE || stuffing === Hamburger.stuff.STUFF_SALAD || stuffing === Hamburger.stuff.STUFF_POTATO) {
            this.stuffing = stuffing;
        } else {
            // ошибочная начинка бургера
        }

        this.topping = [];
    }
    // Добавить добавку 
    addTopping(topping) {
        // Ищем добавку в бургере
        let foundTopping = this.topping.find(x => x.id == topping.id);
        // Если добавки нет, то добавляем ее
        if ( foundTopping === undefined){
            this.topping.push(topping);
        }
    }
    // Убрать добавку 
    removeTopping(topping) {
        // ищем добавку в бургере
        let index = this.topping.indexOf(topping);
        // если нашли, то удаляем ее
        if (index >= 0) {
            this.topping.splice(index, 1); 
        }   
    }
    // Получить список добавок
    getToppings() {
        return this.topping;
    }
    // Узнать размер гамбургера
    getSize() {
        return this.size;
    }
    // Узнать начинку гамбургера              
    getStuffing() {
        return this.stuff;
    }
    // Узнать цену 
    calculatePrice() {
        let sum = 0;
        // считаем стоимость добавок если они есть
        for (let item of this.topping){
            sum += item.price; 
        }
        // добавляем стоимость размера и начинки 
        sum += this.size.price;
        sum += this.stuffing.price;
        return sum;
    }
    // Узнать калорийность   
    calculateCalories() {
        let sum = 0;
        // считаем калории добавок если они есть
        for (let item of this.topping){
            sum += item.calories; 
        }
        // добавляем калории размера и начинки 
        sum += this.size.calories;
        sum += this.stuffing.calories;
        return sum;
    }
}

window.addEventListener("load",init);

function init(){
    document.querySelector('#radio-size').addEventListener('change', handleSizeClick);
    document.querySelector('#radio-stuff').addEventListener('change', handleStuffClick);
    document.querySelector('#checkbox-toppings').addEventListener('change', handleToppingClick);
    document.querySelector('#submit').addEventListener('click', handleSubmitClick);
}

function handleSizeClick(event){
    // меняем размер
    myBurger.size = Hamburger.sizes[event.target.value];
    //console.log(myBurger);
}

function handleStuffClick(event){
    // меняем начинку
    myBurger.stuffing = Hamburger.stuff[event.target.value];
    //console.log(myBurger);
}

function handleToppingClick(event){
    // Если переключатель включен то добавляем
    if (event.target.checked) {
        myBurger.addTopping(Hamburger.toppings[event.target.value])
    // иначе убираем
    } else{
        myBurger.removeTopping(Hamburger.toppings[event.target.value])
    }
    console.log(myBurger);

}

// выводит на экран стримость и калории
// можно сделать пересчет стоимости и калорийности при каждом переключении radio, 
// на данный момент пересчет сделан по кнопке
function handleSubmitClick(event){
    document.getElementById('price').innerHTML = myBurger.calculatePrice();
    document.getElementById('calories').innerHTML = myBurger.calculateCalories();
}

let myBurger = new Hamburger(Hamburger.sizes.SIZE_SMALL, Hamburger.stuff.STUFF_CHEESE);