var volume_level;
var volume_control;
var volume_image;

window.addEventListener('load', function() {
    volume_level = 2;
    volume_control = document.getElementById("volume_control");
    volume_image = document.getElementById("volume_image");
    volume_image.src = "volume_control2.png";
});

function volume_change(volume_image) {
    if (volume_level == 2) {
        volume_level = 0;
        volume_image.src = "volume_control0.png";
    } else if (volume_level == 1) {
        volume_level = 2;
        volume_image.src = "volume_control2.png";
    } else if (volume_level == 0) {
        volume_level = 1;
        volume_image.src = "volume_control1.png";
    } 
}

function volume_set(audio) {
    if (volume_level == 2)  {
        audio.volume = 1.0;
    } else if (volume_level == 1)  {
        audio.volume = 0.3;
    } else if (volume_level == 0)  {
        audio.volume = 0.0;
    }
}

function force_volume(num) {
    volume_level == num;
}