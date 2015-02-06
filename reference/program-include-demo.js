var program = new Program(function() {
    // Include the library "page-handle" taken from the folder "../paperscript-libs".
    console.log("Startup.");
    this.include("page-handle", "../paperscript-libs")

    setTimeout(function() {
        // Create a new page handler.
        var pageHanlder = new PageHandler();
        console.log(pageHanlder);
        var targeter = pageHanlder.getElementTargeter({id: "demo"});
        console.log(targeter);
        console.log("Success.");
    }, 2000);
});