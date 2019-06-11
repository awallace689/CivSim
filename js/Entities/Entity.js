"use strict";
/****************************************************************
 * Author: Adam Wallace
 * Date: 5/21/2019
 * Desc: Includes classes for Entities, objects with position
         and radius, and the EntityTester that tests Entities' 
         present or reqeuested state.
 ****************************************************************/

 /** 
  * Entities represent anything that require a position and radius
  * on the pixel grid, visible or not.
  *
  * @abstract
  */
class Entity {
    /** 
     * Create entity with pos (x, y) and radius.
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} rad 
     */
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    /** 
     * Remove entity from Gaia.entitySet, and
     * remove reference to Gaia from spawning.
     * 
     *  @returns undefined
     */
    die() {
        if(this.hasOwnProperty('gaia')) {
            this.gaia.entitySet.delete(this);
            this.gaia = undefined;
        }
    }
}


/** 
 * VisiblesEntities subclass Entity and also have a
 * rendering context and color so that it can draw
 * itself using its 'draw' method. 'Shape' property should 
 * be defined before attempting to draw.
 *  
 * @abstract
 */
class VisibleEntity extends Entity {
    /** Create VisibleEntity with color and undefined
     *  shape for drawing.
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} xpos 
     * @param {Number} ypos 
     * @param {Number} radius 
     * @param {Number} r [0-255]
     * @param {Number} g [0-255]
     * @param {Number} b [0-255]
     */
    constructor(context, xpos, ypos, radius, r, g, b, Shape) {
        super(xpos, ypos, radius);
        this.context = context;
        this.color = {'r':r, 'g':g, 'b':b};
        this.shape = new Shape(this);
    }

    /** VisibleEntities delegate draw requests to their shape
     *  property. This should be defined and used in a
     *  subclass.
     *  
     *  @abstract
     *  @returns undefined
     */ 
    draw() {
        this.shape.draw();
    }
}

/** EntityTester will run a pre-determined or custom set of tests
 *  on a given entity, sometimes referencing Gaia's entitySet.
 * 
 */
class EntityTester {
    /** Define reference to Gaia.entitySet
     * 
     * @param {Gaia} gaia 
     */
    constructor(gaia) {
        this.entitySet = gaia.entitySet;
    }
    
    /** 
     * Passes if radius of object at (x, y) does not collide with 
     * any other existing entities' radii.
     *
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius
     * @returns Bool
     */
    testWillNotCollideWithExisting(x, y, radius) {
        for (let i = 0; i < this.entitySet.size; i++) {
            let arrayFromSet = Array.from(this.entitySet);
            let seperation = Math.sqrt((arrayFromSet[i].x - x) * (arrayFromSet[i].x - x)
                + (arrayFromSet[i].y - y) * (arrayFromSet[i].y - y));
            if (seperation < (radius + arrayFromSet[i].rad)) {
                return false;
            }
        }
        return true;
    }

    /** 
     * Passes if entity is not within 75px of canvas edge.
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius
     * @returns Bool
     */
    testWillEntityBeInBounds(x, y, radius) {
        if (
            x - (radius + 75) >= 0 &&
            x + (radius + 75) < WIDTH &&
            y - (radius + 75) >= 0 &&
            y + (radius + 75) < HEIGHT
        ) {
            return true;
        }
        return false;
    }

    /**
     * Passes if distance between edge of entity and all others in px
     * is <= 'min'.
     *
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     * @param {Number} min 
     * @returns bool
     */
    testMinDistanceBetweenAny(x, y, radius, min) {
        for (let i = 0; i < this.entitySet.size; i++) {
            let arrayFromSet = Array.from(this.entitySet);
            let seperation = Math.sqrt((arrayFromSet[i].x - x) * (arrayFromSet[i].x - x)
                + (arrayFromSet[i].y - y) * (arrayFromSet[i].y - y));
            if (seperation - (radius + arrayFromSet[i].rad) < min) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Passes if distance in px between edges of two entities is greater
     * than 'min'.
     * 
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} r1 
     * @param {Number} x2 
     * @param {Number} y2 
     * @param {Number} r2 
     * @param {Number} min 
     * @returns Bool
     */
    testMinDistanceBetweenTwo(x1, y1, r1, x2, y2, r2, min) {
        if (Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) ) 
            - (r1 + r2) >= min) {
                return false;
        }
        return true;
    }

    /**
     * Passes if distance between two objects in px is <= 'max'.
     *
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} r1 
     * @param {Number} x2 
     * @param {Number} y2 
     * @param {Number} r2 
     * @param {Number} max 
     * @returns Bool
     */
    testMaxDistanceBetweenTwo(x1, y1, r1, x2, y2, r2, max) {
        if (Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) ) 
            - (r1 + r2) >= max) {
                return false;
        }
        return true;
    }

    /**
     * Run any tests passed in, logging the first test failed and returning false,
     * else returning true if all pass.
     * 
     * @param  {...Function: bool} tests tests to run, with parameters.
     * @returns Bool
     */
    runTests(tests) {
        for(let i = 0; i < tests.length; i++) {
            if(!tests[i]) {
                console.log(`Failed test ${i}!`);
                return false;
            }
        }
        return true;
    }
}