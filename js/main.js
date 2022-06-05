
let players = [];

let winner = "";
const winnerIs = document.getElementById("winnerIs");

const screenShift = (nextScreenId) => {

    const destination = document.getElementById(nextScreenId);
    destination.style.display = "flex";

    const ScreensArray = ["screen1", "screen2", "screen3", "screen4", "screen5"];

    for (let screen of ScreensArray) {
        if (screen != nextScreenId) {
            document.getElementById(screen).style.display = "none";
        };
    };
};

let statsBarbarian = document.getElementById('statsBarbarian');
let statsNinja = document.getElementById('statsNinja');
let statsMiner = document.getElementById('statsMiner');
let statsArcher = document.getElementById('statsArcher');

statsBarbarian.innerHTML = `BÁRBARO: </br> Puntos de golpe: ${barbarian.hp} </br> Velocidad: ${barbarian.maxSpeedX} </br> Salto: ${barbarian.maxSpeedY}`;
statsNinja.innerHTML = `NINJA: </br> Puntos de golpe: ${ninja.hp} </br> Velocidad: ${ninja.maxSpeedX} </br> Salto: ${ninja.maxSpeedY}`;
statsMiner.innerHTML = `MINERO: </br> Puntos de golpe: ${miner.hp} </br> Velocidad: ${miner.maxSpeedX} </br> Salto: ${miner.maxSpeedY}`;
statsArcher.innerHTML = `ARQUERO: </br> Puntos de golpe: ${archer.hp} </br> Velocidad: ${archer.maxSpeedX} </br> Salto: ${archer.maxSpeedY}`;

const pickCharacter = (character) => {

    if (players.length < 2) {
        // build the array of players with the picked characters

        if (!players.includes(characters[character])) {
            players.push(characters[character]);
        }
        
        console.log(players);

        if (players.length == 2) {

            setTimeout(() => {

                // set the portraits of the picked characters in screen3 before shifting
                const p1Character = document.getElementById("player1Character");
                const p2Character = document.getElementById("player2Character");
                const countdown = document.getElementById("countdown");
                p1Character.setAttribute("style", `background-image: url(${players[0].img}); height: 15em; background-size: auto 15em; background-repeat: no-repeat; background-position: center;`);
                p2Character.setAttribute("style", `background-image: url(${players[1].img}); height: 15em; background-size: auto 15em; background-repeat: no-repeat; background-position: center;`);

                screenShift("screen3");

                setTimeout(() => {

                    play(players);  // execute the game with the chosen characters

                    setTimeout(() => {
                        screenShift("screen4");
                    }, 1500);

                }, 2000);

            }, 500);
        }
    }
};

// playgame

