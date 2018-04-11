/*******************************************************************************
* JS Pizzaria website controller class
********************************************************************************
* Controller Class to the Mount Your Pizza page
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/

//html page selectors
const PIZZA_SIZE_SELECTOR       = "#pizza-sizes";
const PIZZA_FLAVOUR_SELECTOR    = "#pizza-flavour-options";
const PIZZA_TOPPINGS_SELECTOR   = "#pizza-toppings-options";
const PIZZA_CHEESE_SELECTOR     = "#pizza-cheese-options";
const PIZZA_AMOUNT_SELECTOR     = "#pizza-quantity";
const PIZZA_FINAL_PRICE_SELECTOR= "#final-price-value";
const PIZZA_ADD_ORDER_BUTTON    = "#add-order-button";
const PIZZA_ORDER_SUMMARY_BOX   = "#order-summary-box";
const JQUERY_ACCORDION_SELECTOR = "#accordion";
const MODAL_POPUP               = "#myModal";

//css style class references
const FIGURE_UNSELECTED_CSS_CLASS   = "figure-unselected";
const FIGURE_SELECTED_CSS_CLASS     = "figure-selected";

//HTML properties
const HTML_DISABLE = "disabled";
const HTML_ENABLE  = "enable";

//error messages
const SELECT_ELEMENT_ERROR_MSG = "selectElement Error: Must define a correct subGroup";
const SET_CUSTOM_PIZZA_ERROR_MSG = "setCustomPizza Error: subGroup value not specified.";

//button
const ADD_TO_ORDER_BUTTON = "#add-order-button";
const BUY_MORE_BUTTON = "#btn-buy-more";
const PROCEED_CHECKOUT_BUTTON = "#btn-proceed-checkout";


//pages to redirectToPage
const URL_BUY_MORE_PIZZAS   = window.location.protocol + "//" + window.location.host + "/pages/mount_your_pizza.html";
const URL_CHECKOUT          = window.location.protocol + "//" + window.location.host + "/pages/checkout.html";

var pizzaMenu = ""; //Main Object used in the mount_your_pizza
var customPizza ="";  //CustomPizza assembled by the user
var lastSizeClicked = ""; //store the last Pizza Size element clicked
var lastPizzaClicked = "";//store the last Pizza element clicked

$(document).ready(function() {

    //define jQuery accordion menu properties
    $(JQUERY_ACCORDION_SELECTOR).accordion({
        heightStyle: "content",
        autoHeight: false,
        clearStyle: true,
    });

    //on load, keeo the accordion 2, 3 and 4 tabs disabled.
    $( "#Step2" ).addClass("ui-state-disabled");
    $( "#Step3" ).addClass("ui-state-disabled");
    $( "#Step4" ).addClass("ui-state-disabled");

    //load all pizza menu into PizzaMenu object
    pizzaMenu = loadPizzaDataSet();

    //The customPizza object
    customPizza = new CustomPizza();

    //load the PizzaMenu data into the page
    loadPizzaDataToPage(PIZZA_FLAVOUR_SELECTOR, pizzaMenu.getAllPizzasInTheMenu());
    loadPizzaDataToPage(PIZZA_TOPPINGS_SELECTOR, pizzaMenu.getAllToppingsInTheMenu());
    loadPizzaDataToPage(PIZZA_CHEESE_SELECTOR, pizzaMenu.getAllCheesesInTheMenu());

    //initally disable the "Add to Order" Button and the amount comboselect
    disableAddToOrderComponents();

    /**** Set default on-click() event to the components ****/

    /*set to #pizza-sizes children elements an event handler*/
    $(PIZZA_SIZE_SELECTOR).children().each(function(index, item) {
        $("#" + pizzaMenu.getAllPizzasSizeInTheMenu()[index].getId()).click(function() {
            performPizzaSizeSelection($("#" + pizzaMenu.getAllPizzasSizeInTheMenu()[index].getId()), PIZZA_SIZE_SELECTOR);
        });
    });


    /*set to #pizza-sizes children elements an event handler*/
    $(PIZZA_FLAVOUR_SELECTOR).children().each(function(index, item) {

        $("#" + pizzaMenu.getAllPizzasInTheMenu()[index].getId()).click(function() {
            performPizzaFlavourSelection($("#" + pizzaMenu.getAllPizzasInTheMenu()[index].getId()), PIZZA_FLAVOUR_SELECTOR);

        });
    });


    /*set to #pizza toppings children elements an event handler*/
    $(PIZZA_TOPPINGS_SELECTOR).children().each(function(index, item) {

        $("#" + pizzaMenu.getAllToppingsInTheMenu()[index].getId()).click(function() {
            performOptionalsSelection($("#" + pizzaMenu.getAllToppingsInTheMenu()[index].getId()), PIZZA_TOPPINGS_SELECTOR);
        });
    });

    /*set to #pizza toppings children elements an event handler*/
    $(PIZZA_CHEESE_SELECTOR).children().each(function(index, item) {

        $("#" + pizzaMenu.getAllCheesesInTheMenu()[index].getId()).click(function() {
            performOptionalsSelection($("#" + pizzaMenu.getAllCheesesInTheMenu()[index].getId()), PIZZA_CHEESE_SELECTOR);
        });
    });

    /*Update the basket value on screen and set the specified amount into the customPizza object*/
    $(PIZZA_AMOUNT_SELECTOR).click(function() {
        updateBasketPrice($(PIZZA_AMOUNT_SELECTOR).val());
    });

    /*Add the CustomPizza objet to the basket in order to perform the Checkout*/
    $(ADD_TO_ORDER_BUTTON).click(function() {
        addPizzaIntoTheBasket();
    });

    /*Handle the action when the user decide to buy more items*/
    $(BUY_MORE_BUTTON).click(function() {
        redirectToPage(BUY_MORE_BUTTON);
    });

    /*Handle the action when the user decide to buy more items*/
    $(PROCEED_CHECKOUT_BUTTON).click(function() {
        redirectToPage(PROCEED_CHECKOUT_BUTTON);
    });
});


