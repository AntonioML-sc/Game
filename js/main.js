

let time = document.getElementById("timer");

let ir = true;
let t = 0;

let pepe = new Character("Pepe", 50, 590, "space");
let pepeDiv = document.getElementById(pepe.name);

function myfunction() {
    t += 20;
    
    if (t % 1000 == 0) {
        time.innerHTML = `Tiempo total: ${t / 1000}s`;

        let pepeDivPosX = window.getComputedStyle(pepeDiv).getPropertyValue('left');
        console.log("sx: " + pepe.sx + "posicion div: " + pepeDivPosX);
    }

    pepe.upgradePos();
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == 'd') {
        pepe.setVx('right');
    } else if (keyName == 'a') {
        pepe.setVx('left');        
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

let count = setInterval(myfunction, 10);

