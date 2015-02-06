console.log("Loaded page handler.");

var PageHandler = function() {
    // A PageHandler is a special Scriptable that allows you to modify the web page.
    console.log("Yay.");
}

PageHandler.prototype = new Scriptable();

PageHandler.prototype.getElementTargeter = function(target) {
    // Get an element targeter.
    // The targeter should be an object with this syntax:
    // {id: "" | class: "" | tag: ""}

    if (target.id) {
        return "#" + target.id;
    } else if (target.class) {
        return "." + target.class;
    } else if (target.tag) {
        return target.tag;
    } else {
        return "";
    }
}

PageHandler.prototype.getElementsFromTargeter = function(target) {
    // Get elements from the targeter.
    if (target[0] === "#") {
        return document.getElementById(target.split('#')[0]);
    } else if (target[0] === ".") {
        return document.getElementsByClassName(target.split('.')[0]);
    } else {
        return document.getElementsByTagName(target);
    }
}

PageHandler.prototype.editElement = function(targeter) {
    // ...
}