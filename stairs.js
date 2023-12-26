class Stair {
    constructor(x, y, n) {
        this.steps = [];
        this.x = x;
        this.y = y;
        this.n = n;
            this.body = Bodies.rectangle(this.x, this.y, 20, n*20, {isStatic:true, restitution:0});
            World.add(world,this.body);
    }
    show() {
        push();
        rectMode(CENTER);
        noStroke();
        fill("chocolate");
        rect(this.x, this.y, 7, this.n * (this.n *2));
        rect(this.x + 20, this.y, 7, this.n * (this.n *2));
        for (var i = 0; i < this.n; i++) {
            rect(this.x + 10, this.y + ((i * 20) - 90), 20, 7);
        }
        pop();
    }
}