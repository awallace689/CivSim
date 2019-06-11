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
    for (let i = 0; i < 4; i++) {
        rc = getRandomCircleInfo();
        g.spawnSingle(
            new VisibleEntity(
                c,
                rc['x'],
                rc['y'],
                rc['rad'],
                rc['r'],
                rc['g'],
                rc['b'],
                Circle
            ));
    }
    // clearCanvas(c);
    drawVisibleEntities(g);
    console.log(g.entitySet);
}

/** Draw all VisibleEntities, defined by a 'draw' method.
 * 
 * @param {Gaia} gaia 
 */
function drawVisibleEntities(gaia) {

    gaia.entitySet.forEach((entity) => {
        entity.gaia = gaia;
        if (typeof entity.draw === 'function') {
            entity.draw();
        }
    });
}
