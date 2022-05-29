
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

    constructor(name, sx, sy, fatherDiv) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.render();
    }

    ///////////////////////////////  METHODS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        // creates a div in this.fatherDiv that represents the character
        let make = document.createElement('div');
        make.setAttribute("id", this.name);
        document.getElementById(this.fatherDiv).appendChild(make);

        // set styles to the charachter        
        this.div = document.getElementById(this.name);
        this.div.setAttribute("style", `background-color: orange; width: ${this.width}px; height: ${this.height}px; position: absolute; top: ${this.sy}px; left: ${this.sx}px; z-index: 5;`);
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
        // set speed in y axis on jump, based in commands and phisics
        if (this.vy == 0) {
            this.vy = (-1 * this.maxSpeedY);
            this.jumping = true;
        }
    }

    upgradePos(arr) {
        // calculate the new position based on speed and assign a new valid position

        ////////// MOVEMENT IN X-AXIS \\\\\\\\\\
        this.sx += this.vx;

        // avoid character go beyond left and right borders of the gaming area
        if (this.sx < 0) {
            this.sx = 0;
        }
        if (this.sx > WINDOWWIDTH - this.width) {
            this.sx = WINDOWWIDTH - this.width;
        }

        // checking contacts in x-axis
        for (let obs of arr) {
            // console.log("pepe rightBorder: " + this.rightBorder + ", wall leftborder: " + obs.leftBorder);
            // console.log("Pepe borders: top: " + this.topBorder + " bottom: " + this.bottomBorder + ", Wall borders: top: " + obs.topBorder + " bottom: " + obs.bottomBorder);

            if ((this.bottomBorder > obs.topBorder) && (this.topBorder < obs.bottomBorder)) {

                if ((this.rightBorder > obs.leftBorder) && (this.leftBorder < obs.rightBorder)) {  // colission
                    if ((this.vx > 0.0) && (this.leftBorder < obs.leftBorder)) {  // obstacle to right
                        this.sx = obs.leftBorder - this.width;
                    }
                    if ((this.vx < 0.0) && (this.rightBorder > obs.rightBorder)) {  // obstacle to left
                        this.sx = obs.rightBorder;
                    }
                    [this.vx, this.vy] = [0.0, 0.0];                    
                }
            }

        }


        ////////// MOVEMENT IN Y-AXIS \\\\\\\\\\

        if (this.jumping) {
            this.vy += this.ay;
        }        

        this.sy += this.vy;
        if (this.sy < 0) {
            this.sy = 0;
        }
        if (this.sy > WINDOWHEIGHT - this.height) {
            this.sy = WINDOWHEIGHT - this.height;
        }

        if ((this.jumping) && (this.sy == WINDOWHEIGHT - this.height)) {
            this.vy = 0.0;
            this.jumping = false;
        }

        // upgrade borders positions
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;

        // set the div in the assigned position
        this.div.style.setProperty("left", `${pepe.sx}px`);
        this.div.style.setProperty("top", `${pepe.sy}px`);
    }

}