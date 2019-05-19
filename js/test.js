"use strict";
/*****************************
 * Author: Adam Wallace
 * Date: 5/18/2019
 *****************************/
let WIDTH = 600;
let HEIGHT = 600;


window.onload = () => {
    main();
}


/// Returns game canvas rendering object.
/// 
/// @return: CanvasRenderingContext2D
function getContext() {
    let canvas = document.getElementById('game');
    let context = canvas.getContext('2d');
    return context;
}


function main() {
    let c = getContext();
    let rad = 50;
    c.canvas.width = WIDTH;
    c.canvas.height = HEIGHT;
    console.log(c);
    drawRandomCircle(c, rad);
    
}


/// Draw circle at position ('x', 'y'), with radius 'rad'.
/// 
/// @param context {CanvasRenderingContext2D}: Canvas render context
/// @param x {Number}: x-pos
/// @param y {Number}: y-pos
/// @param rad {Number}: radius
/// @param color {}
/// @return: undefined
function drawCircle(context, x, y, rad, color) {
    context.clearRect(0,0,WIDTH-1,HEIGHT-1);
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, rad, 0, 2*Math.PI);
    context.fillStyle = color ? color : 'black';
    context.fill();
}

function drawRandomCircle(context, radius) {
    drawCircle(context, 
        Math.floor(Math.random() * ((WIDTH-radius)-radius) + radius),
        Math.floor(Math.random() * ((HEIGHT-radius)-radius) + radius), 
        radius, 
        `rgb(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)})`);
}
