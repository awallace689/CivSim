"use strict";
/****************************************************************
 * Author: Adam Wallace
 * Date: 5/21/2019
 * Desc: A city, with shape Circle, spawns members within its 
         radius.
 ****************************************************************/

/** Define Constants for External Reference */
const CITY_RADIUS = 25;
const CITY_SPAWN_SEPERATION = 100;

/** 
 * City extending VisibleEntity can draw itself,
 * and updateShape if that becomes necessary. Will
 * be able to spawn member entities.
 */
class City extends VisibleEntity {
    /** 
     * Populates City and its Shape delegate with
     * radius of 'CITY_RADIUS' spawning a mininum
     * of 'CITY_SPAWN_SEPERATION' pixels away from
     * other cities.
     *
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} xpos 
     * @param {Number} ypos 
     * @param {Number} r [0-255] 
     * @param {Number} b [0-255]
     * @param {Number} g [0-255] 
     */
    constructor(context, xpos, ypos, r, g, b) {
        super(context, xpos, ypos, CITY_RADIUS, r, g, b);
        this.shape = new Circle(this);
    }

    /** 
     * VisibleEntities refer draw requests to their 
     * delegate 'shape' property.
     *
     * @returns undefined
     */
    draw() {
        this.shape.draw();
    }

    /** 
     * If Circle does not react to changes in City
     * property values, this method will be used to
     * update City.
     *
     * @returns undefined
     */
    updateShape() {
        this.shape = new Circle(this);
    }
}