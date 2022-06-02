
class RollingRock {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 50;         // sixe in px
    width = 50;
    sx = 0;             // insertion coordinates
    sy = 0;
    initialSx = 0;
    pathLength = 0;     // legth of the path
    vx = 2.0;
    topBorder = 0;      // borders position for contacts
    bottomBorder = 0;
    leftBorder = 0;
    rightBorder = 0;
    fatherDiv = '';     // insertion div
    div;                // div that will be created on rendering

    // penalties for characters inside
    dps = 1000;             // mortal damage
    velXPenalty = 1;   // penalty to speed in x-axis
    velYPenalty = 1;   // penalty to speed in y-axis

    // render settings
    zIndex = 3;
    bgColorCenter = 'silver';
    bgColorExt = 'silver';
    borderSize = 0;
    borderColor = '';

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, vx, pathLength, bgColorCenter, bgColorExt, borderSize, borderColor, zIndex) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.vx = Number(vx);
        this.initialSx =  Number(sx);
        this.pathLength = pathLength;
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.zIndex = zIndex;
        this.bgColorCenter = bgColorCenter;
        this.bgColorExt = bgColorExt;
        this.borderSize = borderSize;
        this.borderColor = borderColor;
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
            border-radius: 50%;
            background: radial-gradient(at 40% 40%, ${this.bgColorCenter}, ${this.bgColorExt});
            border: ${this.borderSize}px solid ${this.borderColor};
            box-sizing: border-box;`
        );

    }

    upgradePos(time) {
        if ((this.sx > (this.initialSx + this.pathLength - this.width)) || (this.sx < this.initialSx)) {
            this.vx = (-1 * this.vx);
        }
        this.sx += this.vx;
        this.leftBorder += this.vx;
        this.rightBorder += this.vx;

        // set the divs position
        this.div.style.setProperty("left", `${this.sx}px`);
    }
}