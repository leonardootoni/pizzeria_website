
//*locations page code
 var cityval,elem;;

$(function () {

    var w=$(window).width();
    var h=$(window).height();
    $('.dialogBox').css("left",(w/2-200)+"px");
    $('.dialogBox').css("top",(h/2-80)+"px");
    $.getJSON('../data/locationsJson.json',optionFill);

    //check weather there is location access
    if(navigator.geolocation){
        //store the position co-ordinates of users location  in cookies.
        navigator.geolocation.getCurrentPosition(function (position) {

                $.cookie("userLat",position.coords.latitude);
                $.cookie("userLng",position.coords.longitude);

            });
        }
});

//function to fill the data into select  box
function optionFill(data) {

    var tarOption=$("#sele");
    var template = $('#optionTmplt').html();
    //pass the data object ,template and the target element to function for mustache to process.
    populate(data,template,tarOption);

}

//event listener for detecting the value changed in the select box.
$("#sele").on("change",function () {

    cityval=this.value;
    //ajax shorthand method to get json data -- requires a server.--and pass object of it to the function represented as parameter.
    $.getJSON('../data/locationsJson.json',display);
    $('.dataContainer').fadeOut("fast");

});

//function to populate various store locations to a tabled format
function display(data) {

    var info =data;
    var val=cityval;
    var array = [];
    var collection;
    var template2=$('#locTmplt').html();
    var target=$('.locations-parent');

    //check weather the selected value in the select box matches the data sets and render the matched ones.
    for(var i=0;i<data.locations.length;i++){

        if (data.locations[i].city === val){

            array.push(data.locations[i]);

        }

    }
    //store the data in object
    collection={"cities":array};

    //pass the created object to function alaong with template and target element for mustache to render.
    populate(collection,template2,target);

}

//function to display template in targeted element(recieves data object ,template and target as parameters).
function populate(obj,temp,tar) {

    var target=tar;
    var template = temp;
    var html = Mustache.to_html(template,obj);
    target.append(html);
}

//event listener for on click map.
$(document).delegate(".mapimage","click",function () {

    //retrieve the stored data as an attribute with data method.
    var latitude =parseFloat($(this).data("lng"));
    var longitude=parseFloat($(this).data("lat"));
    var address=$(this).data("address");

    //call to the function which loads the location map on click on that locations map image.sends latitude,longitude,address of location as parameters.
    mapLoader(latitude,longitude,address);

});

//function map loader which loads the location map on click on that locations map image.accept parameters.
function mapLoader(latM,lngM,address) {
    //target for map to render.
    var mapTarget=document.getElementById("map");
    $("#map").removeClass("map-panel");
    $("#map").addClass("mapfull");
    //object to store lat and lng to pass it to function later.
    var latlng = {

        lat:lngM, lng: latM

    };

    //create an object of google.maps.Map with parameters as target element and coordinate objects.
    var map = new google.maps.Map(mapTarget, {
        center: latlng,
        zoom: 9
    });

    //icon for marker;
    var image = '../images/logo_48.ico';

    //creating new marker object with coords. ,map object and image/icon.
    var marker = new google.maps.Marker({

        position: latlng,
        map: map,
        icon:image

    });

    $('#map-container').show();

    //google api event listener on click on the map marker .
    marker.addListener("click",function () {
        //create an object of infowindow to show up on click on the map marker
        var window=new google.maps.InfoWindow();
        var data="<p><img src='../images/logo.png' height='50' width='50'><span style='font-size: 1.2em;'><b><u>Pizzeria</u></b></Span><br>"+address+"</p>";
        window.setContent(data);
        window.open(map,marker);

    });
}


$('#map-container span').click(function () {        //close button

    $('#map-container').hide("fast");
    $('#directions').hide("fast");

});

//event listener for click on the get position button to show directions.
$(document).delegate(".getdir","click",function () {

    elem=$(this);
    getpos();
});

//function to get the destination coords.
function getpos() {
    //get destination cords from data stored in element as attributes.
    var datanod = elem.parent().siblings(':first-child');
    var destlat = datanod.data("lat");
    var destlng = datanod.data("lng");

    //pass the retrieved destn. values to the function.
    getdirection(destlat,destlng);

}

//function grtdirection
function getdirection(destlat,destlng) {

        //create an object of the directions service object of google maps api .
        var dService = new google.maps.DirectionsService();
        //create an object of the directions render object of google maps api to display directions.
        var dDisplay = new google.maps.DirectionsRenderer();

        //store value of users latitude and longitude from cookies as an object .
        var centerl = new google.maps.LatLng(localStorage.getItem("userLt"),localStorage.getItem("userLn"));
        //object containing options for map.
        var mapOptions = {

            zoom:15,
            center: centerl

        };
        ////create an object of google.maps.Map with parameters as target element and options.
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var image = '../images/logo_48.ico';
        var marker = new google.maps.Marker({

            position:{lat:destlat,lng:destlng},
            map: map,
            icon:image

        });
        //set map for rendering directions.
        dDisplay.setMap(map);
        //function call to function for calculating drections.takes various objects.
        routecal(dService,dDisplay,destlat,destlng,centerl);

        //set a panel with the waypoints to direction by directions renderer with tharget as parameter.
        dDisplay.setPanel(document.getElementById('directions'));
        $('#map-container').show();
        $('#directions').show();

}

//function calculate direction.objects and coords. as parameters.
function routecal(dService,dDisplay,dla,dln,b) {
     //route with the given coords parameters.which produce a function as result with response and status as parameters.
    dService.route({origin:b,                   //start location
            destination:{lat:dla,lng:dln},      //end location
            travelMode:'DRIVING'                //mode of travel

        },function (response,status) {
            //succes
            if(status=='OK'){
                //render the response retrieved.
                dDisplay.setDirections(response);

            }
        });
    }




