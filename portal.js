class Portal {
    constructor(x, y, sx, sy) {
        this.body = Bodies.rectangle(x, y, 15, 70, { isStatic: true });
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        World.add(world, this.body);
    }
    show() {
        push();
        imageMode(CENTER);
        noStroke();
        fill("orange");
        rect(this.x - 10, this.y, 15, 70);
        fill("violet");
        rect(this.sx - 10, this.sy, 15, 70);
        pop();
    }
}