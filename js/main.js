
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

    
    const floor1 = new Wall('floor1', "space", 0, 500, 1350, 20, '', 3, 0, 4, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const backWall = new Wall('backWall', "space", 0, 520, 1350, 110, 'bisque', 1, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const wall1 = new Wall('wall1', "space", 0, 580, 50, 50, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall2 = new Wall('wall2', "space", 100, 580, 100, 50, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall3 = new Wall('wall3', "space", 600, 580, 50, 50, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall4 = new Wall('wall4', "space", 680, 600, 50, 30, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall5 = new Wall('wall5', "space", 770, 600, 50, 30, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall6 = new Wall('wall6', "space", 1400, 580, 100, 50, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');

    const platform1 = new Wall('platform1', 'space', 440, 575, 110, 10, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform2 = new Wall('platform2', 'space', 900, 575, 200, 10, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');

    const floor2 = new Wall('floor2', "space", 900, 300, 350, 20, 'bisque', 3, 4, 4, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const backWall2 = new Wall('backWall2', "space", 905, 320, 340, 180, 'bisque', 1, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const wall7 = new Wall('wall7', "space", 900, 320, 20, 100, 'bisque', 3, 0, 0, 4, 4, 'rgb(81, 67, 67)', 2, 2, 2, 2, '../img/stoneWall.jpg');
    const wall8 = new Wall('wall8', "space", 1230, 320, 20, 100, 'bisque', 3, 0, 0, 4, 4, 'rgb(81, 67, 67)', 2, 2, 2, 2, '../img/stoneWall.jpg');
    const door1 = new Wall('door1', "space", 904, 420, 14, 80, 'brown', 7, 0, 0, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const door2 = new Wall('door2', "space", 1232, 420, 14, 80, 'brown', 7, 0, 0, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    
    const platform3 = new Wall('platform3', 'space', 520, 420, 80, 15, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const wall9 = new Wall('wall9', "space", 800, 445, 56, 55, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall10 = new Wall('wall10', "space", 400, 445, 56, 55, 'bisque', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const wall11 = new Wall('wall11', "space", 0, 420, 127, 80, 'bisque', 3, 4, 4, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const backWall3 = new Wall('backWall3', "space", 110, 440, 320, 60, 'bisque', 1, 6, 15, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const backWall4 = new Wall('backWall4', "space", 525, 420, 70, 80, 'bisque', 1, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const backWall5 = new Wall('backWall5', "space", 0, 350, 45, 70, 'bisque', 1, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 0, 1, '../img/stoneWall50x50.jpg');
    const wall12 = new Wall('wall12', "space", 127, 480, 40, 20, 'bisque', 7, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');

    
    const platform4 = new Wall('platform4', 'space', 190, 280, 270, 15, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform5 = new Wall('platform5', 'space', 0, 350, 70, 15, 'brown', 3, 0, 3, 0, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const door3 = new Wall('door3', "space", 200, 290, 10, 150, 'brown', 4, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const door4 = new Wall('door4', "space", 436, 290, 10, 155, 'brown', 7, 0, 0, 0, 0, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    
    const wall13 = new Wall('wall13', "space", 0, 190, 70, 65, 'bisque', 3, 0, 4, 0, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/stoneWall.jpg');
    const platform6 = new Wall('platform6', 'space', 190, 140, 90, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform7 = new Wall('platform7', 'space', 380, 125, 100, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const box = new Wall('box', "space", 430, 250, 30, 30, 'brown', 3, 4, 4, 4, 4, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood5.jpg');
    const platform8 = new Wall('platform8', 'space', 580, 160, 60, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform9 = new Wall('platform9', 'space', 780, 220, 60, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform10 = new Wall('platform10', 'space', 840, 270, 60, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform11 = new Wall('platform11', 'space', 1340, 230, 60, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platform12 = new Wall('platform12', 'space', 1150, 150, 100, 12, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');
    const platformFinal = new Wall('platformFinal', 'space', 1350, 80, 150, 18, 'brown', 3, 3, 3, 3, 3, 'rgb(81, 67, 67)', 1, 1, 1, 1, '../img/wood2.jpg');

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
    
    const toxicFog1 = new Fluid('toxicFog1', "space", 920, 320, 310, 180, 'green', 'limegreen', 0.15, 0.04, 1, 1);
    
    const rollingRock1 = new RollingRock('rollingRock1', "space", 458, 450, 2, 340, 'lightgrey', 'grey', 1, 'black', 3);
    
    const acid1 = new Fluid('acid1', "space", 127, 460, 273, 40, 'lime', 'green', 0.45, 0.06, 0.7, 0.97);
    
    const spikeCeiling10 = new SpikeTrapCeiling('spikeCeiling10', "space", 210, 295, 'rgb(102, 70, 70)', 3);
    const spikeCeiling11 = new SpikeTrapCeiling('spikeCeiling11', "space", 230, 295, 'rgb(102, 70, 70)', 3);
    const spikeCeiling12 = new SpikeTrapCeiling('spikeCeiling12', "space", 250, 295, 'rgb(102, 70, 70)', 3);
    const spikeCeiling13 = new SpikeTrapCeiling('spikeCeiling13', "space", 380, 295, 'rgb(102, 70, 70)', 3);
    const spikeCeiling14 = new SpikeTrapCeiling('spikeCeiling14', "space", 400, 295, 'rgb(102, 70, 70)', 3);
    
    const spike5 = new SpikeTrap('spike5', "space", 280, 260, 'rgb(102, 70, 70)', 3);
    const spike6 = new SpikeTrap('spike6', "space", 300, 260, 'rgb(102, 70, 70)', 3);
    const spike7 = new SpikeTrap('spike7', "space", 320, 260, 'rgb(102, 70, 70)', 3);
    const spike8 = new SpikeTrap('spike8', "space", 340, 260, 'rgb(102, 70, 70)', 3);
    const spike9 = new SpikeTrap('spike9', "space", 360, 260, 'rgb(102, 70, 70)', 3);
    
    const spearFloor4 = new SpearTrap('spearFloor4', "space", 30, 145, 'rgb(66, 80, 99)', 2, 150);
    const spearCeiling3 = new SpearTrapCeiling('spearTrapCeiling3', "space", 30, 255, 'rgb(66, 80, 99)', 2, 100);
    
    const spike10 = new SpikeTrap('spike10', "space", 850, 250, 'rgb(102, 70, 70)', 3);    
    const spike11 = new SpikeTrap('spike11', "space", 870, 250, 'rgb(102, 70, 70)', 3);
    
    const spike12 = new SpikeTrap('spike12', "space", 980, 280, 'rgb(102, 70, 70)', 3);
    const spike13 = new SpikeTrap('spike13', "space", 1000, 280, 'rgb(102, 70, 70)', 3);
    const spike14 = new SpikeTrap('spike14', "space", 1020, 280, 'rgb(102, 70, 70)', 3);
    const spike15 = new SpikeTrap('spike15', "space", 1040, 280, 'rgb(102, 70, 70)', 3);
    
    const spike16 = new SpikeTrap('spike16', "space", 1160, 280, 'rgb(102, 70, 70)', 3);
    const spike17 = new SpikeTrap('spike17', "space", 1180, 280, 'rgb(102, 70, 70)', 3);
    const spike18 = new SpikeTrap('spike18', "space", 1200, 280, 'rgb(102, 70, 70)', 3);
    
    const bird1 = new Bird('bird1', "space", 20, 50, 1, 850, 50, 3);

    // arrays of objects to test players status
    const contactObjectsP1 = [player2, floor1, wall1, wall2, wall3, platform1, wall4, wall5, platform2, wall6,
        floor2, wall7, wall8, wall9, wall10, wall11, platform3, platform4, platform5, wall12, wall13, platform6,
        platform7, platform8, platform9, platform10, box, platform11, platform12, platformFinal, bird1];

    const contactObjectsP2 = [player1, floor1, wall1, wall2, wall3, platform1, wall4, wall5, platform2, wall6,
        floor2, wall7, wall8, wall9, wall10, wall11, platform3, platform4, platform5, wall12, wall13, platform6,
        platform7, platform8, platform9, platform10, box, platform11, platform12, platformFinal, bird1];

    const hazardZones = [water1, toxicFog1, rollingRock1, acid1];
    const spikes = [spike1, spike2, spearFloor1, spearFloor2, spearFloor3, spike3, spike4, spike5, spike6, spike7,
        spike8, spike9, spearFloor4, spike10, spike11, spike12, spike13, spike14, spike15, spike16, spike17, spike18];

    const ceilingSpikes = [spikeCeiling1, spikeCeiling2, spikeCeiling3, spikeCeiling4, spikeCeiling5, spikeCeiling6,
        spikeCeiling7, spikeCeiling8, spearCeiling1, spearCeiling2, spikeCeiling10, spikeCeiling11, spikeCeiling12,
        spikeCeiling13, spikeCeiling14, spearCeiling3];

    const updatingItems = [spearCeiling1, spearCeiling2, spearFloor1, spearFloor2, spearFloor3, rollingRock1,
        spearFloor4, spearCeiling3, bird1];


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
