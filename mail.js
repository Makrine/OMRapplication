valSuccess = false;
homo = false;
bi = false;
asexual = false;

emailjs.init("user_zDwr9wlrxHhUuUmH3Hfa6");

window.onload = function() {
    document.getElementById('application-form').addEventListener('submit', function(event) {
        event.preventDefault();
        this.validSuccess.value = valSuccess
        this.orien.value = "straight"
        if((this.orientation.value == "p" && this.gender.value == "male") || (this.orientation.value == "v" && this.gender.value == "female")) {
            homo = true;
            this.orien.value = "homosexual"
        
        } else if (this.orientation.value == "bi") {
            bi = true;
            this.orien.value = "bisexual"
        } else if (this.orientation.value == "none") {
            asexual = true;
            this.orien.value = "asexual"
        } 

        console.log(homo)
        console.log(bi)
        console.log(asexual)
        console.log(this.orien.value)
        emailjs.sendForm('service_form', 'template_form', this)
            .then(function() {
                document.getElementsByTagName("body")[0].innerHTML = `
                <h1>YOUR APPLICATION WAS SUBMITTED!</h1>
                <p>You will receive a copy of your application on the specified email</p>
                <p>No one will contact you in a couple of days!</p>
                <br><br><br></br>

                `
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}

function validate() {
    nation = document.getElementById("nation_name").value
    nation = nation.replace(/ /g, '_');
    key = document.getElementById("key").value

    var xhttp = new XMLHttpRequest();
    url = `https://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation=${nation}&checksum=${key}`
    xhttp.onreadystatechange = function() {   
        if(xhttp.readyState == 4) { // some data received
            if(xhttp.status == 200) { // everything went OK
                if(getResponse(this)) {
                    document.getElementById("valid_result").innerHTML = "Yep, it's all yours, baby!"
                    valSuccess = true;
                } else {
                    document.getElementById("valid_result").innerHTML = "Heyyyy! It's not your nation!! LIAR!!"
                    valSuccess = false;
                }
                console.log("OK")
                console.log(valSuccess)
            }
            else if(xhttp.status == 403) console.log(nation + ": Forbidden!");
            else if(xhttp.status == 404) console.log(nation + " does not exist");
            else if(xhttp.status == 429) console.log("Too many requests! Blocked for 15 min!");
            else console.log("Unknown Error! Contact Mackiland");
        }
        else if(xhttp.readyState == 2) { // request is sent
            console.log("Request Sent! ");
        }
    }
    xhttp.open("GET", url);
    xhttp.send();
}

function getResponse(xhttpResponse) {
    var result = xhttpResponse.response;
    resultInt = parseInt(result)
    return resultInt
}
