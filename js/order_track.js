
$(document).ready(function () {
    if (typeof(Storage) !== "undefined") {
        main();
    } else {
       alert("Soorry!,Webstorage unavailable. back to menu page.");
       window.location.href="menu.html";
    }
});

function main() {
    var ordernum=[1111];

    $('#search').on("click",search);
}


function search(){
    var orderNum=$('#textBox').val();
    if(orderNum){
        $('#textBox').css("border-color","");


    }
    else{
        $('#textBox').css("border-color","red");
    }

}

