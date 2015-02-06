console.info("Loading paperscripts.js");

try {

    PAPERSCRIPTSTAGES = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function Program(run, libraries, libFolder) {
        // A Program is an object with a runnable function that is called when you type program.run().
        // It also has a built-in debugger for bug fixing.
        // Pass it libraries to load some libraries.
        // Pass it libFolder to specify where to load the libraries from.
        this._run = run;

        // Library loading.
        var lf = ".";
        if (libFolder) {
            lf = libFolder;
        }
        if (libraries) {
            for (var lib = 0; lib < libraries.length; lib++) {
                this._include(libraries[lib], libFolder);
            }
        }
        console.log(libraries);

        return this;
    }

    Program.prototype.run = function(args) {
        // This should be called after you've finished scripting the program.
        // It's got a built in debugger.
        // It also accepts arguments.

        console.info("Running program");
        try {
            this._run(args);
            console.info("Program finished");
        } catch(err) {
            console.error("Program has crashed!\nCrash report:");
            console.error(err);

            errOutput = err.toString();
            if (/is not a function/.test(errOutput)) {
                console.error(errOutput.split(' ')[1].split('.')[0] + " doesn't know how to '" + errOutput.split(' ')[1].split('.')[1] + "'!");
            } else if (/is not defined/.test(errOutput)) {
                console.error("Paperscripts doesn't know what '" + errOutput.split(' ')[1] + "' is!");
            }
        }
    }

    Program.prototype._include = function(lib, libsFolder) {
        // Includes a Paperscript library file.
        // Gets it from the paperscript-libs/ folder.
        // Specify libsFolder to override paperscript-libs.

        var js = document.createElement("script");
        var head = document.getElementsByTagName("head")[0];
        js.setAttribute("type", "text/javascript");
        if (libsFolder) {
            js.setAttribute("src", libsFolder + "/" + lib + ".js");
        } else {
            js.setAttribute("src", "paperscript-libs/" + lib + ".js");
        }
        head.appendChild(js);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function Scriptable() {
        // Base scriptable. You shouldn't use it - stick to using Stage()s or Sprite()s.
        // Has an onStart method that is run via a Stage.

        this._onstart = function() {};
        this._cid = "";
    }

    Scriptable.prototype._getmousepos = function(evt) {
        // A hidden method for getting the mouse position.
        // Used in the event listener in go(), refer to the actual getMouse-X/Y-() for using in your programs.

        var canvas = document.getElementById(this._cid);
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    Scriptable.prototype.getMouseX = function() {
        // Return the mouse X position

        return document.getElementById(this._cid).getAttribute("data-mouse-pos-x");
    }

    Scriptable.prototype.getMouseY = function() {
        // Return the mouse Y position

        return document.getElementById(this._cid).getAttribute("data-mouse-pos-y");
    }

    Scriptable.prototype.mouseDown = function() {
        // Return whether or not the mouse is pressed.

        return document.getElementById(this._cid).getAttribute("data-mouse-pressed") === "true";
    }

    Scriptable.prototype.mouseUp = function() {
        // Return whether or not the mouse is NOT pressed.

        return document.getElementById(this._cid).getAttribute("data-mouse-pressed") === "false";
    }

    // Look at this - we're making a "category" of things to do.
    // Eg, scriptable.math.toHexadecimal() could be a function.
    Scriptable.prototype.math = {
        floor: function(n) {
            // Round a number down.
            return Math.floor(n);
        },
        ceiling: function(n) {
            // Round a number up.
            return Math.ceil(n);
        },
        round: function(n) {
            // Round a number.
            // If the decimal of n >= 0.5 round up.
            // If the decimal of n < 0.5 round down.
            return Math.round(n);
        },
        toBase: function(n, b) {
            // Convert a number to any base.
            return n.toString(b);
        },
        toBinary: function(n) {
            // Convert a number to binary.
            return n.toString(2);
        },
        toDecimal: function(n) {
            // Convert a number to decimal.
            return parseInt(n.toString(10));
        },
        toHexadecimal: function(n) {
            // Convert a number to hexadecimal.
            return n.toString(16);
        }
    };

    // Here's another category, this one is for strings.
    Scriptable.prototype.strings = {
        join: function(a, b, separator) {
            // Join to gether a and b.
            // If a is an array then we need to join everything a with b.
            var a2 = "";
            var b2 = "";
            if (separator === undefined) {
                // Set the separator to "", the default.
                separator = "";
            }
            if (typeof(a) === String) {
                // Set a2 to a.
                a2 = a;
            } else if (typeof(a) === Array) {
                // Set a2 to each item in a joined together with separator separating each one.
                for (var i = 0; i < a.length; a++) {
                    a2 += a[i];
                    if (i < a.length - 1) {
                        a2 += separator;
                    }
                }
            } else {
                // Set a2 to a's string value.
                a2 = a.toString();
            }
            if (typeof(b) === String) {
                // Set b2 to b.
                b2 = b;
            } else if (typeof(b) === Array) {
                // Set b2 to each item in b joined together with separator separating each one.
                for (var i = 0; i < b.length; b++) {
                    b2 += b[i];
                    if (i < b.length - 1) {
                        b2 += separator;
                    }
                }
            } else {
                b2 = b.toString();
            }
            return a2 + separator.toString(); + b2;
        }
    };

    // Now one for events:
    Scriptable.prototype.events = {
        contextMenu: function() {
            // Returns if we're using the context menu.
            return document.getElementById(this._cid).getAttribute("data-window-context-menu") === true;
        },
        notContextMenu: function() {
            // Returns if we aren't using the context menu.
            return document.getElementById(this._cid).getAttribute("data-window-context-menu") === false;
        }
    }

    Scriptable.prototype.setBackground = function(hex) {
        // Set the background color of the screen.
        // Hex must be a hexadecimal string, eg "#FF0000" or "00889C"

        // Add # to string
        if (hex.length === 6 | hex.length === 3) {
            hex = "#" + hex;
        }

        var c = document.getElementById(this._cid);
        var ctx = c.getContext("2d");
        ctx.fillStyle = hex;
        ctx.fillRect(0, 0, c.width, c.height);
    }

    Scriptable.prototype._start = function() {
        // Add event listeners.
        // This is required for getting interaction.
        // We use the "data-" because it's easy to detect.

        var canvas = document.getElementById(this._cid);
        var context = canvas.getContext('2d');

        canvas.setAttribute("data-window-context-menu", false);
        canvas.addEventListener('mousemove', function(evt) {
            this.setAttribute("data-mouse-pos-x", PAPERSCRIPTSTAGES[0]._getmousepos(evt).x.toString());
            this.setAttribute("data-mouse-pos-y", PAPERSCRIPTSTAGES[0]._getmousepos(evt).y.toString());
        }, false);
        canvas.addEventListener('mousedown', function(evt) {
            this.setAttribute("data-mouse-pressed", true);
        }, false);
        canvas.addEventListener('mouseup', function(evt) {
            this.setAttribute("data-mouse-pressed", false);
        }, false);
        canvas.addEventListener('contextmenu', function(evt) {
            this.setAttribute("data-window-context-menu", true);
            setTimeout(function() {
                document.getElementById(PAPERSCRIPTSTAGES[0]._cid).setAttribute("data-window-context-menu", false);
            }, 100);
            evt.preventDefault();
        }, false);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function Sprite(cnfg) {
        // A Sprite, to be created via new Sprite().
        // Sprites have a special set of scripts that only Sprites can use, such as moving around.
        if (cnfg) {
            if (cnfg.x) {this._xpos = cnfg.x;} else {this._xpos = 0;}
            if (cnfg.y) {this._ypos = cnfg.y;} else {this._ypos = 0;}
            if (cnfg.img) {this._img = cnfg.img;} else {this._img = "pen"}
        } else {
            this._xpos = 0;
            this._ypos = 0;
            this._img = "pen";
        }
        this._runloop = function() {};
    }

    Sprite.prototype = new Scriptable();

    Sprite.prototype.onStart = function(f) {
        // Set the on-start function that is called by a Stage.

        this._onstart = f;
    }

    Sprite.prototype.draw = function() {
        // Draw an image on the screen based on the sprite's _cid, which is passed from the Stage's addSprite method.
        // Draws based on an image.

        if (!this._hidden) {
            var ctx = document.getElementById(this._cid).getContext("2d");
            var img = document.getElementById("paperscript-img-" + this._img);
            ctx.drawImage(img, this._xpos, this._ypos);
        }
    }

    Sprite.prototype.drawCircle = function(radius, color, strokeColor, strokeWeight) {
        // Draws a circle.

        var ctx = document.getElementById(this._cid).getContext("2d");
        ctx.beginPath();
        ctx.arc(this._xpos, this._ypos, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        if (strokeColor && strokeWeight) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
        }
    }

    Sprite.prototype.goTo = function(x, y) {
        // Go to a certain position on the screen.
        // That position is (x, y).

        this._xpos = x;
        this._ypos = y;
    }

    Sprite.prototype.hide = function() {
        // Hide the sprite.

        this._hidden = true;
    }

    Sprite.prototype.show = function() {
        // Show the sprite if it's hidden.

        this._hidden = false;
    }

    Sprite.prototype.makeRunLoop = function(f) {
        // Create the run loop for the sprite.
        // This is called every frame in the program.

        this._runloop = f;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function Stage(canvasid) {
        // The Stage, which should be used as a handler for the program.
        // A Stage has a set of Sprite()s stored in it's _sprites variable.
        // A Stage also has an ID of a <canvas> to draw to.
        // Create the Sprites first then add them to the Stage by using the addSprite() method.

        this._sprites = [];
        this._cid = canvasid;
        this._setup = function() {};
        this._after = function() {};
        this._beforespritesloop = function() {};
        this._afterspritesloop = function() {};
    }

    Stage.prototype = new Scriptable();

    Stage.prototype.addSprite = function(s) {
        // Add a new sprite.
        // This method should have a Sprite as an input, though technically any object will work.

        if (s) {
            if (typeof(s) === "object") {
                s._cid = this._cid;
                this._sprites.push(s);
            } else {
                console.warn("Could not add sprite " + s.toString());
            }
        } else {
            console.warn("addSprite() without input");
        }
    }

    Stage.prototype.drawSprites = function() {
        // Draw all the Sprites in the Stage.
        for (var s = 0; s < this._sprites.length; s++) {
            this._sprites[s].draw();
        }
    }

    Stage.prototype.go = function() {
        // Load the default image.
        // Run the Stage's _setup function.
        // For each Sprite in the Stage, run it's onStart() method.
        // Run the Stage's _after function.
        // In the main run loop..
        //   .. run the Stage's _beforespritesloop function.
        //   .. run each Sprite in the Stage's _runloop function.
        //   .. run the Stage's _afterspritesloop function.
        //   .. repeat.

        // This is the default sprite image.
        // It's just a pen.
        // Source: https://lh6.googleusercontent.com/-wvzRAuBOywY/Ty6gWwGUytI/AAAAAAAAF3k/J0dysivFJl0/h120/kapil_pen.png
        this.loadImage("data:image/png;base64,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",
            "pen");

        this._setup();
        for (var s = 0; s < this._sprites.length; s++) {
            this._sprites[s]._start();
            this._sprites[s]._onstart();
        }
        this._after();

        PAPERSCRIPTSTAGES.push(this);
        setInterval(function() {
            for (var st = 0; st < PAPERSCRIPTSTAGES.length; st++) {
                PAPERSCRIPTSTAGES[st]._beforespritesloop();
                for (var s = 0; s < PAPERSCRIPTSTAGES[st]._sprites.length; s++) {
                    PAPERSCRIPTSTAGES[st]._sprites[s]._runloop();
                }
                PAPERSCRIPTSTAGES[st]._afterspritesloop();
            }
        }, 1000/60);
            
    }

    Stage.prototype.loadImage = function(src, name) {
        // Load an image for usage in sprites.

        document.getElementsByTagName("body")[0].innerHTML +=
            "<img src='" + src +
            "' id='paperscript-img-" + name +
            "' style='display: none;' />"
    }

    Stage.prototype.makeAfter = function(f) {
        // Sets the Stage's after function.
        // This is run after calling each Sprite's onstart function but before the draw loop.
        this._after = f;
    }

    Stage.prototype.makeBeforeSpritesLoop = function(f) {
        // Sets the Stage's before-sprites-loop function.
        // This is run once per run loop frame before doing the Sprite's run loop function.

        this._beforespritesloop = f;
    }

    Stage.prototype.makeAfterSpritesLoop = function(f) {
        // Sets the Stage's after-sprites-loop function.
        // This is run once per run loop frame after doing the Sprite's run loop function.
        // Put things like this.drawSprites() in here.

        this._afterspritesloop = f;
    }

    Stage.prototype.makeSetup = function(f) {
        // Sets the Stage's setup function.
        // This is run before calling each Sprite's onstart function.
        this._setup = f;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    console.info("Loaded paperscripts.js");

} catch(err) {
    console.error("Error loading paperscripts.js:");
    console.error(err);
}
