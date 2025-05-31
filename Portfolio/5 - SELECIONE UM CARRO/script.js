var result = document.getElementById("result");
var container = document.getElementsByClassName("container")[0];
var nav = document.getElementsByTagName("nav")[0];
var btnWhite = document.getElementsByClassName("btn_circle_1")[0];
var btnRed = document.getElementsByClassName("btn_circle_2")[0];
var reset = document.getElementById("resetar");
var acelerar = document.getElementById("acelerar");
var desacelerar = document.getElementById("desacelerar");
var whiteCar = document.getElementById("white");
var redCar = document.getElementById("red");
var selectCar = null;

var originalStyles = {
    white: {
        top: parseFloat(window.getComputedStyle(whiteCar).top),
        left: parseFloat(window.getComputedStyle(whiteCar).left),
        width: parseFloat(window.getComputedStyle(whiteCar).width),
        height: parseFloat(window.getComputedStyle(whiteCar).height),
    },
    red: {
        top: parseFloat(window.getComputedStyle(redCar).top),
        right: parseFloat(window.getComputedStyle(redCar).right),
        width: parseFloat(window.getComputedStyle(redCar).width),
        height: parseFloat(window.getComputedStyle(redCar).height),
    }
};

const MAX_ADVANCE = 40;
const MIN_SIZE = 10;


function btnVisible() {
    let displayValue = selectCar ? "block" : "none";
    for (let i = 0; i < nav.children.length; i++) {
        if (nav.children[i].classList.contains('btn')) {
            nav.children[i].style.display = displayValue;
        }
    }
}


function selectWhite() {
    selectCar = whiteCar;
    result.textContent = "Branco!";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    container.style.border = "1px solid black";
    reset.style.border = "1px solid black";
    acelerar.style.border = "1px solid black";
    desacelerar.style.border = "1px solid black";
    btnVisible();
    updateButtonBorders();
}

function selectRed() {
    selectCar = redCar;
    result.textContent = "Vermelho!";
    document.body.style.backgroundColor = "DarkRed";
    document.body.style.color = "white";
    container.style.border = "1px solid white";
    reset.style.border = "1px solid white";
    acelerar.style.border = "1px solid white";
    desacelerar.style.border = "1px solid white";
    btnVisible();
    updateButtonBorders();
}

function speedUp(el) {
    if (!el) {
        alert("Selecione um dos carros!");
        return;
    }

    let style = window.getComputedStyle(el);
    let top = parseFloat(style.top);
    let width = parseFloat(style.width);
    let height = parseFloat(style.height);

    if (el === whiteCar) {
        let left = parseFloat(style.left);
        if ((originalStyles.white.top - top) < MAX_ADVANCE && width > MIN_SIZE && height > MIN_SIZE) {
            el.style.top = (top - 1) + "px";
            el.style.width = (width - 1) + "px";
            el.style.height = (height - 1) + "px";
            el.style.left = (left + 1) + "px";
        }
    } else {
        let right = parseFloat(style.right);
        if ((originalStyles.red.top - top) < MAX_ADVANCE && width > MIN_SIZE && height > MIN_SIZE) {
            el.style.top = (top - 1) + "px";
            el.style.width = (width - 1) + "px";
            el.style.height = (height - 1) + "px";
            el.style.right = (right + 1) + "px";
        }
    }
}

function slowDown(el) {
    if (!el) {
        alert("Selecione um dos carros!");
        return;
    }

    let style = window.getComputedStyle(el);
    let top = parseFloat(style.top);
    let width = parseFloat(style.width);
    let height = parseFloat(style.height);

    if (el === whiteCar) {
        let left = parseFloat(style.left);

        if (top < originalStyles.white.top) {
            el.style.top = Math.min(top + 1, originalStyles.white.top) + "px";
        }
        if (width < originalStyles.white.width) {
            el.style.width = Math.min(width + 1, originalStyles.white.width) + "px";
        }
        if (height < originalStyles.white.height) {
            el.style.height = Math.min(height + 1, originalStyles.white.height) + "px";
        }
        if (left > originalStyles.white.left) {
            el.style.left = Math.max(left - 1, originalStyles.white.left) + "px";
        }
    } else {
        let right = parseFloat(style.right);

        if (top < originalStyles.red.top) {
            el.style.top = Math.min(top + 1, originalStyles.red.top) + "px";
        }
        if (width < originalStyles.red.width) {
            el.style.width = Math.min(width + 1, originalStyles.red.width) + "px";
        }
        if (height < originalStyles.red.height) {
            el.style.height = Math.min(height + 1, originalStyles.red.height) + "px";
        }
        if (right > originalStyles.red.right) {
            el.style.right = Math.max(right - 1, originalStyles.red.right) + "px";
        }
    }
}


btnWhite.addEventListener('click', selectWhite);
btnRed.addEventListener('click', selectRed);


whiteCar.addEventListener('click', selectWhite);
redCar.addEventListener('click', selectRed);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        speedUp(selectCar);
    } else if (event.key === 'ArrowDown') {
        slowDown(selectCar);
    }
});

reset.addEventListener('click', function() {
    location.reload();
});

acelerar.addEventListener('mousedown', function() {
    speedUp(selectCar);
    this.intervalo = setInterval(function() { speedUp(selectCar); }, 50);
});
acelerar.addEventListener('mouseup', function() {
    clearInterval(this.intervalo);
});
acelerar.addEventListener('mouseleave', function() {
    clearInterval(this.intervalo);
});

desacelerar.addEventListener('mousedown', function() {
    slowDown(selectCar);
    this.intervalo = setInterval(function() { slowDown(selectCar); }, 50);
});
desacelerar.addEventListener('mouseup', function() {
    clearInterval(this.intervalo);
});
desacelerar.addEventListener('mouseleave', function() {
    clearInterval(this.intervalo);
});


btnVisible();
updateButtonBorders();
