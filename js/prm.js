function validate() {
    var mail = document.getElementById('mail').value;
    var phn = document.getElementById('phn').value;

    var pattern1 = /^[a-zA-Z0-9]{2,50}$/
    if(mail == ''){
        document.getElementById('errmail').innerHTML = "Please enter Email";
    }else {
        document.getElementById('errmail').innerHTML = "Email is valid";
    }

    var pattern3 = /^[0-9]{2,10}$/
    if(phn == ''){
        document.getElementById('errphn').innerHTML = "Please enter Phone Number";
    } else {
        document.getElementById('errphn').innerHTML = "Phone Number is valid";
    }
    alert("Registered");
}
function resetform() {
    document.getElementById('mail').value = '';
    document.getElementById('phn').value = '';
}
$(document).ready(function() {
    $('#previous').on('click', function(){
        $('#im_' + currentImage).stop().fadeOut(1);
        decreaseImage();
        $('#im_' + currentImage).stop().fadeIn(1);
    });
    $('#next').on('click', function(){
        $('#im_' + currentImage).stop().fadeOut(1);
        increaseImage();
        $('#im_' + currentImage).stop().fadeIn(1);
    });

    var currentImage = 1;
    var totalImages = 3;

    function increaseImage() {
        ++currentImage;
        if(currentImage > totalImages) {
            currentImage = 1;
        }
    }
    function decreaseImage() {
        --currentImage;
        if(currentImage < 1) {
            currentImage = totalImages;
        }
    }
});