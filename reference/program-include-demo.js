var program = new Program(function() {
    // Include the library "page-handle" taken from the folder "../paperscript-libs".
    this.include("page-handle", "../paperscript-libs")

    // When we include a file, we need to wait for it to load before doing anything.
    // Best bet is to just wait 1.5 seconds.
    setTimeout(function() {
        var ph = new PageHandler();
        console.log("1");
        var targeter = ph.getElementTargeter({id: "demo"});
        console.log("2");
        ph.editElement(targeter, 'write', "This is an example text edited by a <code>new PageHandler()</code>!");
        console.log("3");
    }, 1500);
});