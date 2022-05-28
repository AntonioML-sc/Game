
// Instances

let time = document.getElementById("timer");

let ir = true;
let t = 0;

let pepe = new Character("Pepe", 50, 590, "space");
let pepeDiv = document.getElementById(pepe.name);

let wall1 = new Wall('wall1', "space", 500, 570, 60, 60, 'greenyellow', 3, 4, 4, 4, 4, 'black', 2, 2, 2, 2);

let contactObjects = [];

// Function that checks the status

function myfunction() {
    t += 10;

    if (t % 1000 == 0) {
        time.innerHTML = `Tiempo total: ${t / 1000}s`;

        let pepeDivPosX = window.getComputedStyle(pepeDiv).getPropertyValue('left');
        let pepeDivPosY = window.getComputedStyle(pepeDiv).getPropertyValue('top');
        console.log("sx, sy: " + pepe.sx + ", " + pepe.sy + "posicion div: " + pepeDivPosX + ", " + pepeDivPosY);
    }

    pepe.upgradePos();
}

// Events that send orders for movement

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == 'd') {
        pepe.setVx('right');
    } else if (keyName == 'a') {
        pepe.setVx('left');
    }
    if (keyName == 'w') {
        pepe.jump();
    }
});

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName == 'd') {
        pepe.setVx('stop');
    } 
    if (keyName == 'a') {
        pepe.setVx('stop');      
    }
});

// order to execute the function that upgrades the status in 10ms time

let count = setInterval(myfunction, 10);

