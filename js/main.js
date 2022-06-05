
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
    const goalPosition = [1400, 100];

    // Player 1

    const player1 = players[0];
    player1.render(10, 540, "space");
    const player1Portrait = document.getElementById("portraitP1");
    const player1LifeBar = document.getElementById("lifeP1");
    player1Portrait.setAttribute("style", `background-image: url(${players[0].portrait}); height: 15em; background-size: 47px 46px; background-repeat: no-repeat; background-position: top;`);

    // Player 2
    const player2 = players[1];
    player2.render(60, 590, "space");
    const player2Portrait = document.getElementById("portraitP2");
    const player2LifeBar = document.getElementById("lifeP2");
    player2Portrait.setAttribute("style", `background-image: url(${players[1].portrait}); height: 15em; background-size: 47px 46px; background-repeat: no-repeat; background-position: top;`);

    // Walls

    
    const floor1 = new Wall('floor1', "space", 0, 500, 1350, 20, 'brown', 3, 0, 4, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const backWall = new Wall('backWall', "space", 0, 520, 1350, 110, 'brown', 1, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const wall1 = new Wall('wall1', "space", 0, 580, 50, 50, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall2 = new Wall('wall2', "space", 100, 580, 100, 50, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall3 = new Wall('wall3', "space", 600, 580, 50, 50, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall4 = new Wall('wall4', "space", 680, 600, 50, 30, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall5 = new Wall('wall5', "space", 770, 600, 50, 30, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall6 = new Wall('wall6', "space", 1400, 580, 100, 50, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');

    const platform1 = new Wall('platform1', 'space', 440, 575, 110, 10, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform2 = new Wall('platform2', 'space', 900, 575, 200, 10, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    // Traps

    const water1 = new Fluid('water1', "space", 200, 590, 400, 40, 'rgb(0, 204, 255)', 'rgb(0, 204, 255)', 0.35, 0.0, 0.7, 0.97);
    
    const spikeCeiling1 = new SpikeTrapCeiling('spikeCeiling1', "space", 250, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling2 = new SpikeTrapCeiling('spikeCeiling2', "space", 270, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling3 = new SpikeTrapCeiling('spikeCeiling3', "space", 290, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling4 = new SpikeTrapCeiling('spikeCeiling4', "space", 310, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling5 = new SpikeTrapCeiling('spikeCeiling5', "space", 330, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling6 = new SpikeTrapCeiling('spikeCeiling6', "space", 350, 520, 'rgb(102, 70, 70)', 3);
    const spikeCeiling7 = new SpikeTrapCeiling('spikeCeiling7', "space", 370, 520, 'rgb(102, 70, 70)', 3);

    
    const spike1 = new SpikeTrap('spike1', "space", 655, 610, 'rgb(102, 70, 70)', 3);
    const spike2 = new SpikeTrap('spike2', "space", 740, 610, 'rgb(102, 70, 70)', 3);
    const spike3 = new SpikeTrap('spike3', "space", 1460, 560, 'rgb(102, 70, 70)', 3);
    const spike4 = new SpikeTrap('spike4', "space", 1480, 560, 'rgb(102, 70, 70)', 3);

    const spikeCeiling8 = new SpikeTrapCeiling('spikeCeiling8', "space", 1200, 520, 'rgb(102, 70, 70)', 3);
    
    const spearCeiling1 = new SpearTrapCeiling('spearTrapCeiling1', "space", 950, 500, 'rgb(66, 80, 99)', 2, 0);
    const spearCeiling2 = new SpearTrapCeiling('spearTrapCeiling2', "space", 1050, 500, 'rgb(66, 80, 99)', 2, 100);
    
    const spearFloor1 = new SpearTrap('spearFloor1', "space", 900, 600, 'rgb(66, 80, 99)', 2);
    const spearFloor2 = new SpearTrap('spearFloor2', "space", 1000, 600, 'rgb(66, 80, 99)', 2, 50);
    const spearFloor3 = new SpearTrap('spearFloor3', "space", 1090, 600, 'rgb(66, 80, 99)', 2, 150);

    // arrays of objects to test players status
    const contactObjectsP1 = [player2, floor1, wall1, wall2, wall3, platform1, wall4, wall5, platform2, wall6];
    const contactObjectsP2 = [player1, floor1, wall1, wall2, wall3, platform1, wall4, wall5, platform2, wall6];

    const hazardZones = [water1];
    const spikes = [spike1, spike2, spearFloor1, spearFloor2, spearFloor3, spike3, spike4];
    const ceilingSpikes = [spikeCeiling1, spikeCeiling2, spikeCeiling3, spikeCeiling4, spikeCeiling5, spikeCeiling6, spikeCeiling7, spikeCeiling8, spearCeiling1, spearCeiling2];

    const updatingItems = [spearCeiling1, spearCeiling2, spearFloor1, spearFloor2, spearFloor3];


    // Function that checks the status

    function myfunction() {
        t += 1;

        if (t % 100 == 0) {
            time.innerHTML = `Tiempo total: ${t / 100}s`;
        }

        // updates positions and displays the current hp of players
        player1.updatePos(contactObjectsP1, hazardZones, spikes, ceilingSpikes);
        player2.updatePos(contactObjectsP2, hazardZones, spikes, ceilingSpikes);

        player1LifeBar.setAttribute("style", `background-color: lime; height: ${players[0].hp * 45 / players[0].maxHP}px; width: 100%; align-self: flex-end;`);
        player2LifeBar.setAttribute("style", `background-color: lime; height: ${players[1].hp * 45 / players[1].maxHP}px; width: 100%; align-self: flex-end;`);

        updatingItems.forEach(i => i.updatePos(t));

        for (let p of players) {
            if ((p.sx > goalPosition[0]) && (p.sy <= goalPosition[1])) {
                console.log("alguien ha llegado a la meta");
                clearInterval(runGame);
                winnerIs.innerHTML = `Ganador: ${p.name}`;
                screenShift("screen5");
            }
        }
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
