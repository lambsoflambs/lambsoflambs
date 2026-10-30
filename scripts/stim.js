var stim;
var ups = 0;

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    var mouseX = 0;
    var mouseY = 0;
    var items = new Array(12);
    var resetmode = 0;

    class Hexrod {
        constructor(game, xcon, ycon) {
            this.up = false;
            this.game = game;
            this.width = 28;
            this.height = 70;
            this.y = ycon*24;
            if (ycon % 2 == 0) {
                this.x = 67 + xcon*28;
            } else {
                this.x = 53 + xcon*28;
            }
            this.image = document.getElementById('toy');
        }

        moveUp() {
            this.up = true;
            ups++;
            this.image = document.getElementById('toy4');
            this.game.drawUpdate();
            var pop = new Audio('Pop.mp3');
            volume_set(pop);
            pop.play();
            this.image = document.getElementById('toy2');
            setTimeout(() => {this.game.drawUpdate(); 
                this.image = document.getElementById('toy3');
            }, 83);
            setTimeout(() => {this.game.drawUpdate();}, 166);

        }

        drawHex() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    class Board {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }

        drawNew() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            var board = document.getElementById("board");
            ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

            if (mouseX>=138 && mouseX<=262 && mouseY>=350 && mouseY<=382){
                resetmode = 1;
                var reset = document.getElementById("reset2");
                ctx.drawImage(reset, 138, 350, 124, 34);
            } else {
                resetmode = 0;
                var reset = document.getElementById("reset1");
                ctx.drawImage(reset, 138, 350, 124, 34);
            }

            for (var j=0;j<12;j++){
                items[j] = new Array(10);
                for (var i=0;i<10;i++){
                    var hex = new Hexrod(this, i, j);
                    items[j][i] = hex;
                    hex.drawHex();
                }
            }
        }

        drawUpdate() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            var board = document.getElementById("board");
            ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

            if (resetmode == 0) {
                var reset = document.getElementById("reset1");
                ctx.drawImage(reset, 138, 350, 124, 34);
            } else if (resetmode == 1) {
                var reset = document.getElementById("reset2");
                ctx.drawImage(reset, 138, 350, 124, 34);
            } else if (resetmode == 2) {
                var reset = document.getElementById("reset3");
                ctx.drawImage(reset, 138, 350, 124, 34);
            }

            for (var i=0;i<items.length;i++) {
                for (var j=0;j<items[i].length;j++) {
                    items[i][j].drawHex();
                }
            }
        }

        reset() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            var board = document.getElementById("board");
            ctx.drawImage(board, 0, 0, canvas.width, canvas.height);

            if (mouseX>=138 && mouseX<=262 && mouseY>=350 && mouseY<=382){
                resetmode = 1;
                var reset = document.getElementById("reset2");
                ctx.drawImage(reset, 138, 350, 124, 34);
            } else {
                resetmode = 0;
                var reset = document.getElementById("reset1");
                ctx.drawImage(reset, 138, 350, 124, 34);
            }

            for (var i=0;i<12;i++){
                for (var j=0;j<10;j++){
                    if (items[i][j].up) {
                        items[i][j].image = document.getElementById("toy2");
                        this.drawUpdate();
                    }
                }
            }
            setTimeout( () => {
                for (var i=0;i<12;i++){
                    for (var j=0;j<10;j++){
                        if (items[i][j].up) {
                            items[i][j].image = document.getElementById("toy4");
                            this.drawUpdate();
                        }
                    }
                }
            }, 83);
            setTimeout( () => {
                for (var i=0;i<12;i++){
                    for (var j=0;j<10;j++){
                        if (items[i][j].up) {
                            items[i][j].image = document.getElementById("toy5");
                            this.drawUpdate();
                        }
                    }
                }
            }, 166);
            setTimeout( () => {
                this.drawNew();
            }, 249);
        }
    }

    stim = new Board(canvas.width, canvas.height);
    stim.drawNew();
    

    // Detects when mouse moves to check if it is over certain objects in the game
    canvas.addEventListener("mousemove", function(event) {
        mouseX = parseInt(event.clientX - canvas.getBoundingClientRect().left);
        mouseY = parseInt(event.clientY - canvas.getBoundingClientRect().top);

        // Detect if mouse is over a peg, and move the peg up if it is
        for (var i=0;i<items.length;i++) {
            for (var j=0;j<items[i].length;j++) {
                var item = items[i][j]
                if (mouseX>=item.x+3 && mouseX<=item.x+item.width-3 && mouseY>=item.y+45 && mouseY<=item.y+item.height-3) {
                    if (!items[i][j].up)
                        items[i][j].moveUp();
                }
            }
        }

        // Detect if mouse is over reset button 
        if (mouseX>=138 && mouseX<=262 && mouseY>=350 && mouseY<=382 && resetmode==0) {
            resetmode = 1;
            stim.drawUpdate();              
        } else if (!(mouseX>=138 && mouseX<=262 && mouseY>=350 && mouseY<=382) && resetmode==1) {
            resetmode = 0;
            stim.drawUpdate();
        }
    });

    canvas.addEventListener("mousedown", function(event) {
        if (resetmode == 1) {
            resetmode = 2;
            stim.drawUpdate();
        }
    });

    canvas.addEventListener("mouseup", function(event) {
        if (resetmode == 2) {
            if (ups > 0) {
                stim.reset();
                var strike = new Audio('Teleport2.mp3');
                volume_set(strike);
                strike.play();
                ups = 0;
            } else {
                var strike = new Audio('Teleport2.mp3');
                strike.play();
                volume_set(strike);
                resetmode=9000;
                horse();
                setTimeout( () => {stim.drawNew()}, 1000);
            }
        }
    });

});