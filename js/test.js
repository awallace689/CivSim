"use strict";
/****************************************************************
 * Author: Adam Wallace
 * Date: 5/18/2019
 * Desc: A collection of concepts for my civilization simulator.
 ****************************************************************/


let WIDTH = 600;
let HEIGHT = 600;


class Gaia {
    constructor(context) {
        this.context = context;
        this.entitySet = new Set();
    }

    willEntitiesCollideWithNew(x, y, radius) {
        for(entity in this.entitySet) {
            let seperation = Math.sqrt((entity.x - x) * (entity.y - y));
            if(seperation < (radius + entity.rad)){
                return false;
            }
        }
        return true;
    }

    willEntityBeInBounds(x, y, radius) {
        if(x - radius >= 0 &&
            x + radius < WIDTH &&
            y - radius >= 0 &&
            y + radius < HEIGHT) {
                return true;
            }
        return false;
    }

    passesSpawnTests(x, y, radius) {
        if(this.willEntitiesCollideWithNew(x, y, radius) &&
            this.willEntityBeInBounds(x, y, radius)) {
            return true;
        }
        return false;
    }

    spawn(entity) {
        if(this.passesSpawnTests(entity.x, entity.y, entity.rad)){
            this.entitySet.add(entity);
        }
    }
}


class Entity {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }
}


class PixelGrid {
    constructor(rgbaArray) {
        let i = 0;
        let j = 0;
        let newPixelList = [[]];
        while (i < rgbaArray.length) {
            if (i % 600 == 0 && i != 0) {
                newPixelList.push([])
                j++;
            }
            let r = rgbaArray[i];
            let g = rgbaArray[i + 1];
            let b = rgbaArray[i + 2];
            let a = rgbaArray[i + 3];
            let newPixel = new Pixel(r, g, b, a);
            newPixelList[j].push(newPixel);
            i += 4;
        }
        this.data = newPixelGrid;
    }
}


class Pixel {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}


class Circle extends Entity {
    constructor(context, x, y, rad, r = 255, g = 255, b = 255) {
        super(x, y, rad);
        this.context = context;
        this.color = { 'r': r, 'g': g, 'b': b };
    }

    draw() {
        drawCircle(this.context, this.x, this.y, this.rad,
            `rgb(${this.color['r']},${this.color['g']},${this.color['b']})`);
    }
}


window.onload = () => {
    main();
}


function main() {
    // Initialize canvas.
    let c = getContext();
    initCanvas(c);
    console.log(c);

    let g = new Gaia(c);


    // Draw a random circle.
    let rc;
    for(let i = 0; i < 10; i++){
        rc = getRandomCircleInfo();
        g.spawn(new Circle(c, rc['x'], rc['y'], 25, rc['r'], rc['g'], rc['b']));
    }
    console.log(g.entitySet)
    drawEntities(g);
}


function drawEntities(gaia){
    gaia.entitySet.forEach((entity) => entity.draw());
}


function initCanvas(c) {
    c.canvas.width = WIDTH;
    c.canvas.height = HEIGHT;
}


/// Returns game canvas rendering object.
/// 
/// @return: CanvasRenderingContext2D
function getContext() {
    let canvas = document.getElementById('game');
    let context = canvas.getContext('2d');
    return context;
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


/// Draw circle at position ('x', 'y'), with radius 'rad'.
/// 
/// @param context {CanvasRenderingContext2D}: Canvas render context
/// @param x {Number}: x-pos
/// @param y {Number}: y-pos
/// @param rad {Number}: radius
/// @param color {}
/// @return: undefined
function drawCircle(context, x, y, rad, color) {
    context.clearRect(0, 0, WIDTH - 1, HEIGHT - 1);
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, rad, 0, 2 * Math.PI);
    context.fillStyle = color ? color : 'black';
    context.fill();
}
