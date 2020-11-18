class Hamburger {
    
    static  sizes = {
        SIZE_SMALL: { id: "SIZE_SMALL", price: 50, calories: 20 },
        SIZE_BIG: { id: "SIZE_BIG", price: 100, calories: 40 },
    }
    
    static stuff = {
        STUFF_CHEESE: { id: "STUFF_CHEESE", price: 10, calories: 20 },
        STUFF_SALAD: { id: "STUFF_SALAD", price: 20, calories: 5 },
        STUFF_POTATO: { id: "STUFF_POTATO", price: 15, calories: 10 },
    };
    
    static toppings = {
        TOPPING_SPICES: { id: "TOPPING_SPICES", price: 15, calories: 0 },
        TOPPING_MAYON: { id: "TOPPING_MAYON", price: 20, calories: 5 }
    };

    
    constructor(size, stuffing) {

        if (size === Hamburger.sizes.SIZE_SMALL || size === Hamburger.sizes.SIZE_BIG) {
            this.size = size;
        } else {
            
        }
        if (stuffing === Hamburger.stuff.STUFF_CHEESE || stuffing === Hamburger.stuff.STUFF_SALAD || stuffing === Hamburger.stuff.STUFF_POTATO) {
            this.stuffing = stuffing;
        } else {
            
        }

        this.topping = [];
    }
    
    addTopping(topping) {
       
        let foundTopping = this.topping.find(x => x.id == topping.id);
       
        if ( foundTopping === undefined){
            this.topping.push(topping);
        }
    }
   
    removeTopping(topping) {
        
        let index = this.topping.indexOf(topping);
        
        if (index >= 0) {
            this.topping.splice(index, 1); 
        }   
    }
    
    getToppings() {
        return this.topping;
    }
    
    getSize() {
        return this.size;
    }
                  
    getStuffing() {
        return this.stuff;
    }
    
    calculatePrice() {
        let sum = 0;
        
        for (let item of this.topping){
            sum += item.price; 
        }
        
        sum += this.size.price;
        sum += this.stuffing.price;
        return sum;
    }
       
    calculateCalories() {
        let sum = 0;
        
        for (let item of this.topping){
            sum += item.calories; 
        }
         
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
    
    myBurger.size = Hamburger.sizes[event.target.value];
    
}

function handleStuffClick(event){
    
    myBurger.stuffing = Hamburger.stuff[event.target.value];
    
}

function handleToppingClick(event){
    
    if (event.target.checked) {
        myBurger.addTopping(Hamburger.toppings[event.target.value])
    
    } else{
        myBurger.removeTopping(Hamburger.toppings[event.target.value])
    }
    console.log(myBurger);

}


function handleSubmitClick(event){
    document.getElementById('price').innerHTML = myBurger.calculatePrice();
    document.getElementById('calories').innerHTML = myBurger.calculateCalories();
}

let myBurger = new Hamburger(Hamburger.sizes.SIZE_SMALL, Hamburger.stuff.STUFF_CHEESE);