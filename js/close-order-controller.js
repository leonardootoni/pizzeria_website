/*******************************************************************************
* JS Pizzaria website controller class
********************************************************************************
* Controller Class to the Close-Order page
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
********************************************************************************
*Dependencies: pizzeria_model.js, user_model.js
*******************************************************************************/

const SUCCESSFUL_PAYMENT_MSG = "Successful Payment";
const CLOSED_ORDER_TEMPLATE_SELECTOR = "#closed-order-template";
const CLOSED_ORDER_MESSAGE_SELECTOR = "#closed-order-message";

$(document).ready(function(){

    //apply default input masks
    $('#credit-card-number').mask('0000-0000-0000-0000');
    $('#credit-card-security-code').mask('000');

    $('#make-payment').click(function(){
        if($('#credit-card-form').parsley().validate()){
            performPayment();
        }
    });
});

function performPayment(){

    //get basket

    //hide the credit card form
    $("form").css("display", "none");
    $("#title-page").html(SUCCESSFUL_PAYMENT_MSG);

    //print data into the screen
    //Get the reusable template in the checkout page
    //uses Handlebars as template engine
    let source = $(CLOSED_ORDER_TEMPLATE_SELECTOR).html();
    let template = Handlebars.compile(source);

    let userData = getUserDataByEmail(getAuthenticatedUserEmail());

    let object = new Object();
    object.firstName = userData.first_name;
    object.lastName = userData.last_name;
    object.minutes = (10*Math.random()+15).toFixed(0); //dynamic
    object.orderId=(10000000000*Math.random()).toFixed(0) //dy
    object.address = userData.address + ", " +
                    (userData.compl != null ? userData.compl : "") + ", " +
                    userData.province + ", " +
                    userData.city + ", " +
                    userData.postalCode

    object.email = userData.email;

    let html = template(object);
    $(CLOSED_ORDER_MESSAGE_SELECTOR).html(html);
    $(CLOSED_ORDER_MESSAGE_SELECTOR).css("display", "block");


    //remove basket
    removeUserBasket(); //remove the basket from session
    controlShoppingCartExhibition(); //update the website header


}
