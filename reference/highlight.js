function highlight(c) {
    // A very simple code highlighting tool built in JavaScript for the PaperScripts reference.

    /*for (var j = 0; j < document.getElementsByTagName(c).length; j++) {
        var v = document.getElementsByTagName(c)[j].innerHTML.split(' ');
        var nv = "";
        for (var i = 0; i < v.length; i++) {
            nv += "<span class='highlight-";
            console.log(v);
            if (["", "if", "else", "var", "new"].indexOf(v[i])>0) {
                nv += "keyword";
            } else if (["", "Sprite", "Stage", "Scriptable"].indexOf(v[i].split('(')[0])>0) {
                nv += "class";
            } else if (["", "hide", "goTo", "show"].indexOf(v[i].split('.')[v[i].split('.').length - 1].split('('[0]))>0) {
                nv += "class-function";
            } else if (v[i - 1] === "var") {
                nv += "var-title";
            } else {
                nv += "source";
            }
            nv += "'>";
            nv += v[i];
            nv += "</span>";
            if (i !== v.length - 1) {
                nv += " ";
            }
        }
        document.getElementsByTagName(c)[j].innerHTML = nv;
    }*/
}