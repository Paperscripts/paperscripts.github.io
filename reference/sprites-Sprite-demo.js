var program = new Program(function() {
    // Create a simple sprite.
    var sprite1 = new Sprite();

    // Set it to go 125 pixels RIGHT and 80 pixels DOWN from the top left corner when the program starts.
    sprite1.onStart(function() {
        this.goTo(125, 80);
    });

    // Make the sprite do something once a frame.
    sprite1.makeRunLoop(function() {
        this.goTo(this._xpos + 5, this._ypos);
        if (this._xpos > 360) {
            this.goTo(-60, this._ypos);
        }
        if (this.events.contextMenu() === "true") {
            window.alert("!");
        }
    });

    // Now create a stage. The stage is where we display sprites and draw to.
    // Note that we need to pass it the ID of our <canvas> element.
    var stage = new Stage("demo");

    // Next, we need to add sprite1 to the Stage we just created.
    stage.addSprite(sprite1);

    // We can't forget to draw the sprite after moving it!
    // This also happens in the run loop:
    stage.makeAfterSpritesLoop(function() {
        this.setBackground("#555555");
        this.drawSprites();
    });

    // Finally we call the program! Just use the .go function on our stage.
    stage.go();
});
