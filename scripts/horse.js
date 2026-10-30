function horse() {
    var img = document.getElementById("horse");
    var horse = document.createElement("img");
    horse.src = img.src;
    var place = document.getElementById("gameworld");
    place.append(horse);
    horse.setAttribute("style", "position:absolute;left:50px;top:35px;width:300px;height:300px;");
    setTimeout( () => {horse.remove();}, 1000);
}