var program = new Program(function() {
    // Include the library "page-handle" taken from the folder "../paperscript-libs".
    this.include("page-handle", "../paperscript-libs");

    // Create a new page handler.
    console.log("Wha");
    var pageHanlder = new PageHandler();
    console.log(pageHanlder);
    var targeter = pageHanlder.getElementTargeter({id: "demo"});
    console.log(targeter);
});