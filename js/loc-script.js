
var d = document.documentElement;
var _=function (id) {
    return document.getElementById(id)
};



var storedetails = function (sCity,adress,services,url,timing,source) {
    this.sCity=sCity;
    this.sAddress=adress;
    this.service=services;
    this.mapUrl=url;
    this.sTiming=timing;
    this.sSrc=source;
};
var Toronto=new storedetails("Toronto","279 Wellesley","Pickup","https://www.google.ca/maps/@43.6681236,-79.3704017,18.37z","10:00am-11:00pm","../images/well.png");
var Etobicoke=new storedetails("Etobicoke","123 Humber","Pickup,Delivery","https://www.google.ca/maps/@43.7298294,-79.6048928,17.6z","10:00am-11:00pm","../images/humber.png");
var Mississauga=new storedetails("Mississauga","85687 Centerview","Pickup,Delivery","https://www.google.ca/maps/@43.5896923,-79.660578,15.86z","10:00am-11:00pm","../images/missi.png");

var address=[Toronto,Etobicoke,Mississauga];

window.onload=function () {
    _('child').style.position="absolute";
    _('child').style.left = d.clientWidth/2-200+"px";
    _('child').style.top = d.clientHeight/2-80+"px";
    document.querySelector("#list > li div ul").style.display="none";

   var cities=["Toronto","Etobicoke","Missisauga"];
   for(var i=0;i<cities.length;i++){

   }
};


$('#selected').click(function () {
        $("#list > li div ul").slideToggle();
});

function setSpan(val) {
    _("selected").innerHTML=val;
    _("selected").value=val;
    $('#list > li div ul').slideToggle();
}

function  set() {
    var l = _('selected').innerHTML;
    alert(l);
    if(l.length <1){
        alert("Please choose a Location");
    }
    {

        if (l === "Toronto") {
            append(Toronto);
            $('#modal').fadeOut("Fast");
        }
        if (l === "Etobicoke") {
            append(Etobicoke);
            $('#modal').fadeOut("Fast");
        }
        if (l === "Mississauga") {
            append(Mississauga);
            $('#modal').fadeOut("Fast");
        }

    }
}

function append(get){
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");

    div1.innerHTML='<div ><figure> <a href='+get.mapUrl+'><img src='+get.sSrc+' width="350px" height="=280px" class="image"></a> <figcaption>View On Map</figcaption> </figure> </div>';
    div2.innerHTML='<div ><span class="addheader">'+get.sAddress+'</span><br><span class="addcity"><h3>'+get.sCity+'</h3></span><br><span class="addservice">Services:'+get.service+'</span><br><span class="addtime"><p>Open:'+get.sTiming+'</p></span></div>';
    div1.setAttribute("class","inner1");
    div2.setAttribute("class","inner2");

    _("mainbody").append(div1);
    _("mainbody").append(div2);

}
