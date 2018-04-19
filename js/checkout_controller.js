/*******************************************************************************
* JS Pizzaria website controller class
********************************************************************************
* Controller Class to the Checkout page
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/

const PIZZAS_BASKET_TEMPLATE_SELECTOR = "#pizzas-basket-template"
const LIST_PIZZAS_BASKET_SELECTOR = "#list-pizzas-basket";
const PIZZA_FINAL_PRICE_SELECTOR= "#final-price-value";
const UNIT_PRICE_SELECTOR = "#unit-price-";
const SUBTOTAL_PRICE_SELECTOR = "#sub-total-";
const LINE_ITEM_CONTAINER_SELECTOR = "#line-item-container-";


const MINUS_BUTTON = "#minus-button-";
const PLUS_BUTTON = "#plus-button-";
const REMOVE_BUTTON = "#remove-button-";
const AMOUNT_FIELD = "#amount-field-";

const PIZZA_ADD_ORDER_BUTTON    = "#add-order-button";
const PROCEED_CHECKOUT_BUTTON = "#btn-proceed-checkout";
const HTML_DISABLE = "disabled";

//url path redirection
const URL_LOGIN  = window.location.protocol + "//" + window.location.host + "/pages/login.html";

//Error messages
const BUTTON_NOT_IDENTIFIED = "Error: Action not identified.";

//The userBasket object
var userBasket;

$(document).ready(function() {

    //load all pizza data into PizzaMenu object
    pizzaMenu = loadPizzaDataSet();

    //recover the userBasket from the model
    loadUserBasket();

    /*Event handler to redirect the user to the login page*/
    $(PROCEED_CHECKOUT_BUTTON).click(function() {
        $(window).attr('location', URL_LOGIN);
    });


});

//Load the user basket and show the result set using Handlebars templates.
function loadUserBasket(){

    try{
        userBasket = null;
        userBasket = getUserBasket();
    }catch (e) {
        log.error(e);
        return;
    }

    //Get the reusable template in the checkout page
    //uses Handlebars as template engine
    let source = $(PIZZAS_BASKET_TEMPLATE_SELECTOR).html();
    let template = Handlebars.compile(source);

    let html="";
    let finalPrice = 0;
    for(let i=0; i<userBasket.length;i++){
        //generate n lines, according to the userBasket size, using the template
        html += template(userBasket[i]);
        finalPrice += userBasket[i].subTotal;
    }

    //release the generated html into the determined place and set the total
    //basket price
    if(html != ""){
        $(LIST_PIZZAS_BASKET_SELECTOR).html(html);
        $(PIZZA_FINAL_PRICE_SELECTOR).html(Number(finalPrice.toFixed(2)));
    }

    //Event delegation to capture clicks in any buttons on the list
    $( ".checkout_item" ).on( "click", "input[type='button']",function( event ) {
        buttonDispatcher($(this)[0].id);
    });

}

//Method the dispatch the actions according to the button clicked
function buttonDispatcher(buttonId){

    if(buttonId == null){
        console.error("BUTTON_NOT_IDENTIFIED");
        return;
    }

    //get the button name and the sequential line number in the list
    let elementId = buttonId.substring(buttonId.lastIndexOf("-")+1);
    let clickedButtonName = buttonId.slice(0,buttonId.lastIndexOf("-")+1);

    if(MINUS_BUTTON.indexOf(clickedButtonName) > -1){
        addOrSubtractItem(elementId, MINUS_BUTTON);
    }else if(PLUS_BUTTON.indexOf(clickedButtonName) > -1){
        addOrSubtractItem(elementId, PLUS_BUTTON);
    }else if(REMOVE_BUTTON.indexOf(clickedButtonName) > -1){
        removeItem(elementId);
    }else{
        console.error("BUTTON_NOT_IDENTIFIED");
        return;
    }

}


/*Add or subtract the pizza amount for a specifc element in the basket.
  After to update the page, update the final price and call model to sabe the
  information*/
function addOrSubtractItem(elementId, operation){

    let amount = $(AMOUNT_FIELD+elementId).val();
    let unitPrice = $(UNIT_PRICE_SELECTOR+elementId).html();

    if(operation == PLUS_BUTTON && amount < 9){
        amount++;
    }else if(operation == MINUS_BUTTON && amount > 1){
        amount--;
    }else{
        return;
    }

    //update data into the page
    $(AMOUNT_FIELD+elementId).attr('value', amount);
    $(SUBTOTAL_PRICE_SELECTOR+elementId).html(Number((amount*unitPrice).toFixed(2)));


    //update userBasket to the new computed values
    userBasket[elementId].subTotal = Number((amount*unitPrice).toFixed(2));
    userBasket[elementId].amount = Number(amount);

    let finalPrice = 0;
    for(let i=0; i<userBasket.length;i++){
        finalPrice +=userBasket[i].subTotal;
    }

    //update the page to the new total computed value
    $(PIZZA_FINAL_PRICE_SELECTOR).html(Number((finalPrice).toFixed(2)));

    //persist the updated object
    updateUserBasket(userBasket);

}

/*Remove an element in the basket. After to update the page, update the final
  price and call model to sabe the information*/
function removeItem(elementId){

    //Remove the element on the screen
    $(LINE_ITEM_CONTAINER_SELECTOR+elementId).remove();

    //Remove the element in the array
    userBasket.splice(elementId,1);

    //update the simple indentification id in the array
    if(userBasket!=null && userBasket.length > 0){

        for(let i=0; i<userBasket.length;i++){
            userBasket[i].itemId = i;
        }

    }else{
        //Reset the final price and disable the purchase button
        $(PIZZA_FINAL_PRICE_SELECTOR).html("");
        $(PROCEED_CHECKOUT_BUTTON).attr(HTML_DISABLE, "");
    }

    //update the information into the model and re-load the information on the
    //page.
    updateUserBasket(userBasket);
    loadUserBasket();

    try{
        //invoke the method in master.js to update the cart info on the header.
        controlShoppingCartExhibition();
    }catch(e){
        log.error(e);
    }

}
