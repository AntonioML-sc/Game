
const WINDOWWIDTH = 1500;
const WINDOWHEIGHT = 630;

class Character {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    hp = 100;
    maxSpeedX = 1.5;
    maxSpeedY = 5.0;
    height = 40.0;
    width = 25.0;
    sx = 50.0;
    sy = 590.0;
    vx = 0.0;
    vy = 0.0;
    ax = 0.0;
    ay = 0.1;
    img = '';
    topBorder = 590.0;
    bottomBorder = 630.0;
    leftBorder = 50.0;
    rightBorder = 75.0;
    fatherDiv = '';
    div;
    jumping = false;

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, hp, speed, jump) {
        this.name = name;
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.hp = hp;
        this.maxSpeedX = speed;
        this.maxSpeedY = jump;
    }

    ///////////////////////////////  METHODS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render(sx, sy, fatherDiv) {

        // rendering options
        this.fatherDiv = fatherDiv;
        this.sx = Number(sx);
        this.sy = Number(sy);

        // creates a div in this.fatherDiv that represents the character
        let make = document.createElement('div');
        make.setAttribute("id", this.name);
        document.getElementById(this.fatherDiv).appendChild(make);

        // set styles to the charachter        
        this.div = document.getElementById(this.name);
        this.div.setAttribute("style",
            `background-color: orange;
            width: ${this.width}px;
            height: ${this.height}px;
            position: absolute;
            top: ${this.sy}px;
            left: ${this.sx}px;
            z-index: 5;`
        );
        this.div.innerHTML = this.name;  // note to dev: delete this line when image is available
    }

    move(direction) {
        // set speed in x axis, based in commands and phisics
        switch (direction) {
            case 'right':
                this.vx = this.maxSpeedX;
                break;
            case 'left':
                this.vx = -1 * this.maxSpeedX;
                break;
            case 'stop':
                this.vx = 0;
                break;
            default:
                break;
        }
    }

    jump() {
        // sets speed in y axis on jump.
        if (this.vy == 0) {
            this.vy = (-1 * this.maxSpeedY);
            this.jumping = true;
        }
    }

    upgradePos(arr, liquids, spikes, ceilingSpikes) {
        // upgrades character status based on speed and phisics and assigns a new valid position.

        ////////// ENVIRONMENTAL ADJUSTMENTS \\\\\\\\\\

        function applyFluids(leftBorder, rightBorder, topBorder, bottomBorder, vx, vy, hp, liqs) {
            if (liqs.length == 0) {
                return [vx, vy, hp];
            } else {
                for (let i in liqs) {
                    if ((rightBorder > liqs[i].leftBorder) && (leftBorder < liqs[i].rightBorder) && (topBorder < liqs[i].bottomBorder) && (bottomBorder >= liqs[i].topBorder)) {
                        const newVX = vx * liqs[i].velXPenalty;
                        const newVY = vy * liqs[i].velYPenalty;
                        const newHP = Math.max(hp - liqs[i].dps, 0);
                        return [newVX, newVY, newHP];
                    } else if (i == liqs.length - 1) {
                        return [vx, vy, hp];
                    }
                }
            }
        }

        function spikeTraps(leftBorder, rightBorder, topBorder, bottomBorder, hp, spikes) {
            if (spikes.length == 0) {
                return hp;
            } else {
                for (let i in spikes) {
                    if ((rightBorder > spikes[i].leftBorder) && (leftBorder < spikes[i].rightBorder) && (topBorder < spikes[i].bottomBorder) && (bottomBorder >= spikes[i].topBorder)) {
                        if (bottomBorder < spikes[i].bottomBorder) {
                            const newHP = 0;
                            return newHP;
                        } else {
                            return hp;
                        }
                    } else if (i == spikes.length - 1) {
                        return hp;
                    }
                }
            }
        }

        function spikeTrapsCeiling(leftBorder, rightBorder, topBorder, bottomBorder, hp, ceilingSpikes) {
            if (ceilingSpikes.length == 0) {
                return hp;
            } else {
                for (let i in ceilingSpikes) {
                    if ((rightBorder > ceilingSpikes[i].leftBorder) && (leftBorder < ceilingSpikes[i].rightBorder) && (topBorder <= ceilingSpikes[i].bottomBorder) && (bottomBorder > ceilingSpikes[i].topBorder)) {
                        if (bottomBorder > ceilingSpikes[i].bottomBorder) {
                            const newHP = 0;
                            return newHP;
                        } else {
                            return hp;
                        }
                    } else if (i == ceilingSpikes.length - 1) {
                        return hp;
                    }
                }
            }
        }


        [this.vx, this.vy, this.hp] = applyFluids(this.leftBorder, this.rightBorder, this.topBorder, this.bottomBorder, this.vx, this.vy, this.hp, liquids);

        this.hp = spikeTraps(this.leftBorder, this.rightBorder, this.topBorder, this.bottomBorder, this.hp, spikes);
        
        this.hp = spikeTrapsCeiling(this.leftBorder, this.rightBorder, this.topBorder, this.bottomBorder, this.hp, ceilingSpikes);

        ////////// MOVEMENT IN X-AXIS \\\\\\\\\\

        function setsx(sx, vx, vy, width, topBorder, bottomBorder, obstacles) {
            // returns an array with new position in x-axis and speeds

            if ((sx + vx) > (WINDOWWIDTH - width)) {  // beyond right border of playing area. Impacts are inelastic.
                const newX = WINDOWWIDTH - width;
                const newLB = WINDOWWIDTH - width;
                const newRB = WINDOWWIDTH;
                const [newVX, newVY] = [0, 0];
                return [newX, newLB, newRB, newVX, newVY];
            } else if ((sx + vx) < 0) {  // beyond left border of playing area. Impacts are inelastic.
                const newX = 0;
                const newLB = 0;
                const newRB = width;
                const [newVX, newVY] = [0, 0];
                return [newX, newLB, newRB, newVX, newVY];
            } else {  // checking contacts in x-axis. Impacts are inelastic.
                const provLB = sx + vx;
                const provRB = sx + vx + width;
                for (let obs of obstacles) {
                    if ((bottomBorder > obs.topBorder) && (topBorder < obs.bottomBorder)) {  // obstacles at character's height
                        if ((provRB >= obs.leftBorder) && (provLB <= obs.rightBorder)) {  // colission
                            if ((vx > 0.0) && (provLB < obs.leftBorder)) {  // obstacle to right
                                const newX = obs.leftBorder - width;
                                const newLB = obs.leftBorder - width;
                                const newRB = obs.leftBorder;
                                const [newVX, newVY] = [0, 0];
                                return [newX, newLB, newRB, newVX, newVY];
                            }
                            if ((vx < 0.0) && (provRB > obs.rightBorder)) {  // obstacle to left
                                const newX = obs.rightBorder;
                                const newLB = obs.rightBorder;
                                const newRB = obs.rightBorder + width;
                                const [newVX, newVY] = [0, 0];
                                return [newX, newLB, newRB, newVX, newVY];
                            }
                        }
                    }
                }  // no possible obstacle in this point
                const newX = sx + vx;
                const newLB = sx + vx;
                const newRB = sx + vx + width;
                const [newVX, newVY] = [vx, vy];
                return [newX, newLB, newRB, newVX, newVY];
            }
        }


        ////////// MOVEMENT IN Y-AXIS \\\\\\\\\\

        function setsy(sx, leftBorder, rightBorder, vx, vy, sy, ay, jumping, height, obstacles) {
            // returns an array with new position in x-axis and speeds

            function setProvvy(vY, aY, jump) {
                // increase speed in y-axis by gravity
                if (jump) {
                    return (vY + aY);
                } else {
                    return vY;
                }
            }
            const provVy = setProvvy(vy, ay, jumping);  // provissional speed, to test if there could be an impact

            if ((sy + provVy) < 0) {    // beyond top border of playing area
                const newY = 0;
                const newTB = 0;
                const newBB = height;
                const newVY = 0;
                const newJump = true;
                return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
            } else if ((sy + provVy) >= (WINDOWHEIGHT - height)) {    // beyond bottom border of playing area
                const newY = WINDOWHEIGHT - height;
                const newTB = WINDOWHEIGHT - height;
                const newBB = WINDOWHEIGHT;
                const newVY = 0;
                const newJump = false;
                return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
            } else {    // checking contacts in y-axis. Impacts are inelastic.
                const provTB = Math.round(sy + provVy);
                const provBB = Math.round(sy + provVy + height);
                for (let i in obstacles) {
                    if ((rightBorder > obstacles[i].leftBorder) && (leftBorder < obstacles[i].rightBorder) && (provTB < obstacles[i].bottomBorder) && (provBB >= obstacles[i].topBorder)) {  // colission
                        if (provBB > obstacles[i].bottomBorder) {    // colission with obstacle over character
                            const newY = obstacles[i].bottomBorder;
                            const newTB = obstacles[i].bottomBorder;
                            const newBB = obstacles[i].bottomBorder + height;
                            const newVY = 0.0;
                            const newJump = true;
                            return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
                        } else if (provBB < obstacles[i].topBorder) {    // colission with obstacle below the character (change '<' to '<=' to eliminate the next case)
                            const newY = obstacles[i].topBorder - height;
                            const newTB = obstacles[i].topBorder - height;
                            const newBB = obstacles[i].topBorder;
                            const newVY = 0.0;
                            const newJump = false;
                            return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
                        } else {    // walking on something (case not strictly necessary, just for testing)
                            const newY = obstacles[i].topBorder - height;
                            const newTB = obstacles[i].topBorder - height;
                            const newBB = obstacles[i].topBorder;
                            const newVY = 0.0;
                            const newJump = false;
                            return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
                        }
                    } else if ((i == (obstacles.length - 1))) {    // no obstacle at all. Jumping or falling.
                        const newY = sy + provVy;
                        const newTB = sy + provVy;
                        const newBB = sy + provVy + height;
                        const newVY = provVy;
                        const newJump = true;
                        return [sx, newY, vx, newVY, newJump, newTB, newBB, leftBorder, rightBorder];
                    }
                }
            }
        }

        [this.sx, this.sy, this.vx, this.vy, this.jumping, this.topBorder, this.bottomBorder, this.leftBorder, this.rightBorder] = setsy(...setsx(this.sx, this.vx, this.vy, this.width, this.topBorder, this.bottomBorder, arr), this.sy, this.ay, this.jumping, this.height, arr);

        // set the div in the assigned position
        this.div.style.setProperty("left", `${this.sx}px`);
        this.div.style.setProperty("top", `${this.sy}px`);
    }
}

////////// INSTANCES \\\\\\\\\\

const pepe = new Character("pepe", 100, 1.5, 5);
const juan = new Character("juan", 80, 1.6, 5);
const ana = new Character("ana", 80, 1.5, 5.5);
const elena = new Character("elena", 50, 1.7, 5.5);

////////// JS DICTIONARY \\\\\\\\\\

const characters = {
    "1": pepe,
    "2": juan,
    "3": ana,
    "4": elena
};