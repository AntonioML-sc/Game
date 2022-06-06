
class Wall {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 60.0;  // sixe in px
    width = 60.0;
    sx = 300.0;       // insertion coordinates
    sy = 570.0;
    topBorder = 570.0;      // borders position for contacts
    bottomBorder = 630.0;
    leftBorder = 300.0;
    rightBorder = 360.0;
    fatherDiv = ''; // insertion div
    div;            // div that will be created on rendering

    // render settings
    img = '';
    bgColor = '';
    borderRadiusLT = 0;
    borderRadiusRT = 0;
    borderRadiusLB = 0;
    borderRadiusRB = 0;
    borderColor = '';
    borderTopSize = 0;
    borderBottomSize = 0;
    borderLeftSize = 0;
    borderRightSize = 0;
    zIndex = 2;

    ///////////////////////////////  CONSTRUCTOR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    constructor(name, fatherDiv, sx, sy, width, height, bgColor, zIndex, brLT, brRT, brLB, brRB,
        borderColor, borderTopSize, borderBottomSize, borderLeftSize, borderRightSize, img = '') {
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
        this.zIndex = zIndex;
        this.bgColor = bgColor;
        this.borderRadiusLT = brLT;
        this.borderRadiusRT = brRT;
        this.borderRadiusLB = brLB;
        this.borderRadiusRB = brRB;
        this.borderColor = borderColor;
        this.borderTopSize = borderTopSize;
        this.borderBottomSize = borderBottomSize;
        this.borderLeftSize = borderLeftSize;
        this.borderRightSize = borderRightSize;
        this.img = img;
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
            background-image: url('${this.img}');
            width: ${this.width}px; 
            height: ${this.height}px;
            position: absolute; 
            top: ${this.sy}px; 
            left: ${this.sx}px; 
            z-index: ${this.zIndex}; 
            border-color: ${this.borderColor};
            box-sizing: border-box;
            border-top: ${this.borderTopSize}px solid ${this.borderColor}; 
            border-bottom: ${this.borderBottomSize}px solid ${this.borderColor};
            border-left: ${this.borderLeftSize}px solid ${this.borderColor};
            border-right: ${this.borderRightSize}px solid ${this.borderColor}; 
            border-top-left-radius: ${this.borderRadiusLT}px;
            border-top-right-radius: ${this.borderRadiusRT}px; 
            border-bottom-left-radius: ${this.borderRadiusLB}px;
            border-bottom-right-radius: ${this.borderRadiusRB}px;`);
    }
}

// background-image: url('../img/stoneWall.jpg');