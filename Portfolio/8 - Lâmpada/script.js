const lamp = document.getElementById('lamp');

lamp.addEventListener('click', () => {
    if (lamp.src.includes("lamp_off.png")) {
        lamp.src = "./assets/lamp_on.png";
        document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)";
    } else {
        lamp.src = "./assets/lamp_off.png";
        document.body.style.background = "radial-gradient(circle, white 8%, black 100%)";
    }
});