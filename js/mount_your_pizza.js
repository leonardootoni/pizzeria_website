$(document).ready(function() {

    $("#accordion").accordion({
        heightStyle: "content",
        autoHeight: false,
        clearStyle: true,
    });

    //load all pizza data and put them into the page
    loadPizzaDataToPage("#pizza-flavour-options", pizzaMenuData);
    loadPizzaDataToPage("#pizza-toppings-options", pizzaToppings);
    loadPizzaDataToPage("#pizza-cheese-options", pizzaCheeses);

    /*set to #pizza-sizes children elements an event handler*/
    $("#pizza-sizes").children().each(function(index, item) {

        $("#" + pizzaSize[index].id).click(function() {
            performSelectionPizzaSize($("#" + pizzaSize[index].id), "PizzaSize");
        });
    });

    /*set to #pizza flavours children elements an event handler*/
    $("#pizza-flavour-options").children().each(function(index, item) {

        $("#" + pizzaMenuData[index].id).click(function() {
            performSelectionPizzaFlavour($("#" + pizzaMenuData[index].id), "PizzaFlavour");
        });
    });

    /*set to #pizza toppings children elements an event handler*/
    $("#pizza-toppings-options").children().each(function(index, item) {

        $("#" + pizzaToppings[index].id).click(function() {
            performSelectionOptionals($("#" + pizzaToppings[index].id), "pizzaToppings");
        });
    });

    /*set to #pizza toppings children elements an event handler*/
    $("#pizza-cheese-options").children().each(function(index, item) {

        $("#" + pizzaCheeses[index].id).click(function() {
            performSelectionOptionals($("#" + pizzaCheeses[index].id), "pizzaCheeses");
        });
    });

    $("#pizza-quantity").click(function() {
        updateBasketAmount($("#pizza-quantity").val());
    });

    //Set a default pizza size pre-selected
    performSelectionPizzaSize($("#" + pizzaSize[0].id), "PizzaSize");

});


//store the last Pizza Size element clicked
var lastSizeClicked = "";

//store the last Pizza element clicked
var lastPizzaClicked = "";

//Object used to store the temporary selected data by the user
var customPizza = {
    size: "",
    flavour: "",
    basePrice: 0,
    multiplier: 1,
    toppings: [],
    cheeses: [],
    amount: 1,
    finalPrice: function() {
        if (this.size != "" && this.flavour != "") {

            //pizza price updated according to it size
            let subTotal = this.basePrice * this.multiplier;

            for (let i = 0; i < this.toppings.length; i++) {
                subTotal += this.toppings[i].price;
            }

            for (let i = 0; i < this.cheeses.length; i++) {
                subTotal += this.cheeses[i].price;
            }

            let calculatedFinalPrince = parseFloat(subTotal * this.amount).toFixed(2);
            console.log("Calculated final price: " + calculatedFinalPrince);

            return calculatedFinalPrince;

        } else {
            return 0;
        }
    }
};

function performSelectionPizzaSize(elementId, subGroup){

    selectElement(elementId, subGroup);
    setCustomPizza(elementId, subGroup);

    //update the prices according to the size selection
    loadPizzaDataToPage("#pizza-flavour-options", pizzaMenuData);
    loadPizzaDataToPage("#pizza-toppings-options", pizzaToppings);
    loadPizzaDataToPage("#pizza-cheese-options", pizzaCheeses);

    //Perform a reset on the amount select element
    resetBasketAmount();

}

function performSelectionPizzaFlavour(elementId, subGroup){

    selectElement(elementId, subGroup);
    setCustomPizza(elementId, subGroup);

    //Enable or disable the "Add to Order Button"
    defineAddOrderButtonBehaviour();

    updateFinalPriceOnScreen();

}

//Toppings or cheeses
function performSelectionOptionals(elementId, subGroup){

    updateCustomPizzaOptionals(elementId, subGroup);
    selectElement(elementId, subGroup);
    updateFinalPriceOnScreen();

}

//Manage all optionals selected by the user
function updateCustomPizzaOptionals(elementId, subGroup){

    dataModel = (subGroup == "pizzaToppings" ? pizzaToppings : pizzaCheeses);

    if (!elementId.hasClass("figure-unselected")) {
        //item was unselected, needs to remove optional from the pizzaCustom Object
        deleteItemCustomPizzaArray(customPizza.toppings, null, elementId.selector.substring(1));
    } else {
        addItemCustomPizzaArray(customPizza.toppings, dataModel, elementId.selector.substring(1));
    }
}

