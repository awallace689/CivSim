class Shape {
    constructor() {

    }

    draw() {
        throw Error();
    }
}

/**
 * @param {VisibleEntity} entity entity circle is delegate of
 */
class Circle extends Shape {
    constructor(entity) {
        super();
        this.entity = entity;
    }

    /** Draw circle at position ('x', 'y'), with radius 'rad'.
    * 
    * @param {CanvasRenderingContext2D} context canvas render context
    * @param {Number} x x-pos
    * @param {Number} y y-pos
    * @param {Number} rad radius
    * @param {} color rgb object ex. {r: 255, g: 255, b: 255} 
    * @return: undefined
    */
    drawCircle(context) {
        context.beginPath();
        context.moveTo(this.entity.x, this.entity.y);
        context.arc(this.entity.x, this.entity.y, this.entity.rad, 0, 2 * Math.PI);
        context.fillStyle = this.entity.color ? `rgb(${this.entity.color['r']},
            ${this.entity.color['g']},
            ${this.entity.color['b']})` : 'black';
        context.fill();
    }

    draw() {
        this.drawCircle(this.entity.context);
    }

    getPointOnRadiusAtAngle(angle) { 
        
    }
}


function getRandomCircleInfo() {
    let rad = Math.floor(Math.random() * 200);
    return {
        'r': Math.floor(Math.random() * 256),
        'g': Math.floor(Math.random() * 256),
        'b': Math.floor(Math.random() * 256),
        'rad': rad,
        'x': Math.floor(Math.random() * ((WIDTH - rad) - rad) + rad),
        'y': Math.floor(Math.random() * ((HEIGHT - rad) - rad) + rad),
    }
}