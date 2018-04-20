//java script specific for email offers
let getName="",getEmail="",getCEmail="";
var getId;
getName=$('#Name');
getEmail=$('#Email');
getCEmail=$('#CEmail');

$(document).ready(
    function () {
        $('.mail-invalid').text("");
        $(document).tooltip;
    });

$('.submit').prop("disabled", true).css("background", "lightblue").css("color","grey");


function enable() {
    if($('.mail-invalid').text()=="" && getName.val()!=="" && getCEmail.val()!=="") {

        $('.submit').prop("disabled", false).css("background", "green").css("color","white");
    }
    else{
                $('.submit').prop("disabled", true).css("background", "lightblue");
    }
}


    $(':input').on("focus",function () {
        getId=this.id;
        $('#'+getId).on("input",this,function () {
            required(getId);
            enable();
        });
    });




    function required(eId) {
        let pattern = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
        let element = $('#' + eId);
        let getvalue = element.val();
        if (getvalue) {
            element.css("border-color", "");
            element.prev().css("color", "");
            if(getName.val().length>=1 && getEmail.val().length>=1 && getCEmail.val().length>=1) {

                $('.name-invalid').html("");
            }
        }
        else {
            element.css("border-color", "red");
            element.prev().css("color", "red");
            $('.name-invalid').html("* Required Fields.");
            if(getName.val().length==0 && getEmail.val().length==0 && getCEmail.val().length==0) {

                $('.name-invalid').html("* Required Fields.");
            }

        }




            if (eId === "Email") {
                if (getvalue.match(pattern)) {
                    $('.mail-invalid').html("");
                    if (getCEmail.val()) {
                        if (getvalue !== $('#CEmail').val()) {
                            $(element).css("border-color", "red");
                            $(element).prev().css("color", "red");
                            $('.mail-invalid').html("* E-Mail does not match.");
                        }
                        else {
                            $('.mail-invalid').html("");

                        }
                    }
                }
                else {
                    $(element).css("border-color", "red");
                    $(element).prev().css("color", "red");
                    $('.mail-invalid').html("* Invalid Email.");
                }


            }


            if (eId === "CEmail") {
                if (getvalue) {
                    if (getvalue !== $('#Email').val()) {
                        $(element).css("border-color", "red");
                        $(element).prev().css("color", "red");
                        $('.mail-invalid').html("* E-Mail does not match.");
                    }
                    else {
                        $('.mail-invalid').html("");
                        //return getvalue;
                    }
                }
            }

    }


    $('#reset').on("click",function () {
        let def=$(':text');
        def.css("border-color","");
        $(def).prev().css("color","");
        $('.mail-invalid,.name-invalid').html("");
        $('.submit').prop("disabled", true).css("background", "lightblue").css("color","grey");
    });

$('#mailForm').submit(function () {


    let w=window.open("","","height=150px,width=300px,left=500px,top=250px");
    w.document.write("<html><head><title>Cheers!</title></head><body>");
    w.document.write("<p id='box-window' style='font-size: large;'>Thank you!<strong style='color:grey;'> "+getName.val()+", </strong>for Registering with us.</p>");
    w.document.write("<input type='button' id='#close-box' value='Ok' onclick='self.close()' style='margin-left: 120px;color: black; height: 40px;width: 50px;border-radius:5px;'>");
    w.document.write("</body></html>")
});
