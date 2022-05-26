
class Character {
    ///////////////////////////////  CLASS ATTRIBUTES  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    name = '';
    hp = 100;
    maxSpeed = 0;
    height = 40;
    width = 25;
    sx = 50;
    sy = 590;
    vx = 0;
    vy = 0;
    ax = 0;
    ay = 0;
    img = '';
    topBorder;
    bottomBorder;
    leftBorder;
    rightBorder;
    fatherDiv = '';

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
        let myself = document.getElementById(this.name);
        myself.setAttribute("style", `background-color: orange; width: ${this.width}px; height: ${this.height}px; position: absolute; top: ${this.sy}px; left: ${this.sx}px; z-index: 5;`);
    }

}