
class Fluid {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 0;         // sixe in px
    width = 0;
    sx = 0;             // insertion coordinates
    sy = 0;
    topBorder = 0;      // borders position for contacts
    bottomBorder = 0;
    leftBorder = 0;
    rightBorder = 0;
    fatherDiv = '';     // insertion div
    div;                // div that will be created on rendering

    // penalties for characters inside
    dps = 0;             // damage per unit of time (10ms)
    velXPenalty = 0.5;   // penalty to speed in x-axis
    velYPenalty = 0.8;   // penalty to speed in y-axis

    // render settings
    img = '';
    topColor = 'aqua';
    bottomColor = 'aqua';
    zIndex = 3;
    opacity = 0.5;
    
    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, width, height, topColor, bottomColor, opacity, dps, velXPenalty, velYPenalty) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.width = Number(width);
        this.height = Number(height);
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.topColor = topColor;
        this.bottomColor = bottomColor;
        this.opacity = opacity;
        this.dps = dps;
        this.velXPenalty = velXPenalty;
        this.velYPenalty = velYPenalty;
        this.render();
    }

    ///////////////////////////////  METHODS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        // creates a div in this.fatherDiv that represents the wall
        let make = document.createElement('div');
        make.setAttribute("id", this.name);
        document.getElementById(this.fatherDiv).appendChild(make);

        // set css styles to the wall        
        this.div = document.getElementById(this.name);
        this.div.setAttribute("style",
            `background: linear-gradient(${this.topColor}, ${this.bottomColor});
            opacity: ${this.opacity};
            width: ${this.width}px;
            height: ${this.height}px;
            position: absolute;
            top: ${this.sy}px;
            left: ${this.sx}px;
            z-index: 6;`
        );
    }
}