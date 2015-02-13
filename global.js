/** Global script for paperscripts.github.io **/

function make_nav() {
    var navbar = document.getElementById("nav");
    var navbarfilegetter = new XMLHttpRequest();
    var navbarfilecontents = "";
    navbarfilegetter.open("GET", "navbar.xml", false);
    navbarfilecontents = navbarfilegetter.responseXML;
}

function load() {
    // To be run in <body onload>.
    make_nav();
}
