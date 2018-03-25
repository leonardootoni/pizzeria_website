/*Defines all pizza objets to be used over the website*/



//Pizza Constructor
function Pizza(pizzaName, mainIngredients, basePrice, imageURL){
    this.pizzaName = pizzaName;
    this.mainIngredients = mainIngredients;
    this.basePrice = basePrice;
    this.imageURL = imageURL;
}
//Pizza Object and getters
Pizza.prototype = {
    constructor: Pizza,

    getPizzaName:function(){
        return this.pizzaName;
    },

    getMainIngredients:function(){
        return this.mainIngredients;
    },

    getBasePrice:function(){
        return this.basePrice;
    },

    getimageURL:function(){
        return this.imageURL;
    }
}

var pizzaBanquetCheddar = new Pizza("Banquet Cheddar",
                                    "Ground beef, bacon, cheddar cheese",
                                    13.09,
                                    "../images/mount_your_pizza/PN_Classic_BnqtCheddar_195x150.jpg");

var pizzaCalabrese = new Pizza("Calabrese",
                                    "Spicy sausage, Spanish onions, roasted red peppers",
                                    12.74,
                                    "../images/mount_your_pizza/PN_Classic_Calabrese_195x150.jpg");

var pizzaClassicDeluxe = new Pizza("Classic Deluxe",
                                    "Pepperoni, fresh mushrooms, green peppers, bacon, sliced tomatoes, Spanish onions",
                                    13.09,
                                    "../images/mount_your_pizza/PN_Classic_Deluxe_195x150.jpg");

/*Pizza Menu default constructor*/
function PizzaMenu(){
    this.pizzaMenuItems = [];
}

//PizzaMenu Object
PizzaMenu.prototype = {

    constructor: PizzaMenu,
    addPizza:function(Pizza){
        this.pizzaMenuItems.push(Pizza);
    },
    getLength:function(){
        return this.pizzaMenuItems.length;
    }
}

/*Load and provide all Pizzas used on the website*/
var pizzaMenu;
function setPizzasMenu(){
    pizzaMenu = new PizzaMenu()
    pizzaMenu.addPizza(pizzaBanquetCheddar);
    pizzaMenu.addPizza(pizzaCalabrese);
    pizzaMenu.addPizza(pizzaClassicDeluxe);
    console.log(pizzaMenu);
}
