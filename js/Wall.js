
class Wall {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    height = 60.0;  // sixe in px
    width = 60.0;
    sx = 300;       // insertion coordinates
    sy = 570;
    topBorder;      // borders position for contacts
    bottomBorder;
    leftBorder;
    rightBorder;
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
        borderColor, borderTopSize, borderBottomSize, borderLeftSize, borderRightSize) {
        this.name = name;
        this.sx = sx;
        this.sy = sy;
        this.width = width;
        this.height = height;
        this.topBorder = this.sy;
        this.bottomBorder = this.sy + this.height;
        this.leftBorder = this.sx;
        this.bottomBorder = this.sx + this.width;
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