/*
    Set all pizza data in the page.

    selector - the html selector name
    object - Object[]: Pizzas, Toppings or Cheeses
    pizzaSize - PizzaSize object

*/
function loadPizzaDataToPage(selector, object, pizzaSize) {

    $(selector).each(function(index, item) {

        $(item).children().each(function(index, item) {

            //set the image id value
            $(item).prop("id", object[index].getId());

            //set the image child element
            $(item).find("img").prop("src", object[index].getImageURL());
            $(item).find("img").prop("alt", object[index].getName() + ":" + object[index].getDescription());
            $(item).find("img").prop("title", object[index].getDescription());

            //Set the figcaption name and price
            $(item).find("figcaption").children().first().html(object[index].getName());

            //update the itens price
            let price = 0;
            if(pizzaSize == null) {
                //The page load for the first time
                price = object[index].getPrice();
            }else{
                //the user select a different pizza size
                price = object[index].getPrice() * pizzaSize.getBasePriceMultiplier();
                price = Number(price).toFixed(2);
            }
            //insert the object prince into a figcaption element
            $(item).find("figcaption").children().next().html("<span>$</span><span>" + price + "</span>");
        });
    });
}

//Main method called whenever the user select a pizza size
function performPizzaSizeSelection(elementId, subGroup) {

    //keeps an onbject selected after the click on screen
    selectElement(elementId, subGroup);

    //insert selected pizza data size into the customPizza object
    setCustomPizza(elementId, subGroup);

    //Update all princes into the page, once the user selected another pizza size
    loadPizzaDataToPage(PIZZA_FLAVOUR_SELECTOR, pizzaMenu.getAllPizzasInTheMenu(), customPizza.getPizzaSize());
    loadPizzaDataToPage(PIZZA_TOPPINGS_SELECTOR, pizzaMenu.getAllToppingsInTheMenu(), customPizza.getPizzaSize());
    loadPizzaDataToPage(PIZZA_CHEESE_SELECTOR, pizzaMenu.getAllCheesesInTheMenu(), customPizza.getPizzaSize());

    //reset the amount in the basket
    resetBasketAmount();
    $(PIZZA_ORDER_SUMMARY_BOX).html(customPizza.printOrderSummaryList());

    //enable to select a flavour
    $( "#Step2" ).removeClass("ui-state-disabled");



}

//Main method called whenever the user select a pizza flavour
function performPizzaFlavourSelection(elementId, subGroup) {

    selectElement(elementId, subGroup);
    setCustomPizza(elementId, subGroup);

    //Enable "Add to Order Button"
    enableAddtoOrderComponents();

    updateBasketPrice();

    //enable to select toppings and extra cheeses
    $( "#Step3" ).removeClass("ui-state-disabled");
    $( "#Step4" ).removeClass("ui-state-disabled");

}


//Main method called whenever the user select in one optinal topping or cheese
function performOptionalsSelection(elementId, subGroup) {

    manageCustomPizzaExtraOptionsList(elementId, subGroup);
    selectElement(elementId, subGroup);

    //Update all info inside the box summary
    updateBasketPrice();

}

/*Apply css class style on select elements*/
function selectElement(elementId, subGroup) {

    if (subGroup == PIZZA_SIZE_SELECTOR) {

        if (lastSizeClicked != "") {
            lastSizeClicked.removeClass(FIGURE_SELECTED_CSS_CLASS);
            lastSizeClicked.addClass(FIGURE_UNSELECTED_CSS_CLASS);
        }

        elementId.removeClass(FIGURE_UNSELECTED_CSS_CLASS);
        elementId.addClass(FIGURE_SELECTED_CSS_CLASS);
        lastSizeClicked = elementId;

    } else if (subGroup == PIZZA_FLAVOUR_SELECTOR) {

        if (lastPizzaClicked != "") {
            lastPizzaClicked.removeClass(FIGURE_SELECTED_CSS_CLASS);
            lastPizzaClicked.addClass(FIGURE_UNSELECTED_CSS_CLASS);
        }

        elementId.removeClass(FIGURE_UNSELECTED_CSS_CLASS);
        elementId.addClass(FIGURE_SELECTED_CSS_CLASS);
        lastPizzaClicked = elementId;

    } else if (subGroup == PIZZA_TOPPINGS_SELECTOR || subGroup == PIZZA_CHEESE_SELECTOR) {

        if (elementId.hasClass(FIGURE_UNSELECTED_CSS_CLASS)) {
            elementId.removeClass(FIGURE_UNSELECTED_CSS_CLASS);
            elementId.addClass(FIGURE_SELECTED_CSS_CLASS);
        } else {
            elementId.removeClass(FIGURE_SELECTED_CSS_CLASS);
            elementId.addClass(FIGURE_UNSELECTED_CSS_CLASS);
        }

    } else {
        console.error(SELECT_ELEMENT_ERROR_MSG);
    }
}

