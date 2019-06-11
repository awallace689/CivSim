/**
 * Shapes define a draw method, which uses canvas to draw
 * themselves according to their Entity's properties.
 */
class Shape {
    constructor() {

    }

    /**
     * Shapes are delegates for entities with instructions
     * for drawing themselves based on entity values.
     *
     * @abstract
     */
    draw() {
        throw Error();
    }
}

/**
 * Circle 'draws' a circle with drawCircle according to its
 * entity's properties.
 *
 * @param {VisibleEntity} entity this Circle is a delegate of this
 */
class Circle extends Shape {
    constructor(entity) {
        super();
        this.entity = entity;
    }

    /** 
    * Draw circle at position ('x', 'y'), with radius 'rad'.
    * 
    * @param {CanvasRenderingContext2D} context canvas render context
    * @param {Number} x x-pos
    * @param {Number} y y-pos
    * @param {Number} rad radius
    * @param {} color rgb object ex. {'r': 255, 'g': 255, 'b': 255} 
    * @return: undefined
    */
    drawCircle(context) {
        context.beginPath();
        context.moveTo(this.entity.x, this.entity.y);
        context.arc(this.entity.x, this.entity.y, this.entity.rad, 0, 2 * Math.PI);
        context.fillStyle = this.entity.color
            ? `rgb(${this.entity.color['r']},
                ${this.entity.color['g']},
                ${this.entity.color['b']})`
            : 'black';
        context.fill();
    }

    /**
     * Calls drawCircle.
     *
     * @returns undefined
     */
    draw() {
        this.drawCircle(this.entity.context);
    }

    getPointOnRadiusAtAngle(angle) {

    }
}


/**
 * @returns object ex. {
 *                      'r': {Number}
 *                      'g': {Number}
 *                      'b': {Number}
 *                      'rad': {Number}
 *                      'x': {Number}
 *                      'y': {Number}
 *                     }
 */
function getRandomCircleInfo() {
    let rad = CITY_RADIUS; 
    return {
        'r': Math.floor(Math.random() * 256),
        'g': Math.floor(Math.random() * 256),
        'b': Math.floor(Math.random() * 256),
        'rad': rad,
        'x': Math.floor(Math.random() * ((WIDTH - BORDER_INSET) - (CITY_RADIUS + BORDER_INSET)) + (CITY_RADIUS + BORDER_INSET)),
        'y': Math.floor(Math.random() * ((HEIGHT - BORDER_INSET) - (CITY_RADIUS + BORDER_INSET)) + (CITY_RADIUS + BORDER_INSET)),
    };
}