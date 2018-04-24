/*******************************************************************************
* JS Pizzaria website model classes
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/

//key used to save and recover the UserBasket in/from the sessionStorage;
const USER_CUSTOM_PIZZA_BASKET  = "USER_CUSTOM_PIZZA_BASKET";
const USER_BASKET_NULL_ERROR_MSG = "Error: Unable to get userBasket information.";

class PizzaSize {
    constructor (id, name, slices, basePriceMultiplier){
        let _id = id;
        let _name = name;
        let _slices = slices;
        let _basePriceMultiplier = basePriceMultiplier;

        //Default getters and setters
        this.setId = function(id){_id = id;}
        this.getId = function(){return _id;}
        this.setName = function(name){_name = name;}
        this.getName = function(){return _name;}
        this.setSlices = function(slices){_slices = slices;}
        this.getSlices = function(){return _slices;}
        this.setBasePriceMultiplier = function(basePriceMultiplier){_basePriceMultiplier = basePriceMultiplier;}
        this.getBasePriceMultiplier = function(){return _basePriceMultiplier;}
        this.getSimpleSerializableObject = function(){

            let obj = new Object();
            obj.id = this.getId();
            obj.name = this.getName();
            obj.slices = this.getSlices();
            obj.basePriceMultiplier = this.getBasePriceMultiplier();
            return obj;
        }
    }
}

//Class definition to all pizzas available in the menu
class Pizza {
    constructor (id, name, description, price, imageURL){
        let _id = id;
        let _name = name;
        let _description = description;
        let _price = Number(price);
        let _imageURL = imageURL;

        //Default getters and setters
        this.setId = function(id){_id = id;}
        this.getId = function(){return _id;}
        this.setName = function(name){_name = name;}
        this.getName = function(){return _name;}
        this.setPrice = function(price){_price = Number(price);}
        this.getPrice = function(){return Number(_price);}
        this.setImageURL = function(imageURL){_imageURL = imageURL;}
        this.getImageURL = function(){return _imageURL;}
        this.setDescription = function(description){_description = description;}
        this.getDescription = function(){return _description;}
        this.getSimpleSerializableObject = function(basePriceMultiplier){

            let obj = new Object();
            obj.id = this.getId();
            obj.name = this.getName();
            obj.description = this.getDescription();
            obj.price = Number((this.getPrice() * basePriceMultiplier).toFixed(2));
            obj.imageURL = this.getImageURL();
            return obj;
        }

    }

}

//Class definition to all extra toppings available in the menu
class Topping {

    constructor (id, name, description, price, imageURL){
        let _id = id;
        let _name = name;
        let _description = description;
        let _price = price;
        let _imageURL = imageURL;

        //Default getters and setters
        this.setId = function(id){_id = id;}
        this.getId = function(){return _id;}
        this.setName = function(name){_name = name;}
        this.getName = function(){return _name;}
        this.setDescription = function(description){_description = description;}
        this.getDescription = function(){return _description;}
        this.setPrice = function(price){_price = Number(price);}
        this.getPrice = function(){return Number(_price);}
        this.setImageURL = function(imageURL){_imageURL = imageURL;}
        this.getImageURL = function(){return imageURL;}
        this.getSimpleSerializableObject = function(basePriceMultiplier){

            let obj = new Object();
            obj.id = this.getId();
            obj.name = this.getName();
            obj.description = this.getDescription();
            obj.price = Number((this.getPrice() * basePriceMultiplier).toFixed(2));
            obj.imageURL = this.getImageURL();
            return obj;
        }


    }
}

//Class definition to all extra toppings available in the menu
class Cheese {

    constructor (id, name, description, price, imageURL){
        let _id = id;
        let _name = name;
        let _description = description;
        let _price = price;
        let _imageURL = imageURL;

        //Default getters and setters
        this.setId = function(id){_id = id;}
        this.getId = function(){return _id;}
        this.setName = function(name){_name = name;}
        this.getName = function(){return _name;}
        this.setDescription = function(description){_description = description;}
        this.getDescription = function(){return _description;}
        this.setPrice = function(price){_price = Number(price);}
        this.getPrice = function(){return Number(_price);}
        this.setImageURL = function(imageURL){_imageURL = imageURL;}
        this.getImageURL = function(){return imageURL;}
        this.getSimpleSerializableObject = function(basePriceMultiplier){

            let obj = new Object();
            obj.id = this.getId();
            obj.name = this.getName();
            obj.description = this.getDescription();
            obj.price = Number((this.getPrice() * basePriceMultiplier).toFixed(2));
            obj.imageURL = this.getImageURL();
            return obj;
        }
    }
}

//Pizzaria Menu Class
class PizzaMenu {

    constructor (pizzaSize, pizza, topping, cheeses){
        let _pizzaSize = pizzaSize;
        let _pizza = pizza;
        let _topping = topping;
        let _cheese = cheeses;

        //pizzaSizeId: A valid pizza size id from existing on in the dataset
        //returns a PizzaSize Object
        this.getPizzaSizeById = function(pizzaSizeId){
            for(let i=0; i<_pizzaSize.length;i++){

                if(_pizzaSize[i].getId() == pizzaSizeId){
                    return _pizzaSize[i];
                }
            }
            console.error("PizzaMenu.getPizzaSizeById error: There is no PizzaSize object defined." + pizzaSizeId);
            throw "PizzaMenu.getPizzaSizeById error: There is no PizzaSize object defined.";
        }

        //pizzaId: A valid pizza id from existing on in the dataset
        //returns a Pizza Object
        this.getPizzaById = function(pizzaId){
            for(let i=0; i<_pizza.length;i++){
                if(_pizza[i].getId() == pizzaId){
                    return _pizza[i];
                }
            }
            console.error("PizzaMenu.getPizzaById error: There is no Pizza object defined.");
            throw "PizzaMenu.getPizzaById error: There is no Pizza object defined.";
        }

        //toppingId: A valid topping id from existing on in the dataset
        //returns a Topping Object
        this.getToppingById = function(toppingId){
            for(let i=0; i<_topping.length;i++){
                if(_topping[i].getId() == toppingId){
                    return _topping[i];
                }
            }
            console.error("PizzaMenu.getToppingById error: There is no Topping object defined.");
            throw "PizzaMenu.getToppingById error: There is no Topping object defined.";
        }

        //cheeseId: A valid topping id from existing on in the dataset
        //returns a Cheese Object
        this.getCheeseById = function(cheeseId){
            for(let i=0; i<_cheese.length;i++){
                if(_cheese[i].getId() == cheeseId){
                    return _cheese[i];
                }
            }
            console.error("PizzaMenu.getCheeseById error: There is no Cheese object defined.");
            throw "PizzaMenu.getCheeseById error: There is no Cheese object defined.";
        }

        //pizzaId: A valid topping id from existing on in the dataset
        //sizeId: A valid topping id from existing on in the dataset
        //Return a pizza price for a specific pizza type and size
        this.getPizzaPriceBySize = function(pizzaId, sizeId){
            let size = this.getPizzaSizeById(sizeId);
            let pizza = this.getPizzaById(pizzaId);

            try{
                return size.getBasePriceMultiplier() * pizza.getPrice();
            }catch(e){
                console.error(e);
                throw "PizzaMenu.getCheeseById error: Impossible to calculate the Pizza Price. Pizza not identified";
            }
        }

        //return all pizzas in the menu
        this.getAllPizzasInTheMenu = function(){
            return _pizza;
        }

        //return all pizzas in the menu
        this.getAllPizzasSizeInTheMenu = function(){
            return _pizzaSize;
        }

        //return all toppings in the menu
        this.getAllToppingsInTheMenu = function(){
            return _topping;
        }

        //return all toppings in the menu
        this.getAllCheesesInTheMenu = function(){
            return _cheese;
        }
    }
}

//Customizable pizza class
class CustomPizza {

    constructor (pizzaSize, pizza, toppings, cheeses){
        let _pizzaSize = pizzaSize;
        let _pizza = pizza;
        let _toppings = toppings;
        let _cheeses = cheeses;
        let _amount = 1;

        //Default getters and setters
        this.setPizzaSize = function(pizzaSize){_pizzaSize = pizzaSize;}
        this.getPizzaSize = function(){return _pizzaSize;}
        this.setPizza = function(pizza){_pizza = pizza;}
        this.getPizza = function(){return _pizza;}
        this.setToppings = function(toppings){_toppings = toppings;}
        this.getToppings = function(){return _toppings;}
        this.setCheeses = function(cheeses){_cheeses = cheeses;}
        this.getCheeses = function(){return _cheeses;}
        this.setAmount = function(amount){_amount = Number(amount);}
        this.getAmount = function(){return _amount;}

        //returns the unit pizza price correspondent to the pizza size
        this.getPizzaPrice = function(){

            let pizzaPrice = _pizza.getPrice();
            let multiplier = _pizzaSize.getBasePriceMultiplier();

            return Number(pizzaPrice * multiplier).toFixed(2);

        }

        //returns the custom pizza total price. This method consider the pizza
        //size + flavour + all extra toppings and cheeses + amount of pizzas
        //chose by the user
        //unit - boolean specifing to multiply or not the total by the amount
        this.getTotalPrice = function(){

            if( (_pizzaSize == null || typeof(_pizzaSize) == 'undefined' ) &&
                (_pizza == null || typeof(_pizza) == 'undefined' ) ){

                    console.error("CustomPizza.getTotalPrice error: pizzaSize or pizza objects not defined properly");
                    throw "CustomPizza.getTotalPrice error: pizzaSize or pizza objects not defined properly";

            }else{

                //pizza price updated according to it size and flavour
                let multiplier = _pizzaSize.getBasePriceMultiplier()
                let subTotal = 0;
                subTotal += multiplier * _pizza.getPrice();

                //sum all toppings included with the price adjusted according to
                //the pizza size chose
                if(_toppings != null){
                    for (let i = 0; i < _toppings.length; i++) {
                        subTotal += multiplier * _toppings[i].getPrice();
                    }
                }

                //sum all cheeses included with the price adjusted according to
                //the pizza size chose
                if(_cheeses != null){
                    for (let i = 0; i < _cheeses.length; i++) {
                        subTotal += multiplier * _cheeses[i].getPrice();
                    }
                }



                subTotal *= _amount; //times the amount of pizzas

                //The customPizza Total
                return Number(subTotal.toFixed(2));

            }
        }

        //add a topping into the list
        this.addTopping = function(newTopping){
            if(!(newTopping instanceof Topping) ){
                console.error("CustomPizza.addTopping Error: parameter is not a typeof Topping.");
                throw "CustomPizza.addTopping Error: parameter is not a typeof Topping.";
            }

            if(_toppings == null){
                _toppings = new Array();
            }
            _toppings.push(newTopping);

        }

        //add a topping into the list
        this.addCheese = function(newCheese){
            if(!(newCheese instanceof Cheese) ){
                console.error("CustomPizza.addCheese Error: parameter is not a typeof Cheese.");
                throw "CustomPizza.addCheese Error: parameter is not a typeof Cheese.";
            }

            if(_cheeses == null){
                _cheeses = new Array();
            }
            _cheeses.push(newCheese);

        }

        //Remove a topping from the toppings list
        this.removeToppingById = function(toppingId){
            for(let i=0; i<_toppings.length; i++){
                if(_toppings[i].getId() == toppingId){
                    //console.log("Removing topping index " + i);
                    _toppings.splice(i,1);
                    return;
                }
            }

            log.error("CustomPizza.removeToppingById Error: Element not found to be removed");
            throw "CustomPizza.removeToppingById Error: Element not found to be removed";
        }

        //remove a cheese extra option from the cheese list
        this.removeCheeseById = function(CheeseId){
            for(let i=0; i<_cheeses.length; i++){
                if(_cheeses[i].getId() == CheeseId){
                    //console.log("Removing cheese index " + i);
                    _cheeses.splice(i,1);
                    return;
                }
            }

            log.error("CustomPizza.removeCheeseById Error: Element not found to be removed");
            throw "CustomPizza.removeCheeseById Error: Element not found to be removed";
        }

        //Provide a order summary list in html format
        this.printOrderSummaryList = function(){

            if(_pizzaSize != null && _pizza != null){

                let html = "";
                let multiplier = _pizzaSize.getBasePriceMultiplier();
                let itemPrice = 0;
                let subTotal = 0;

                html+= "<span>Size: " + _pizzaSize.getName() + "</span><br>";

                itemPrice = _pizza.getPrice() * multiplier;
                itemPrice = itemPrice;

                html+= "<span>Pizza: " + _pizza.getName() + " $"+ itemPrice.toFixed(2) +"</span><br><br>";
                subTotal+=Number(itemPrice.toFixed(2));

                if( _toppings != null && _toppings.length > 0){

                    html+= "<span>Toppings: </span><br>";
                    for(let i=0; i<_toppings.length;i++){

                        itemPrice = _toppings[i].getPrice() * multiplier;
                        itemPrice = itemPrice;
                        html+="<span>"+ _toppings[i].getName() + " $" + itemPrice.toFixed(2) +"</span><br>";
                        subTotal+=Number(itemPrice.toFixed(2));
                    }
                }

                if( _cheeses != null && _cheeses.length > 0){

                    html+= "<br><span>Cheeses: </span><br>";
                    for(let i=0; i<_cheeses.length;i++){

                        itemPrice = _cheeses[i].getPrice() * multiplier;
                        html+="<span>"+ _cheeses[i].getName() + " $" + itemPrice.toFixed(2) +"</span><br>";
                        subTotal+=itemPrice;
                    }
                }

                html+= "<br><span>( 1x ) unit. $" + subTotal.toFixed(2) + "</span>";

                return html;


            }
        }

        /* Returns a simple object composed by all ids from other classes
         * id - An unique identifier (pk). If not provided, 0 (zero) is setted
         */
        this.getSimpleSerializableObject = function(uniqueID){

            let obj = new Object();
            obj.itemId = (uniqueID == null ? 0 : uniqueID);
            obj.pizzaSize = this.getPizzaSize().getName();
            obj.pizzaFlavour = this.getPizza().getName();
            obj.amount = this.getAmount();
            obj.unitPrice = Number((this.getTotalPrice() / this.getAmount()).toFixed(2));
            obj.subTotal = this.getTotalPrice();
            obj.imageURL = this.getPizza().getImageURL();
            obj.pizzaToppings = "";
            obj.pizzaCheeses = "";

            if(customPizza.getToppings() != null){
                let tpgs = customPizza.getToppings();
                for(let i=0;i<tpgs.length;i++){
                    if(i==0){
                        obj.pizzaToppings+=tpgs[i].getName();
                    }else{
                        obj.pizzaToppings+=", " + tpgs[i].getName();
                    }
                }
            }

            if(customPizza.getCheeses()!=null){
                let chs = customPizza.getCheeses();
                for(let i=0;i<chs.length;i++){
                    if(i==0){
                        obj.pizzaCheeses+=chs[i].getName();
                    }else{
                        obj.pizzaCheeses+=", " + chs[i].getName();
                    }
                }
            }


            return obj;

        }
    }
}