/* Set into the customPizza object all data selected by the user */
function setCustomPizza(elementId, subGroup) {

    if (subGroup == PIZZA_SIZE_SELECTOR) {

        //Set customPizza's chose and price multiplier
        customPizza.setPizzaSize(pizzaMenu.getPizzaSizeById(elementId.selector.substring(1)))
        //console.log("new customPizza size: " + customPizza.getPizzaSize().getId());

    } else if (subGroup == PIZZA_FLAVOUR_SELECTOR) {

        //Set customPizza's flavour and base price
        customPizza.setPizza(pizzaMenu.getPizzaById(elementId.selector.substring(1)))
        //console.log("new customPizza flavour: " + customPizza.getPizza().getId());
    } else {
        console.error(SET_CUSTOM_PIZZA_ERROR_MSG);
    }
}


//perform the basket amount reset, in case of user choose another pizza size
function resetBasketAmount() {

    customPizza.setAmount(1);
    $(PIZZA_AMOUNT_SELECTOR).val(1);

    //The user do not selected the pizza flavour yet
    if(customPizza.getPizza()!=null && customPizza.getTotalPrice() > 0){
        $(PIZZA_FINAL_PRICE_SELECTOR).html(customPizza.getTotalPrice());
    }else{
        $(PIZZA_FINAL_PRICE_SELECTOR).html("");
    }

}

/*Disable the "Add to Order" button and the select element*/
function disableAddToOrderComponents() {

    $(PIZZA_ADD_ORDER_BUTTON).attr(HTML_DISABLE, "");
    $(PIZZA_AMOUNT_SELECTOR).attr(HTML_DISABLE, "");
}

/*Enable the "Add to Order" button and the select element*/
function enableAddtoOrderComponents() {

    $(PIZZA_ADD_ORDER_BUTTON).removeAttr(HTML_DISABLE);
    $(PIZZA_AMOUNT_SELECTOR).removeAttr(HTML_DISABLE);

}

//Update the price basket on sreen and set the CustomPizza Amount
function updateBasketPrice(amount){

    if(amount!=null){
        customPizza.setAmount(amount);
    }

    $(PIZZA_FINAL_PRICE_SELECTOR).html(customPizza.getTotalPrice());
    $(PIZZA_ORDER_SUMMARY_BOX).html(customPizza.printOrderSummaryList());
}


/*Manage the insertion or removal of extra toppings and cheese on the Pizza*/
function manageCustomPizzaExtraOptionsList(elementId, subGroup) {

    if (!elementId.hasClass(FIGURE_UNSELECTED_CSS_CLASS)) {

        //item was unselected, needs to remove optional from the pizzaCustom Object
        if(subGroup == PIZZA_TOPPINGS_SELECTOR){
            //Will remove a Topping or cheese
            customPizza.removeToppingById(elementId.selector.substring(1));
        }else{
            //Will remove a exatra cheese
            customPizza.removeCheeseById(elementId.selector.substring(1));
        }

    } else {
        //Will add a Topping or cheese
        if(subGroup == PIZZA_TOPPINGS_SELECTOR){
            customPizza.addTopping(pizzaMenu.getToppingById(elementId.selector.substring(1)));
        }else{
            customPizza.addCheese(pizzaMenu.getCheeseById(elementId.selector.substring(1)));
        }
    }
}

/*Add a selected CustomPizza by the user into the basket array and trigger
actions to direct the user to the next steps/pages*/
function addPizzaIntoTheBasket(){

    //Invoke a model method to save the order into the Basket
    savePizzaIntoTheBasket(customPizza);

    //Show modal popup to the user questioning wich path do follow
    $(MODAL_POPUP).css({display: "block"});

}

/* Performs the page redirection according to the user's choice after to click on
the button ADD TO CART */
function redirectToPage(action){

    if(action==BUY_MORE_BUTTON){
        $(window).attr('location', URL_BUY_MORE_PIZZAS);
    }else if (action == PROCEED_CHECKOUT_BUTTON){
        $(window).attr('location', URL_CHECKOUT );
    }else{
        console.error("mount_your_pizza_controller.redirectToPage error: action " + action + " not specified");
        throw "mount_your_pizza_controller.redirectToPage error: action " + action + " not specified";
    }
}
