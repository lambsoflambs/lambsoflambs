function createPiano() {
                
    var cat = document.getElementsByClassName("whitecat")[0];
    
    for (var j=0;j<13;j++){ 
        var cat2 = cat.cloneNode(true);
        if (j==1 || j==3 || j==6 || j==8 || j==10) {
            cat2.src = "cat3.png";
            cat2.class = "blackcat";

        } else {
            cat2.src = "cat1.png";
            cat2.class = "whitecat";
        }
        document.getElementById("catPiano").appendChild(cat2);
    }
    cat.remove()
    
}
function meow(cat) {
    if (cat.class == "whitecat") {
        cat.src = 'cat2.png';
    } else {
        cat.src = 'cat4.png';
    }

    // i feel like yanderedev
    var meow = new Audio('MarioPaintMeow.mp3');
    if (document.getElementsByClassName("whitecat")[0] == cat) {
        meow = new Audio('MarioPaintMeowC4.wav');
    } else if (document.getElementsByClassName("whitecat")[1] == cat) {
        meow = new Audio('MarioPaintMeowCsharp.wav');
    } else if (document.getElementsByClassName("whitecat")[2] == cat) {
        meow = new Audio('MarioPaintMeowD.wav');
    } else if (document.getElementsByClassName("whitecat")[3] == cat) {
        meow = new Audio('MarioPaintMeowDsharp.wav');
    } else if (document.getElementsByClassName("whitecat")[4] == cat) {
        meow = new Audio('MarioPaintMeowE.wav');
    } else if (document.getElementsByClassName("whitecat")[5] == cat) {
        meow = new Audio('MarioPaintMeowF.wav');
    } else if (document.getElementsByClassName("whitecat")[6] == cat) {
        meow = new Audio('MarioPaintMeowFsharp.wav');
    } else if (document.getElementsByClassName("whitecat")[7] == cat) {
        meow = new Audio('MarioPaintMeowG.wav');
    } else if (document.getElementsByClassName("whitecat")[8] == cat) {
        meow = new Audio('MarioPaintMeowGsharp.wav');
    } else if (document.getElementsByClassName("whitecat")[9] == cat) {
        meow = new Audio('MarioPaintMeowA.wav');
    } else if (document.getElementsByClassName("whitecat")[10] == cat) {
        meow = new Audio('MarioPaintMeowAsharp.wav');
    } else if (document.getElementsByClassName("whitecat")[11] == cat) {
        meow = new Audio('MarioPaintMeowB.wav');
    } else if (document.getElementsByClassName("whitecat")[12] == cat) {
        meow = new Audio('MarioPaintMeowC5.wav');
    } 
    volume_set(meow);
    meow.play();
}
function unmeow(cat) {
    if (cat.class == "whitecat") {
        cat.src = 'cat1.png';
    } else {
        cat.src = 'cat3.png';
    }
}