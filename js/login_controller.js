/*******************************************************************************
* JS Pizzaria website controller class
********************************************************************************
* Controller Class to the Login page
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/
const LOGIN_BTN_SELECTOR = "#login-button";
const SIGN_IN_BTN_SELECTOR = "#sign-in-button";
const ERROR_MSG_SELECTOR = "#error-msg";
const EMAIL_FIELD_SELECTOR = "#email";
const PASSWORD_FIELD_SELECTOR = "#password";

const EMAIL_PASSWORD_INVALID_MSG_ERROR = "Email or Password is not valid."

const URL_SIGN_IN_PAGE = window.location.protocol + "//" + window.location.host + "/pages/sign_in.html";
const URL_CLOSE_ORDER_PAGE = window.location.protocol + "//" + window.location.host + "/pages/close_order.html";

//if the user logged-in previously, the login page is not showed anymore.
$.holdReady( true ); //holds the ready() event
if(isAuthenticatedUser()){
    redirectPage(URL_CLOSE_ORDER_PAGE);
}else{
    $.holdReady( false ); //release the ready() event
}

$(document).ready(function(){


    /*Event handler to the Login Button*/
    $(LOGIN_BTN_SELECTOR).click(function() {
        validateLoginForm();
    });

    /*Event handler to the Sign-in Button*/
    $(SIGN_IN_BTN_SELECTOR).click(function() {
        $(window).attr('location', URL_SIGN_IN_PAGE);
    });

});


function validateLoginForm(){
    let email = $(EMAIL_FIELD_SELECTOR).val();
    let password = $(PASSWORD_FIELD_SELECTOR).val();
    let errorMessage = "";

    errorMessage+=validateEmail(email);
    errorMessage+=validatePasswordLength(password);

    if(errorMessage!=""){
        //basic validation failed. Print msg and stop flow.
        $(ERROR_MSG_SELECTOR).html(errorMessage);
        $(ERROR_MSG_SELECTOR).css('display','block');
        $(PASSWORD_FIELD_SELECTOR).val("");
        return;
    }

    if(authenticateUser(email, password)){
        //redirect user
        setAuthenticatedUserIntoSession(email);
        redirectPage(URL_CLOSE_ORDER_PAGE);
    }else{
        //basic validation failed. Print msg and stop flow.
        $(ERROR_MSG_SELECTOR).html(EMAIL_PASSWORD_INVALID_MSG_ERROR);
        $(ERROR_MSG_SELECTOR).css('display','block');
        $(PASSWORD_FIELD_SELECTOR).val("");
        return;
    }

}

//validate email pattern
function validateEmail(email){
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (!emailPattern.test(email) ? "Enter a valid email address.<br>" : "");
}

//validate password length
function validatePasswordLength(password){
    return (password.length < 6 ? "Password must have at least 6 characters.<br>" : "");
}

function redirectPage(url){
    $(window).attr('location', url);
}
