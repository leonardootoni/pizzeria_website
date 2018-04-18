/*******************************************************************************
* JS Pizzaria website controller class
********************************************************************************
* Controller Class to the Sign-in page
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
********************************************************************************
*Dependencies: user_model.js, modal_popup.css
*******************************************************************************/
const EMAIL_FORM = "email";
const PASSORD_CONFIRMATION_FORM_FIELD = "re_password";
const HTML_INPUT_BUTTON_TYPE = "button";

const ERROR_MSG_CSS_CLASS = "error-msg";
const SUCCESS_MSG_CSS_CLASS = "success-msg";
const MSG_HEADER_SELECTOR = "#messenger_header";

const EMAIL_IN_USE_VALIDATION_ERROR = "Registration error: Email already registred. You must to use another one.";
const USER_SUCCESSFULLY_REGISTERED = "User successfully registered.";


const MODAL_POPUP = "#myModal";
const MODAL_POPUP_OK_BUTTON = "#btn-ok-signin";
const URL_LOGIN = window.location.protocol + "//" + window.location.host + "/pages/login.html";

$(document).ready(function(){

    $('#register-button').click(function() {
        //Only try to register the user if there is not form validation errors
        if($('#registerForm').parsley().validate()){
            //run only if there is no form validation errors
            registerUser();
        }
    });

    /*Handle the action when the user clicks on the "OK" in the modal popup*/
    $(MODAL_POPUP_OK_BUTTON).click(function() {
        $(window).attr('location', URL_LOGIN);
    });

});

function registerUser(){

    let userObject = buildUserObject();

    if(getUserDataByEmail(userObject[EMAIL_FORM]) != null){

        //It exists an user registred with the email informed. Reject the application
        $(MSG_HEADER_SELECTOR).html(EMAIL_IN_USE_VALIDATION_ERROR);
        $(MSG_HEADER_SELECTOR).addClass(ERROR_MSG_CSS_CLASS);
        $("."+ERROR_MSG_CSS_CLASS).css('display','block');
        return;

    }else{

        //user does not exists, save data into session.
        saveUserData(userObject);
        $(MSG_HEADER_SELECTOR).html(USER_SUCCESSFULLY_REGISTERED);
        $(MSG_HEADER_SELECTOR).removeClass(ERROR_MSG_CSS_CLASS);
        $(MSG_HEADER_SELECTOR).addClass(SUCCESS_MSG_CSS_CLASS);
        $("."+SUCCESS_MSG_CSS_CLASS).css('display','block');

        //Show modal popup to the user questioning wich path do follow
        $(MODAL_POPUP).css({display: "block"});

    }
}



//Build and single userObject from the page form
function buildUserObject(){

    let userObject = new Object();

    $("form").each(function(){
        let inputs = $(this).find(':input') //<-- Should return all input elements in that specific form.

        //build an userObject with all input data form
        $(inputs).each(function(index, element){
            //console.log(element);
            if(element.name!=PASSORD_CONFIRMATION_FORM_FIELD &&
                    element.type != HTML_INPUT_BUTTON_TYPE){

                userObject[element.name] = element.value;

            }
        });
    });

    return userObject;

}
