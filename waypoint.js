function Waypoint(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 15;
    this.vy = 0;


    //draw constants
    this.r = 15;

    this.display = function() {
        stroke('orange');
        fill('orange');
        ellipse(this.x, this.y, 15, 15);
        stroke('red')
        strokeWeight(4)
        line(this.x - this.vx, this.y - this.vy, this.x, this.y)
        stroke('blue')
        line(this.x, this.y, this.x + this.vx, this.y + this.vy)
    }

    this.wasClicked = function(mx, my) {
        // mx is mouseX
        // my is mouseY
        let d = dist(mx, my, this.x, this.y);
        if (d < this.r) {
            //code for when clicked
            return true;
        } else {
            return false;
        }
    }

    this.updateVelocity = function(mx, my) {
        // mx is mouseX
        // my is mouseY
        this.vx = mx - this.x
        this.vy = my - this.y
    }

    this.handleClicked = function() {
        console.log("This")
    }
}