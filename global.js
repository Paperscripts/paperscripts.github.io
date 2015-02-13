/** Global script for paperscripts.github.io **/

function make_nav() {
    function processData(data) {
        // Taking care of data.
        document.getElementById("nav").innerHTML = data;
    }

    function handler() {
        //alert("Handling stuff.");
        if (this.readyState == this.DONE) {
            if (this.status == 200 &&
                this.responseText != null &&
                this.responseXML.getElementsByTagName("navbar")[0].innerHTML) {
                processData(this.responseXML.getElementsByTagName("navbar")[0].innerHTML);
            } else {
                processData("Failed reading");
            }
        } else {
            processData("Failed loading");
        }
    }

    var client = new XMLHttpRequest();
    client.onreadystatechange = handler;
    client.open("GET", "navbar.xml");
    client.send();
}

function load() {
    // To be run in <body onload>.
    make_nav();
}
