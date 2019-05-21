"use strict";
/****************************************************************
 * Author: Adam Wallace
 * Date: 5/18/2019
 * Desc: A collection of concepts for my civilization simulator.
 ****************************************************************/


let WIDTH = 600;
let HEIGHT = 600;


window.onload = () => {
    main();
}


/** Returns game canvas rendering object.
* 
* @returns CanvasRenderingContext2D
*/
function getContext() {
    let canvas = document.getElementById('game');
    let context = canvas.getContext('2d');
    return context;
}


function initCanvas(c) {
    c.canvas.width = WIDTH;
    c.canvas.height = HEIGHT;
}


function clearCanvas(context) {
    context.clearRect(0, 0, WIDTH - 1, HEIGHT - 1);
}


function main() {
    // Initialize canvas.
    let c = getContext();
    initCanvas(c);
    console.log(c);

    // Initialize Entity manager
    let g = new Gaia();


    // Draw a 'n' random cities.
    let rc;
    for(let i = 0; i < 10; i++){
        rc = getRandomCircleInfo();
        g.spawn(new City(c, rc['x'], rc['y'], rc['r'], rc['g'], rc['b']));
    }
    // clearCanvas(c);
    drawVisibleEntities(c, g);
    console.log(g.entitySet);
}

/** Draw all VisibleEntities, defined by a 'draw' method.
 * 
 * @param {Gaia} gaia 
 */
function drawVisibleEntities(c, gaia) { // TODO: Decouple from 

    gaia.entitySet.forEach((entity) => {
        entity.gaia = gaia;
        if(typeof entity.draw === 'function'){
            entity.draw();
        }
    });
}
