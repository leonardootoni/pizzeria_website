function validate() {
    var mail = document.getElementById('mail').value;
    var phn = document.getElementById('phn').value;

    var pattern1 = /^[a-zA-Z0-9]{2,50}$/
    if (mail == '') {
        document.getElementById('errmail').innerHTML = "Please enter Email";
    } else {
        document.getElementById('errmail').innerHTML = "Email is valid";
    }

    var pattern3 = /^[0-9]{2,10}$/
    if (phn == '') {
        document.getElementById('errphn').innerHTML = "Please enter Phone Number";
    } else {
        document.getElementById('errphn').innerHTML = "Phone Number is valid";
    }
    alert("Unsubscribed!!!!");
}