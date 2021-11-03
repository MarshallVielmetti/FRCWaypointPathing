class Waypoint{
    x;
    y;
    vx;
    vy;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    display = () => {
        stroke('orange');
        fill('orange');
        ellipse(this.x, this.y, 15, 15);
        stroke('red')
        strokeWeight(4)
        line(this.x - this.vx, this.y - this.vy, this.x, this.y)
        stroke('blue')
        line(this.x, this.y, this.x + this.vx, this.y + this.vy)
    }
}