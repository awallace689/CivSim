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