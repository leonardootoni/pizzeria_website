
// Define the pizzas prices by size
var priceBySize = [

];


$(document).ready( function(){

    $( "#accordion" ).accordion();

    $("#pizza-small-container").click(function(){
        setEffect($("#pizza-small-container"));
    });

    $("#pizza-medium-container").click(function(){
        setEffect($("#pizza-medium-container"));
    });

    $("#pizza-large-container").click(function(){
        setEffect($("#pizza-large-container"));
    });

    $("#pizza-x-large-container").click(function(){
        setEffect($("#pizza-x-large-container"));
    });

    setEffect($("#pizza-small-container"));

});


//store the last element clicked
var lastElementClicked = "";

/*Exchange css selectors over the pizza images in order to provide a visual
transitional effect*/
function setEffect(elementId) {

    if (lastElementClicked != "") {
        lastElementClicked.removeClass("figure-selected");
        lastElementClicked.addClass("figure-unselected");
    }

    elementId.removeClass("figure-unselected");
    elementId.addClass("figure-selected");
    lastElementClicked = elementId;

}
