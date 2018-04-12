function validate(){
       var namespace = document.getElementById('namespace').value;

       var resume = document.getElementById('resume').value;
        console.log(resume);

        var pattern = /^[a-zA-Z]{2,30}$/ ;
        if(namespace === ""){
            document.getElementById('namespace').innerHTML = "Please enter a name";
        } else {
            document.getElementById('namespace').innerHTML = "name is valid";
        }

        if(resume === ""){
            document.getElementById('resume').innerHTML = "Please paste resume";
        } else {
            document.getElementById('resume').innerHTML = "thank you";
        }
        }


