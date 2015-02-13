/** Global script for paperscripts.github.io **/

function make_nav() {
    alert("Loading nav.");
    var navbar = document.getElementById("nav");
    var navbarfilegetter = new XMLHttpRequest();
    var navbarfilecontents = "";
    alert("Created variables for loading nav");
    navbarfilegetter.open("GET", "navbar.xml", false);
    alert("Opened file for nav");
    navbarfilecontents = navbarfilegetter.responseXML;
    alert("Loaded text from file: " + navbarfilecontents);
}

function load() {
    // To be run in <body onload>.
    make_nav();
}
