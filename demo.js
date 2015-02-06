var program = new Program(function() {
    // Create a simple sprite that goes to (180, 300) when the program starts.
    var sprite1 = new Sprite();
    sprite1.onStart(function() {
        this.goTo(180, 300);
    });

    // Create another sprite, this one goes to (50, 50) when the program starts.
    var sprite2 = new Sprite();
    sprite2.onStart(function() {
        this.goTo(50, 50);
    });

    // Create the stage.
    var stage = new Stage("canvas");
    stage.addSprite(sprite1);
    stage.addSprite(sprite2);

    // Create the stage's setup function and function to do after starting the sprites
    stage.makeSetup(function() {
        this.setBackground("#DD1111");
    });
    stage.makeAfter(function() {
        this.drawSprites();
    });

    // Finally activate the stage.
    stage.go();
});

var interactive = new Program(function () {
    var sprite1 = new Sprite();

    sprite1.makeRunLoop(function() {
        this.goTo(this.getMouseX() - 60, this.getMouseY() - 60);

        if (this.mouseDown()) {
            stage.addSprite(new Sprite());
            stage._sprites[stage._sprites.length - 1].hide();
            stage._sprites[stage._sprites.length - 1].goTo(this.getMouseX(), this.getMouseY());
            stage._sprites[stage._sprites.length - 1].makeRunLoop(function() {
                this.drawCircle(10, "#000000");
            });
        }
    });

    var stage = new Stage("canvasInteractive");
    stage.addSprite(sprite1);

    stage.makeBeforeSpritesLoop(function() {
        this.setBackground("#FFFFFF");
    });
    
    stage.makeAfterSpritesLoop(function() {
        this.drawSprites();
    });

    stage.go();
});
