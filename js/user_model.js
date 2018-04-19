/*******************************************************************************
* JS Pizzaria website model class
********************************************************************************
* It centralizes all common methods to work with user login data
********************************************************************************
 Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/
const EMAIL_FORM_FIELD = "email";
const PASSWORD_FORM_FIELD = "password";
const USER_DATABASE = "USER_DATABASE";
const USER_AUTHENTICATED_CREDENTIAL = "USER_AUTHENTICATED_CREDENTIAL";

//Method to save all user form data into the session
function saveUserData(userObject){

    //let userDataBase = JSON.parse(sessionStorage.getItem(USER_DATABASE));
    let userDataBase = JSON.parse(window.localStorage.getItem(USER_DATABASE));
    console.log(userDataBase);

    if(userDataBase == null){
        userDataBase = [];
    }
    userDataBase.push(userObject);
    //sessionStorage.setItem(USER_DATABASE, JSON.stringify(userDataBase));
    window.localStorage.setItem(USER_DATABASE, JSON.stringify(userDataBase));
}

//From the storage, get a user by email, otherwise returns null
function getUserDataByEmail(userEmail){

    let userDataBase = JSON.parse(window.localStorage.getItem(USER_DATABASE));
    let userObject = null;

    if(userDataBase != null){
        for(let i=0; i<userDataBase.length;i++){
            if(userDataBase[i][EMAIL_FORM_FIELD] == userEmail){
                //user found
                userObject = userDataBase[i];
                break;
            }
        }
    }

    return userObject;
}

//authenticate user, matching email and password
function authenticateUser(email, password){

    let authenticated = false;

    //try to recover the of user by email
    let userObject = getUserDataByEmail(email);
    if(userObject != null && userObject[PASSWORD_FORM_FIELD] == password){
        authenticated = true;
    }

    return authenticated;

}

//Saves authenticated user into session
function setAuthenticatedUserIntoSession(email){
    sessionStorage.setItem(USER_AUTHENTICATED_CREDENTIAL, JSON.stringify(email));
}

//Verify if the user is set in the session
function isAuthenticatedUser(){

    //recover the userBasket from the session.
    let authenticated = false;
    let sessionEmail = JSON.parse(sessionStorage.getItem(USER_AUTHENTICATED_CREDENTIAL));
    if(sessionEmail != null && sessionEmail != ""){
        authenticated = true
    }
    console.log("User authenticated? " + authenticated);
    return authenticated;

}