/*Apply css class style on select elements*/
function selectElement(elementId, subGroup) {

    if (subGroup == "PizzaSize") {

        if (lastSizeClicked != "") {
            lastSizeClicked.removeClass("figure-selected");
            lastSizeClicked.addClass("figure-unselected");
        }

        elementId.removeClass("figure-unselected");
        elementId.addClass("figure-selected");
        lastSizeClicked = elementId;

    } else if (subGroup == "PizzaFlavour") {

        if (lastPizzaClicked != "") {
            lastPizzaClicked.removeClass("figure-selected");
            lastPizzaClicked.addClass("figure-unselected");
        }

        elementId.removeClass("figure-unselected");
        elementId.addClass("figure-selected");
        lastPizzaClicked = elementId;

    } else if (subGroup == "pizzaToppings" || subGroup == "pizzaCheeses") {

        if (elementId.hasClass("figure-unselected")) {
            elementId.removeClass("figure-unselected");
            elementId.addClass("figure-selected");
        } else {
            elementId.removeClass("figure-selected");
            elementId.addClass("figure-unselected");
        }

    } else {
        console.error("Must define a subGroup");
    }
}

/* Assign custom data into the customPizza object, according to the Options
selected by the user*/
function setCustomPizza(elementId, subGroup) {

    if (subGroup == "PizzaSize") {

        //Set customPizza's flavour and price multiplier
        customPizza.size = elementId.selector.substring(1);

        //Search in the pizzaSize to get the pizza base price
        customPizza.multiplier = (getPropertyValueByName(pizzaSize, customPizza.size)).basePriceMultiplier;

    } else if (subGroup == "PizzaFlavour") {

        //Set customPizza's flavour and base price
        customPizza.flavour = elementId.selector.substring(1);

        //Search in the pizzaMenuData to get the pizza base price
        customPizza.basePrice = (getPropertyValueByName(pizzaMenuData, customPizza.flavour)).price;

    } else {
        console.error("subGroup value not specified.");
    }
}

/*Generic method to search into a dataObject and return a propertie value
according to the propertieName specified
    dataObject - The dataObject to be searched
    propertyIdField - The field property to be searched
    propertyIdValue - The value to be compared
    propertyValue - The property to get the value;
*/
function getPropertyValueByName(dataObject, propertyIdValue) {

    for (let i = 0; i < dataObject.length; i++) {
        if (dataObject[i].id == propertyIdValue) {
            return dataObject[i];
        }
    }

    console.error("Property " + propertyName + " not found in " + dataObject);
}


/*Load all pizza data and put them into the page.
Set the defaul json data into the html elements in the accordion component*/
function loadPizzaDataToPage(selector, object) {

    $(selector).each(function(index, item) {

        $(item).children().each(function(index, item) {

            //set the figure id value
            $(item).prop("id", object[index].id);

            //set the image child element
            $(item).find("img").prop("src", object[index].imageURL);
            $(item).find("img").prop("alt", object[index].name + ":" + object[index].description);
            $(item).find("img").prop("title", object[index].description);

            //Set the figcaption name and price
            $(item).find("figcaption").children().first().html(object[index].name);

            let price = customPizza.multiplier * object[index].price;
            price = Number(price).toFixed(2);

            //console.log("multiplier: " + customPizza.multiplier + " price: " + object[index].price);
            //console.log("Final Price: "+ price);

            let priceHTML = "<span>$</span><span>" + price + "</span>";
            $(item).find("figcaption").children().next().html(priceHTML);

        });
    });

}


function updateFinalPriceOnScreen(){
    $("#final-price-value").html("$" + customPizza.finalPrice());
}


//Set the amount of items in the basket and update the price
function updateBasketAmount(amount){
    if(amount!=null){
        customPizza.amount = amount;
    }
    updateFinalPriceOnScreen();

    console.log("Updating basket. Amount:" + amount + " final price: " + customPizza.finalPrice());

}

function resetBasketAmount(){
    customPizza.amount = 1;
    $("#pizza-quantity").val(1);
    $("#final-price-value").html("$ " + customPizza.finalPrice());
}

/*Enable or disable the button "Add To Order" according to the pizza size and
flavour selection*/
function defineAddOrderButtonBehaviour() {

    if (customPizza.finalPrice() == 0) {
        $("#add-order-button").attr("disabled", "");
        $("#pizza-quantity").attr("disabled", "");
    } else {
        $("#add-order-button").removeAttr("disabled");
        $("#pizza-quantity").removeAttr("disabled");
    }

}

/*Delete an optional item into the arrays [toppings or cheeses] in the object
customPizza*/
function deleteItemCustomPizzaArray(array, dataModel, elementId) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].id == elementId) {
            array.splice(i, 1);

            return;
        }
    }

    console.error("OPERATION_DELETE: elementId " + elementId + " was not found into the dataModel:");
    console.error(dataModel);

}


/*Add an optional item into the arrays [toppings or cheeses] in the object
customPizza*/
function addItemCustomPizzaArray(array, dataModel, elementId) {

    let price = "";
    let name = "";

    for (let i = 0; i < dataModel.length; i++) {
        if (dataModel[i].id == elementId) {

            //get the name and price from the data moodel
            price = Number(dataModel[i].price);
            name = dataModel[i].name;

            array.push({
                "id": elementId,
                "name": name,
                "price": price
            });

            return;
        }
    }

    console.error("OPERATION ADD: elementId " + elementId + " was not found into the dataModel:");
    console.error(dataModel);

}
