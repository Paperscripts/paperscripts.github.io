console.log("Loading page handler.");

try {

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

    PageHandler.prototype.getElementsFromTargeter = function(target, asArray) {
        // Get elements from the targeter.
        if (target[0] === "#") {
            return document.getElementById(target.split('#')[0]);
        } else if (target[0] === ".") {
            return document.getElementsByClassName(target.split('.')[0]);
        } else {
            return document.getElementsByTagName(target);
        }
    }

    PageHandler.prototype.editElement = function(targeter, mode, text, text2) {
        // Edit an element.
        // Modes:
        //   'a' => append
        //   'attr' => set attribute (text = attribute, text2 = value)
        //   'c' => clear (no text argument)
        //   'r' => read (no text argument)
        //   'w' => write
        var get = this.getElementsFromTargeter(targeter, true);

        var valueElements = ['', 'TEXTAREA', 'INPUT'];

        if (mode === 'a' | mode === 'append') {
            for (var elem = 0; elem < get.length; elem++) {
                if (valueElements.indexOf(e.tagName) > 1) {
                    get[elem].value += text;
                } else {
                    get[elem].innerHTML += text;
                }
            }
        } else if (mode === 'attr' | mode === 'set attribute') {
            for (var elem = 0; elem < get.length; elem++) {
                get[elem].setAttribute(text, text2);
            }
        } else if (mode === 'c' | mode === 'clear') {
            for (var elem = 0; elem < get.length; elem++) {
                if (valueElements.indexOf(e.tagName) > 1) {
                    get[elem].value = '';
                } else {
                    get[elem].innerHTML = '';
                }
            }
        } else if (mode === 'r' | mode === 'read') {
            var out = [];
            for (var elem = 0; elem < get.length; elem++) {
                if (valueElements.indexOf(e.tagName) > 1) {
                    out.push(get[elem].value);
                } else {
                    out.push(get[elem].innerHTML);
                }
            }
            if (out.length === 1) {
                return out[0];
            } else if (out.length === 0) {
                return false;
            } else {
                return out;
            }
        } else if (mode === 'w' | mode === 'write') {
            for (var elem = 0; elem < get.length; elem++) {
                if (valueElements.indexOf(e.tagName) > 1) {
                    get[elem].value = text;
                } else {
                    get[elem].innerHTML = text;
                }
            }
        }
    }

    console.log("Loaded page handler.");

} catch(err) {
    console.log("Error loading page handler");
    console.log(err);
}