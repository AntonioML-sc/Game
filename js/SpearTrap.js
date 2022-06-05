
class SpearTrap {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 60;         // sixe in px
    width = 7;
    sx = 0;             // insertion coordinates
    sy = 0;    
    initialSy = 0;
    topBorder = 0;      // borders position for contacts
    bottomBorder = 0;
    leftBorder = 0;
    rightBorder = 0;
    poleLength = 50;
    pointLength = 10;
    fatherDiv = '';     // insertion div
    div;                // div that will be created on rendering

    // penalties for characters inside
    dps = 1000;             // mortal damage

    // render settings
    zIndex = 3;
    bgColor = 'silver';
    timeGap = 0;   // to delay the trap (0 - 199)

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, bgColor, zIndex, timeGap = 0.0) {
        this.name = name;
        this.sx = Number(sx);
        this.sy = Number(sy);
        this.initialSy = Number(sy);
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.rightBorder = this.sx + this.width;
        this.fatherDiv = fatherDiv;
        this.zIndex = zIndex;
        this.bgColor = bgColor;
        this.timeGap = timeGap;
        this.render();
    }

    ///////////////////////////////  METHODS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    render() {
        // create divs in this.fatherDiv that represents the spear
        let make = document.createElement('div');
        make.setAttribute("id", this.name);
        document.getElementById(this.fatherDiv).appendChild(make);

        let makePoint = document.createElement('div');
        let makePole = document.createElement('div');
        makePoint.setAttribute("id", this.name + 'Point');
        makePole.setAttribute("id", this.name + 'Pole');

        document.getElementById(this.name).appendChild(makePoint);
        document.getElementById(this.name).appendChild(makePole);

        let point = document.getElementById(this.name + 'Point');
        let pole = document.getElementById(this.name + 'Pole');

        // set css styles to the spear        
        this.div = document.getElementById(this.name);
        this.div.setAttribute("style",
            `width: ${this.width}px;
            height: ${this.height}px;
            position: absolute;
            top: ${this.sy}px;
            left: ${this.sx}px;
            z-index: ${this.zIndex};
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;`
        );

        point.setAttribute("style",
            `background-color: ${this.bgColor};
        width: ${this.width}px;
        height: ${this.pointLength}px;
        clip-path: polygon(0 100%, 50% 0, 100% 100%);`
        );

        pole.setAttribute("style",
            `background-color: ${this.bgColor};
        width: 3px;
        height: ${this.poleLength}px;`
        );
    }

    updatePos(time) {
        let timing = (time + this.timeGap) % 200;
        if (timing == 0) {
            this.poleLength = 50;
            this.height = 60;
            this.sy = this.initialSy;
            this.topBorder = this.initialSy;
        } else {
            this.poleLength = 50 - (timing * 50 / 200);
            this.height = 60 - (timing * 50 / 200);
            this.sy = this.initialSy + (timing * 50 / 200);
            this.topBorder = this.initialSy + (timing * 50 / 200);
        }
        
        // set the divs height
        this.div.style.setProperty("top", `${this.sy}px`);
        this.div.style.setProperty("height", `${this.height}px`);        
        document.getElementById(this.name + 'Pole').style.setProperty("height", `${this.poleLength}px`);
    }
}