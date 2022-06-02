
class SpikeTrapCeiling {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 20;         // sixe in px
    width = 20;
    sx = 0;             // insertion coordinates
    sy = 0;
    topBorder = 0;      // borders position for contacts
    bottomBorder = 0;
    leftBorder = 0;
    rightBorder = 0;
    fatherDiv = '';     // insertion div
    div;                // div that will be created on rendering

    // penalties for characters inside
    dps = 1000;             // mortal damage

    // render settings
    zIndex = 3;
    bgColor = 'silver';
    
    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, bgColor, zIndex) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.zIndex = zIndex;
        this.bgColor = bgColor;
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
            `background-color: ${this.bgColor};
            width: ${this.width}px;
            height: ${this.height}px;
            position: absolute;
            top: ${this.sy}px;
            left: ${this.sx}px;
            z-index: ${this.zIndex};
            clip-path: polygon(0 0, 10% 0, 25% 100%, 40% 0, 60% 0, 75% 100%, 90% 0, 100% 0);`
        );
    }
}