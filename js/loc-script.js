var cityval;

$(function () {
    var w=$(window).width();
    var h=$(window).height();
    $('.dialogBox').css("left",(w/2-200)+"px");
    $('.dialogBox').css("top",(h/2-80)+"px");
    $.getJSON('../data/locationsJson.json',optionFill);

    console.log($('#sele').val());



});

function optionFill(data) {
    var tarOption=$("#sele");
    var template = $('#optionTmplt').html();
    populate(data,template,tarOption);
}

$("#sele").on("change",function () {

    cityval=this.value;
    $.getJSON('../data/locationsJson.json',display);
    $('.dataContainer').fadeOut("fast");

});

function display(data) {

    var info =data;
    var val=cityval;
    var array = [];
    var collection;
    var template2=$('#locTmplt').html();
    var target=$('.locations-parent');

    for(var i=0;i<data.locations.length;i++){

        if (data.locations[i].city === val){

            array.push(data.locations[i]);

        }

    }
    collection={"cities":array}
    populate(collection,template2,target);

}

//function to display template in targeted element
function populate(obj,temp,tar) {

    var target=tar;
    var template = temp;
    var html = Mustache.to_html(template,obj);
    target.append(html);
}

$(document).delegate(".mapimage","click",function () {
    var latitude =parseFloat($(this).data("lng"));
    var longitude=parseFloat($(this).data("lat"));
    var address=$(this).data("address");
    mapLoader(latitude,longitude,address);

});

function mapLoader(latM,lngM,address) {
    console.log(latM);
    console.log(lngM);

    var mapTarget=document.getElementById("map");
    var latlng = {
        lat:lngM, lng: latM
    };
    var  map = new google.maps.Map(mapTarget, {
        center: latlng,
        zoom: 7
    });
    var image = '../images/logo_48.ico';
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon:image
    });
    $('#map-container').show();

    marker.addListener("click",function () {
        var window=new google.maps.InfoWindow();
        var data="<p><img src='../images/logo.png' height='50' width='50'><span style='font-size: 1.2em;'><b><u>Pizzeria</u></b></Span><br>"+address+"</p>";
        window.setContent(data);
        window.open(map,marker);

    });

}

$('#map-container span').click(function () {
    $('#map-container').hide("fast");
});

$(document).delegate(".getdir","click",function () {
    alert("The directions service is currently under developement")
});

