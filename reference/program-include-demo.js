var program = new Program(function() {
    // Include the library "page-handle" taken from the folder "../paperscript-libs".
    console.log("Startup.");
    this.include("page-handle", "../paperscript-libs")

    // When we include a file, we need to wait for it to load before doing anything.
    // Best bet is to just wait two seconds.
    setTimeout(function() {
        var pageHanlder = new PageHandler();
        console.log(pageHanlder);
        var targeter = pageHanlder.getElementTargeter({id: "demo"});
        console.log(targeter);
        console.log("Success.");
    }, 0);
});