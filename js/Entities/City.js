const CITY_RADIUS = 25;
const CITY_SPAWN_SEPERATION = 100;
class City extends VisibleEntity {
    constructor(context, xpos, ypos, r, g, b) {
        super(context, xpos, ypos, CITY_RADIUS, r, g, b);
        this.shape = new Circle(this);
    }

    draw() {
        this.shape.draw();
    }

    updateShape() {
        this.shape = new Circle(this);
    }
}