//Dataset loader
function loadPizzaDataSet(){

    let pizzaSize=[];
    let pizza=[];
    let topping=[];
    let cheese = [];

    for(let i=0; i<pizzaSizeDataModel.length;i++){
        pizzaSize[i] = new PizzaSize(   pizzaSizeDataModel[i].id,
                                        pizzaSizeDataModel[i].name,
                                        pizzaSizeDataModel[i].slices,
                                        pizzaSizeDataModel[i].basePriceMultiplier );
    }
    //console.log("loaded " + pizzaSize.length + " elements from pizzaSizeDataModel");

    for(let i=0; i<pizzaMenuDataModel.length;i++){
        pizza[i] = new Pizza(   pizzaMenuDataModel[i].id,
                                pizzaMenuDataModel[i].name,
                                pizzaMenuDataModel[i].description,
                                pizzaMenuDataModel[i].price,
                                pizzaMenuDataModel[i].imageURL );
    }
    //console.log("loaded " + pizza.length + " elements from pizzaMenuDataModel");

    for(let i=0; i<pizzaToppingsDataModel.length;i++){
        topping[i] = new Topping(   pizzaToppingsDataModel[i].id,
                                    pizzaToppingsDataModel[i].name,
                                    pizzaToppingsDataModel[i].description,
                                    pizzaToppingsDataModel[i].price,
                                    pizzaToppingsDataModel[i].imageURL );
    }
    //console.log("loaded " + topping.length + " elements from pizzaToppingsDataModel");

    for(let i=0; i<pizzaCheesesDataModel.length;i++){
        cheese[i] = new Cheese( pizzaCheesesDataModel[i].id,
                                pizzaCheesesDataModel[i].name,
                                pizzaCheesesDataModel[i].description,
                                pizzaCheesesDataModel[i].price,
                                pizzaCheesesDataModel[i].imageURL );
    }
    //console.log("loaded " + cheese.length + " elements from pizzaCheesesDataModel");

    //Create an instance of PizzaMenu with all pizza dataset
    return new PizzaMenu(pizzaSize, pizza, topping, cheese);

}


