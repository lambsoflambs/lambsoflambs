window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    var mouseX = 0;
    var mouseY = 0;
    var oldY = 0;
    var carrotsOnScreen = 0;
    var points = 0;
    var carrotList = null;
    var poofList = null;
    ctx.font = "40px DSfont";
    ctx.fillStyle = "white";
    
    // we want a linked list of carrots. when a new carrot is added, its spot in the list is determined by its y value.
    // the higher the y value, the later it appears in the list. 
    //var carrotArray = new Array(20);
    
    class Node {
        constructor(carrot) {
            this.carrot = carrot;
            this.next = null;
        }
    }

    class LinkedList {
        constructor(game) {
            this.head = null;
            this.game = game;
        }

        append(carrot) {
            let newnode = new Node(carrot);
            if (!this.head) {
                this.head = newnode;
                return;
            }
            let current = this.head;
            if (newnode.carrot.y < current.carrot.y) {
                newnode.next = current;
                this.head = newnode;
                return;
            }
            while (current.next) {
                if (newnode.carrot.y < current.next.carrot.y) {
                    newnode.next = current.next;
                    current.next = newnode;
                    return;
                }
                current = current.next;
            }
            current.next = newnode;
        }

        remove(carrot, version) {
            let current = this.head;
            if (this.head.carrot == carrot) {
                this.head.carrot = null;
                this.head = current.next;
                if (version != 0) {
                    poofList.append(new Poof(this.game, carrot.x, carrot.y, version));
                    carrotsOnScreen--;
                    this.addPoints(version);
                }
                this.game.drawUpdate();
                return;
            }
            while (current.next) {
                if (current.next.carrot == carrot) {
                    current.next.carrot = null;
                    if (current.next.next) {current.next = current.next.next;}
                    else {current.next = null;}
                    if (version != 0) {
                        poofList.append(new Poof(this.game, carrot.x, carrot.y, version));
                        carrotsOnScreen--;
                        this.addPoints(version);
                    }
                    this.game.drawUpdate();
                    return;
                }
                current = current.next;
            }
            
        }
        addPoints(version) {
            var woosh = new Audio('pages/games/Whoosh.mp3');
            volume_set(woosh);
            var coin = new Audio('pages/games/Coin.mp3');
            volume_set(coin);
            if (version == 1 || version == 2) {
                woosh.play();
                points -= 1;
            }
            if (version == 3) {
                points += 10;
                this.remove(this.head.carrot,3)
            } else if (version == 4) {
                points += 5;
                woosh.play();
                coin.play();
            } else if (version == 5) {
                points += 1;
                woosh.play();
                coin.play();
            }  
        }
    }
    class PoofList {
        constructor(game) {
            this.game = game;
            this.head = null;
        }
        append(poof) {
            let newnode = new Node(poof);
            if (!this.head) {
                this.head = newnode;
                return;
            }
            let current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = newnode;
        }
        remove(poof) {
            let current = this.head;
            if (this.head.carrot == poof) {
                this.head.carrot = null;
                this.head = current.next;                
                this.game.drawUpdate();
                return;
            }
            while (current.next) {
                if (current.next.carrot == poof) {
                    current.next.carrot = null;
                    if (current.next.next) {current.next = current.next.next;}
                    else {current.next = null;}
                    this.game.drawUpdate();
                    return;
                }
                current = current.next;
            }
            
        }
    }
    class Poof {
        constructor(game, x, y, version) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.version = version;
            this.image = document.getElementById("poof1");
            this.game.drawUpdate();
            setTimeout(() => {
                this.image = document.getElementById('poof2');
                this.game.drawUpdate(); 
            }, 80);
            setTimeout(() => {
                this.image = document.getElementById('poof3');
                this.game.drawUpdate(); 
            }, 160);
            setTimeout(() => {
                this.image = document.getElementById('poof4');
                this.game.drawUpdate(); 
            }, 240);
            setTimeout(() => {
                this.image = document.getElementById('poof5');;
                this.game.drawUpdate(); 
            }, 320);
            setTimeout(() => {poofList.remove(this,0);}, 640);
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, 100, 200);
            if (this.version == 1 || this.version == 2) {
                ctx.fillText("-1",this.x+30,this.y+100);
            } else if (this.version == 3) {
                ctx.fillText("+10",this.x+30,this.y+100);
            } else if (this.version == 4) {
                ctx.fillText("+5",this.x+30,this.y+100);
            } else if (this.version == 5) {
                ctx.fillText("+1",this.x+30,this.y+100);
            } 
            
        }
    }
    class Carrot {
        constructor(game) {
            this.game = game;
            this.x = Math.floor(20+Math.random() * 460);
            this.y = Math.floor(100+Math.random() * 310);
            this.fondled = false;
            this.gripped = false;
            // check conflicts with other carrots. if there is a conflict, do not grow and delete this object. 
            this.image = document.getElementById("carrot_stem1");
            carrotsOnScreen++;            
        }
        bloom() {
            this.image = document.getElementById('carrot_stem1');
            this.game.drawUpdate();
            this.image = document.getElementById('carrot_stem2');
            setTimeout(() => {this.game.drawUpdate(); 
                this.image = document.getElementById('carrot_stem3');
            }, 80);
            setTimeout(() => {this.game.drawUpdate(); 
                this.image = document.getElementById('carrot_stem4');
            }, 160);
            setTimeout(() => {this.game.drawUpdate(); 
                this.image = document.getElementById('carrot_stem5');
            }, 240);
            setTimeout(() => {this.game.drawUpdate();}, 320);

        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, 100, 200);
        }
        touched() {
            this.fondled = true;
            this.image = document.getElementById('carrot_stem6');
            this.game.drawUpdate();
        }
        untouched() {
            this.fondled = false;
            this.image = document.getElementById('carrot_stem5');
            this.game.drawUpdate();
        }
        grabbed() {
            this.gripped = true;
            this.image = document.getElementById('carrot_stem4');
            this.game.drawUpdate();
        }
        ungrabbed() {
            this.gripped = false;
            this.image = document.getElementById('carrot_stem5');
            this.game.drawUpdate();
        }
        pulled() {
            
            this.yoinked = true;
            this.gripped = false;

            var randomNum = Math.random() * 100;
            let version = 0;
            var pull = new Audio('pages/games/Squish Pop.mp3');
            volume_set(pull);
            if (randomNum < 1) {
                version = 1;
                pull.play();
                var scream = new Audio('pages/games/Scream2.mp3');
                volume_set(scream);
                scream.play();
                this.image = document.getElementById('pages/games/carrot_horrified');
            } else if (randomNum >= 1 && randomNum < 2) {
                version = 2;
                pull.play();
                var croak = new Audio('pages/games/Croak.mp3');
                volume_set(croak);
                croak.play();
                this.image = document.getElementById('pages/games/carrot_disgusting');
            } else if (randomNum >= 2 && randomNum < 5) {
                version = 3;
                pull.play();
                var triumph = new Audio('pages/games/Triumph.mp3');
                volume_set(triumph);
                triumph.play();
                this.image = document.getElementById('carrot_happy');
            } else if (randomNum >= 5 && randomNum < 15) {
                version = 4;
                var pull2 = new Audio('pages/games/Squish Pop2.mp3');
                volume_set(pull2);
                pull2.play();
                this.image = document.getElementById('carrot_giga');
            } else {
                version = 5;
                pull.play();
                this.image = document.getElementById('carrot_normal');
            }
            
            this.game.drawUpdate();
            for (var i = 0; i < 10; i++) {
                setTimeout(() => {
                    this.y -= 10; 
                    this.game.drawUpdate();
                }, i*40);
            }
            setTimeout(() => {carrotList.remove(this, version);}, 1000);
        }
    }
    class GameWindow {
        constructor(width, height) {
            this.width = width;
            this.height = height;

        }
        drawNew() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            var bg = document.getElementById("carrot_game_bg");
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            ctx.fillText("Carrots: 0",35,70);
        }   
        drawUpdate() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            var bg = document.getElementById("carrot_game_bg");
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            var carNode = carrotList.head;
            while (carNode) {
                carNode.carrot.draw();
                carNode = carNode.next;
            }
            var poofNode = poofList.head;
            while (poofNode) {
                poofNode.carrot.draw();
                poofNode = poofNode.next;
            }
            ctx.fillText("Carrots: " + points,35,70);
        }
    }


    gameWindow = new GameWindow(canvas.width, canvas.height);
    gameWindow.drawNew();
    var carrot = new Carrot(gameWindow);

    carrotList = new LinkedList(gameWindow);
    poofList = new PoofList(gameWindow);
    carrotList.append(carrot);
    carrot.bloom();
    
    
    setInterval(function createCarrot(){
        if (carrotsOnScreen < 40) {
            carrot = new Carrot(gameWindow);
            carrotList.append(carrot);
            carrot.bloom();
        }
    }, 3000 );    
    
    
    canvas.addEventListener("mousemove", function(event) {
        mouseX = parseInt(event.clientX - canvas.getBoundingClientRect().left);
        mouseY = parseInt(event.clientY - canvas.getBoundingClientRect().top);
        
        //  if mouse is over a stem, change stem sprite
        let carNode = carrotList.head;
        while (carNode) {
            var carrot = carNode.carrot;
            if (!carrot.yoinked) {
                if (carrot.gripped) {
                    if (mouseY < oldY) {
                        carrot.pulled();
                    }
                } else {
                    if (mouseX>=carrot.x+10 && mouseX<=carrot.x+90 && mouseY>=carrot.y+5 && mouseY<=carrot.y+100) {
                        carrot.touched();
                    } else if (carrot.fondled) {
                        carrot.untouched();
                    }
                }
            }
            carNode = carNode.next;
        }
        oldY = mouseY;
    });
    
    canvas.addEventListener("mousedown", function(event) {
        let carNode = carrotList.head;
        while (carNode) {
            if (carNode.carrot.fondled && !carNode.carrot.yoinked) {
                carNode.carrot.grabbed();
            }
            carNode = carNode.next;
        }
    });
    
    canvas.addEventListener("mouseup", function(event) {
        let carNode = carrotList.head;
        while (carNode) { 
            if (carNode.carrot.gripped && !carNode.carrot.yoinked) {
                carNode.carrot.ungrabbed();
            }
            carNode = carNode.next; 
        }
    });
    
});