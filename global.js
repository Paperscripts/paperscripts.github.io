/** Global script for paperscripts.github.io **/

function make_nav() {
    function processData(data) {
        // Taking care of data.
        alert("Got data '" + data + "'.");
        document.getElementById("nav").innerHTML = data;
    }

    function handler() {
        alert("Handling stuff.");
        if (this.readyState == this.DONE) {
            if (this.status == 200 &&
                this.responseText != null &&
                this.responseXML.getElementsByTagName("ul")[0].textContext) {
                processData(
                    this.responseXML.getElementById("candy").innerHTML);
            } else {
                processData(null);
            }
        } else {
            processData(null);
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