const play = (players) => {

    // Instances

    const time = document.getElementById("timer");

    let t = 0;

    const player1 = players[0];
    player1.render(50, 590, "space");
    let player2;

    if (players.length == 2) {
        player2 = players[1];
        player2.render(80, 590, "space");
        console.log(player2);
    }


    const wall0 = new Wall('wall0', "space", 500, 200, 240, 120, 'greenyellow', 3, 4, 4, 4, 4, 'black', 2, 2, 2, 2, '../img/stoneWall50x50.jpg');

    const wall1 = new Wall('wall1', "space", 500, 570, 60, 60, 'greenyellow', 3, 4, 4, 4, 4, 'black', 2, 2, 2, 2, '../img/stoneWall50x50.jpg');
    const wall2 = new Wall('wall2', "space", 150, 570, 10, 60, 'lightgrey', 3, 5, 5, 0, 0, 'black', 2, 2, 2, 2, '../img/greyStone50x50.jpg');
    const wall3 = new Wall('wall3', "space", 900, 530, 10, 100, 'lightgrey', 3, 5, 5, 0, 0, 'black', 2, 2, 2, 2, '../img/greyStone50x50.jpg');
    const wall4 = new Wall('wall4', "space", 1300, 430, 10, 100, 'lightgrey', 3, 5, 5, 0, 0, 'black', 2, 2, 2, 2, '../img/greyStone50x50.jpg');

    const wall5 = new Wall('wall5', "space", 600, 590, 60, 40, 'lightgrey', 3, 5, 5, 0, 0, 'black', 2, 2, 2, 2);
    const wall6 = new Wall('wall6', "space", 820, 590, 60, 40, 'lightgrey', 3, 5, 5, 0, 0, 'black', 2, 2, 2, 2);
    const falseWall1 = new Wall('falseWall1', "space", 640, 580, 200, 50, 'grey', 2, 5, 5, 0, 0, 'black', 2, 2, 2, 2);

    const platform1 = new Wall('platform1', 'space', 250, 550, 80, 10, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2);
    const platform2 = new Wall('platform2', 'space', 300, 470, 80, 10, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2);
    const platform3 = new Wall('platform3', 'space', 1050, 530, 300, 15, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2, '../img/wood3.jpg');
    const platform4 = new Wall('platform4', 'space', 1050, 200, 300, 15, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2);
    const platform5 = new Wall('platform5', 'space', 1200, 100, 300, 15, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2);
    const platform6 = new Wall('platform6', 'space', 700, 400, 300, 15, 'brown', 3, 3, 3, 3, 3, 'black', 2, 2, 2, 2);

    const acid1 = new Fluid('acid1', "space", 660, 600, 160, 30, 'lime', 'lime', 0.35, 0.03, 0.7, 0.97);
    const toxicFog1 = new Fluid('toxicFog1', "space", 160, 580, 340, 50, 'fuchsia', 'fuchsia', 0.1, 0.02, 1, 1);

    const spike1 = new SpikeTrap('spike1', "space", 570, 610, 'silver', 3);
    const spike2 = new SpikeTrap('spike2', "space", 1100, 610, 'grey', 3);
    const spike3 = new SpikeTrap('spike3', "space", 1120, 610, 'grey', 3);

    const spikeCeiling1 = new SpikeTrapCeiling('spikeCeiling1', "space", 1050, 545, 'grey', 3);
    const spikeCeiling2 = new SpikeTrapCeiling('spikeCeiling2', "space", 1070, 545, 'grey', 3);
    const spikeCeiling3 = new SpikeTrapCeiling('spikeCeiling3', "space", 1330, 545, 'grey', 3);

    const spearCeiling1 = new SpearTrapCeiling('spearTrapCeiling1', "space", 1240, 545, 'grey', 3, 0);
    const spearCeiling2 = new SpearTrapCeiling('spearTrapCeiling2', "space", 1280, 545, 'grey', 3, 100);

    const spearFloor1 = new SpearTrap('spearFloor1', "space", 1180, 570, 'grey', 3);
    const spearFloor2 = new SpearTrap('spearFloor2', "space", 1150, 480, 'grey', 2, 50);

    const rollingRock1 = new RollingRock('rollingRock1', "space", 700, 350, 1, 300, 'lightgrey', 'grey', 1, 'black', 3);

    const bird1 = new Bird('bird1', "space", 20, 420, 1, 650, 50, 3);


    // arrays of objects to test players status
    const contactObjectsP1 = [wall1, wall2, wall3, wall4, wall5, wall6, platform1, platform2, platform3, platform4, platform5, platform6, bird1, player2];
    const contactObjectsP2 = [wall1, wall2, wall3, wall4, wall5, wall6, platform1, platform2, platform3, platform4, platform5, platform6, bird1, player1];

    const hazardZones = [acid1, toxicFog1, rollingRock1];
    const spikes = [spike1, spike2, spike3, spearFloor1, spearFloor2];
    const ceilingSpikes = [spikeCeiling1, spikeCeiling2, spikeCeiling3, spearCeiling1, spearCeiling2];

    const upgradingItems = [spearCeiling1, spearCeiling2, spearFloor1, spearFloor2, rollingRock1, bird1];

    console.log("player1 borders: top: " + player1.topBorder + " bottom: " + player1.bottomBorder + ", wall1 borders: top: " + wall1.topBorder + " bottom: " + wall1.bottomBorder);
    console.log("wall1: sx, sy = " + wall1.sx + ", " + wall1.sy + ".  width, height: " + wall1.width + ", " + wall1.height);

    // Function that checks the status

    function myfunction() {
        t += 1;

        if (t % 100 == 0) {
            time.innerHTML = `Tiempo total: ${t / 100}s`;

            console.log("Player1 vida restante: ", Math.round(player1.hp));
        }

        player1.updatePos(contactObjectsP1, hazardZones, spikes, ceilingSpikes);
        player2.updatePos(contactObjectsP2, hazardZones, spikes, ceilingSpikes);

        upgradingItems.forEach(i => i.updatePos(t));
    }

    // Events that send orders for player1 movement

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName == 'd') {
            player1.move('right');
        } else if (keyName == 'a') {
            player1.move('left');
        }
        if (keyName == 'w') {
            player1.jump();
        }
    });

    document.addEventListener('keyup', (event) => {
        const keyName = event.key;
        if (keyName == 'd') {
            player1.move('stop');
        }
        if (keyName == 'a') {
            player1.move('stop');
        }
    });

    // Events that send orders for player2 movement

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName == 'ArrowRight') {
            player2.move('right');
        } else if (keyName == 'ArrowLeft') {
            player2.move('left');
        }
        if (keyName == 'ArrowUp') {
            player2.jump();
        }
    });

    document.addEventListener('keyup', (event) => {
        const keyName = event.key;
        if (keyName == 'ArrowRight') {
            player2.move('stop');
        }
        if (keyName == 'ArrowLeft') {
            player2.move('stop');
        }
    });

    // Event to send the order to quit and go to screen 5

    const forceExit = () => {
        console.log("salida forzada");
        clearInterval(runGame);
        winnerIs.innerHTML = "No winner";
        screenShift("screen5");
    }

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName == 'Escape') {
            forceExit();
        }
    });

    // order to execute the function that upgrades the status in 10ms time

    let runGame = setInterval(myfunction, 10);
}

const restart = () => {
    // restart the game from screen 1
    console.log("restart");
    players = [];
    winner = "";

    // clear space by deleting its children divs
    const list = document.getElementById("space");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    screenShift("screen1");
};
