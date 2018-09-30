/*******************************************************************************
    Master WEBSITE's JS file. All common routines are saved into this file,
    once it will be imported to all pages.
********************************************************************************
Author: *** Leonardo Otoni de Assis ***
*******************************************************************************/

/*Object to store all website menu links. It uses the key:value approach, that
means:
        key: The HTML menu name
        value: The html href property
*/
var menu_HTML = {
  Menu: "menu.html",
  Promo: "promo.html",
  "Mount your Pizza": "mount_your_pizza.html",
  "Order Track": "order_track.html",
  "Nutritional Guide": "nutritional_guide.html",
  "Email Offers": "email_offers.html",
  Locations: "locations.html",
  Careers: "careers.html",
  "About Us": "aboutus.html",
  "Contact Us": "contactus.html"
};

//partial image name
const CART_IMAGE = "images/cart/icons8-shopping-cart-96-";
const CART_IMAGE_EXTENSION = ".png";
const HOME_PAGE = window.location.protocol + "//" + window.location.host + "/index.html";
const SHOPPING_CART_SELECTOR = "shopping-cart";
const MAIN_MENU_CSS_CLASS = "menu-button";
const MENU_HOME_PAGE_ID = "menu_home_page";

var _$ = function(id) {
  return document.getElementById(id);
};

//Get a reference for a DOM element only if is the home page
const menu_home_page = _$(MENU_HOME_PAGE_ID);

//Using addEventListener to guarantee that these methods are called even if someone
//specify a window.onload in another JS.
window.addEventListener("load", function() {
  generateMenuHTML();
  controlShoppingCartExhibition();
});

//Generic function to insert the menu links according to the object menu_html
function generateMenuHTML() {
  let menuItems = document.getElementsByClassName(MAIN_MENU_CSS_CLASS);
  let menuItem = "";
  let directory = menu_home_page ? "pages/" : "";
  for (let i = 0; i < menuItems.length; i++) {
    menuItem = menuItems[i];
    menuItem.href = directory + menu_HTML[menuItem.text];
  }
}
//Exhibit the shopping cart icon on the website header whenever the customer add
//a purchase into the basket
function controlShoppingCartExhibition() {
  let cart = JSON.parse(sessionStorage.getItem("USER_CUSTOM_PIZZA_BASKET"));
  if (cart != null) {
    let elements = cart.length > 9 ? 9 : cart.length;
    let pathImage = "";
    if (window.location.href.includes("/pages/")) {
      pathImage += "../";
    }

    pathImage += CART_IMAGE + elements + CART_IMAGE_EXTENSION;

    _$(SHOPPING_CART_SELECTOR).src = pathImage;
    _$(SHOPPING_CART_SELECTOR).style.visibility = "visible";
  } else {
    _$(SHOPPING_CART_SELECTOR).style.visibility = "hidden";
  }
}
