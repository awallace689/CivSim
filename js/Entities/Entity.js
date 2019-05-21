class Entity {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    die() {
        if(this.hasOwnProperty('gaia')) {
            this.gaia.entitySet.delete(this);
            this.gaia = undefined;
        }
    }
}

class VisibleEntity extends Entity {
    constructor(context, xpos, ypos, radius, r, g, b) {
        super(xpos, ypos, radius);
        this.context = context;
        this.color = {'r':r, 'g':g, 'b':b};
        this.shape = undefined;
    }

    draw() {
        this.shape.draw();
    }
}


class EntityTester {
    constructor(gaia) {
        this.entitySet = gaia.entitySet;
    }
    
    testWillNotCollideWithExisting(x, y, radius) {
        let failed = false;
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
    
    testMinDistanceBetweenTwo(x1, y1, r1, x2, y2, r2, min) {
        if (Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) ) 
            - (r1 + r2) >= min) {
                return false;
        }
        return true;
    }

    testMaxDistanceBetweenTwo(x1, y1, r1, x2, y2, r2, max) {
        if (Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) ) 
            - (r1 + r2) <= max) {
                return false;
        }
        return true;
    }

    runTests(...tests) {
        for(let i = 0; i < tests.length; i++) {
            if(!tests[i]) {
                console.log(`Failed test ${i}!`);
                return false;
            }
        }
        return true;
    }
}