//Saves all orders into a user basket
function savePizzaIntoTheBasket(customPizza){

    //recover the userBasket from the session.
    let userBasket = JSON.parse(sessionStorage.getItem(USER_CUSTOM_PIZZA_BASKET));

    if(userBasket == null){
        //userBasket do not exists yet.
        //A new one will be created to save the customPizza into the user session
        userBasket=[];
        userBasket.push(customPizza.getSimpleSerializableObject());
    }else{
        //The user just has a basket. In this case add another cutomPizza to the
        //existing one.
        userBasket.push(customPizza.getSimpleSerializableObject(userBasket.length));
    }

    //console.log(userBasket);

    //stringify the simple object before release It in the user session
    sessionStorage.setItem(USER_CUSTOM_PIZZA_BASKET, JSON.stringify(userBasket));

}

//Recover the userBasket and returns a userBasket[]
function getUserBasket(){

    //recover the userBasket from the session.
    let userBasket = JSON.parse(sessionStorage.getItem(USER_CUSTOM_PIZZA_BASKET));
    if(userBasket == null){
        log.error(USER_BASKET_NULL_ERROR_MSG);
        throw USER_BASKET_NULL_ERROR_MSG;
    }else{
        return userBasket;
    }
}

//Override PizzaBasket. Method called from checkout page, after to update the
//amount of itens or removed some item from the basket
function updateUserBasket(userBasket){

    if(userBasket == null){
        sessionStorage.remove(USER_CUSTOM_PIZZA_BASKET);
    }else{
        //stringify the simple object before to put It in the session
        sessionStorage.setItem(USER_CUSTOM_PIZZA_BASKET, JSON.stringify(userBasket));
    }

}

//Method called from close-order-controller page. This method erase the user basket
function removeUserBasket(){

    sessionStorage.removeItem(USER_CUSTOM_PIZZA_BASKET);

}
