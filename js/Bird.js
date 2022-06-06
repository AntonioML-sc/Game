
class Bird {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 40;         // sixe in px
    width = 70;
    sx = 0;             // insertion coordinates
    sy = 0;
    initialSx = 0;
    initialSy = 0;
    pathLength = 0;     // legth of the path
    pathHeight = 0;     // height of the path
    vx = 1.0;
    topBorder = 0;      // borders position for contacts
    bottomBorder = 0;
    leftBorder = 0;
    rightBorder = 0;
    fatherDiv = '';     // insertion div
    div;                // div that will be created on rendering

    // penalties for characters inside

    // render settings
    zIndex = 3;
    bgColor = 'red';
    img = '';

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, vx, pathLength, pathHeight, zIndex) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.vx = Number(vx);
        this.initialSx =  Number(sx);
        this.initialSy = Number(sy);        
        this.pathLength = pathLength;
        this.pathHeight = pathHeight;
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.zIndex = zIndex;
        this.render();
    }

    ///////////////////////////////  METHODS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        // create divs in this.fatherDiv that represents the rock
        let make = document.createElement('div');
        make.setAttribute("id", this.name);
        document.getElementById(this.fatherDiv).appendChild(make);

        // set css styles to the rock        
        this.div = document.getElementById(this.name);
        this.div.setAttribute("style",
            `width: ${this.width}px;
            height: ${this.height}px;
            position: absolute;
            top: ${this.sy}px;
            left: ${this.sx}px;
            z-index: ${this.zIndex};
            transform: scaleX(-1);
            background-image: url('../img/EagleSM.png');
            background-size: ${this.width}px ${this.height}px;`
        );
    }

    updatePos(time) {
        if ((this.sx > (this.initialSx + this.pathLength - this.width)) || (this.sx < this.initialSx)) {
            this.vx = (-1 * this.vx);
        }
        this.sx += this.vx;
        this.leftBorder += this.vx;
        this.rightBorder += this.vx;

        let inc = (this.initialSy + (Math.sin((this.sx - this.initialSx) * Math.PI / 100)) * (this.pathHeight / 2));

        this.sy = inc;
        this.topBorder = inc;
        this.bottomBorder = inc + this.height;

        if (this.vx > 0) {            
            this.div.style.setProperty("transform", `scaleX(-1)`);
        } else {
            this.div.style.setProperty("transform", `none`);
        }

        // set the divs position
        this.div.style.setProperty("left", `${this.sx}px`);
        this.div.style.setProperty("top", `${this.sy}px`);
    }
}