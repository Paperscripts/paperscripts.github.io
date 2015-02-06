var program = new Program(function() {
    // Create the stage. We need to give it "demo" because that's the ID of our <canvas>.
    var stage = new Stage("demo");

    // We want the background to change once per frame.
    // First, though, we need to set a variable for the colors.
    var red = 0;
    var green = 255;
    var blue = 125;

    // Next we need to set how much the colors will change each frame.
    var redChange = 1;
    var greenChange = -0.5;
    var blueChange = 1;

    // Now we need to make the run loop.
    // This happens every frame.
    // Since we don't have any sprites it doesn't matter whether we use beforeSpritesLoop or afterSpritesLoop.
    stage.makeBeforeSpritesLoop(function() {
        // See how we put a function inside of stage's makeBeforeSpritesLoop?
        // That means we want to do run this function once a turn.
        // Here we're changing the color values by their respective change.
        red = red + redChange;
        green = green + greenChange;
        blue = blue + blueChange;

        // Next, we need to figure out how to set the background.
        // We'll use our stage's .setBackground function.
        // But we have a problem - setBackground requires a hexadecimal string.
        // If you don't know what that means, you don't need to worry about it.
        // At some point you'll probably learn about it in math,
        // but simply think of hexadecimal as a different way to write numbers.

        // Fortunately, the stage actually has a special category of functions:
        // Math! What we want is math.toHexadecimal:
        var redInHex = this.math.toHexadecimal(this.math.round(red));
        var greenInHex = this.math.toHexadecimal(this.math.round(green));
        var blueInHex = this.math.toHexadecimal(this.math.round(blue));

        // We also have to round it using math.round because if it gives us a
        // decimal setBackground will not work.

        // Whoa, see how we used this there rather than stage?
        // Since we're making a function inside of stage we don't need to worry
        // about specifying what stage we want to have use the math function.
        // Paperscripts automatically knows that we want to use stage, since we are
        // making stage's before-sprites-loop function.

        // Now we need to make the actual hexadecimal string.
        // Think of it as #REDGREENBLUE.
        var colorInHex = "#" + redInHex + greenInHex + blueInHex;

        // Now we have to use the setBackground function:
        this.setBackground(colorInHex);

        // Finally - the maximum value for one of our numbers is 255 and the minimum is 0.
        // If it goes past those bounds let's make the color increase in the other direction!
        // We'll be using a special tool called IF. If is just a special way to make the computer
        // decide something. For example...
        if (red > 255) {
            // ... it will do whatever's inside of these curly brackets.
            redChange = redChange * -1;
        }

        // For the other:
        if (red < 0) {
            redChange = redChange * -1;
        }

        // But it's actually possible to use a special thing called ||. || means OR.
        // So, we could say that if green is greater than 255 or green is less than 0
        // in english, or we could say (green > 255 || green < 0) in Paperscripts:
        if (green > 255 || green < 0) {
            greenChange *= -1;
        }

        // Finally, we do blue. It's the same as green, but replacing green with blue.
        if (blue > 255 || blue < 0) {
            blueChange *= -1;
        }
    });

    // Finally we need to start the stage - or, if you prefer, open the curtains.
    // Just use the stage's .go function to do that.
    stage.go();
});