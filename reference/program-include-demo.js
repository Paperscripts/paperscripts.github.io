var program = new Program(function() {
    // Include the library "page-handle" taken from the folder "../paperscript-libs".
    this.include("page-handle", "../paperscript-libs")

    // When we include a file, we need to wait for it to load before doing anything.
    // Best bet is to just wait 1.5 seconds.
    setTimeout(function() {
        var pageHanlder = new PageHandler();
        var targeter = pageHanlder.getElementTargeter({id: "demo"});
        pageHandler.editElement(targeter, 'write', "This is an example text edited by a <code>new PageHandler()</code>!");
    }, 1500);
});