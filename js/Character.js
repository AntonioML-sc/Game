
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
    sx = 50;
    sy = 590;
    vx = 0.0;
    vy = 0.0;
    ax = 0.0;
    ay = 0.1;
    img = '';
    topBorder;
    bottomBorder;
    leftBorder;
    rightBorder;
    fatherDiv = '';
    div;
    jumping = false;

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, sx, sy, fatherDiv) {
        this.name = name;
        this.sx = sx;
        this.sy = sy;
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.bottomBorder = this.sx + this.width;
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

    setVx(direction) {
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

    upgradePos() {
        // calculate the new position based on speed and assign a new valid position
        // movement in x-axis
        this.sx += this.vx;
        if (this.sx < 0) {
            this.sx = 0;
        }
        if (this.sx > WINDOWWIDTH - this.width) {
            this.sx = WINDOWWIDTH - this.width;
        }


        // movement in y-axis

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
        this.bottomBorder = this.sx + this.width;

        // set the div in the assigned position
        this.div.style.setProperty("left", `${pepe.sx}px`);
        this.div.style.setProperty("top", `${pepe.sy}px`);
    }

}