class Elevator {
    constructor(x, y, distance) {
        this.block1 = Bodies.rectangle(x-80, y, 10, 10, { isStatic: true,friction:1,restitution:0 });
        this.block2 = Bodies.rectangle(x + 70, y, 10, 10, { isStatic: true,friction:1,restitution:0 });
        this.block3 = Bodies.rectangle(x, y + distance + 60, 200,1, { isStatic: true,friction:1,restitution:0 });
        this.body = Bodies.rectangle(x, y + distance, 200, 55, {friction:1,restitution:0});
        World.add(world, this.block1);
        World.add(world, this.block2);
        World.add(world, this.block3);
        World.add(world, this.body);
    }
    show() {
        let pos = this.body.position;
        let blockpos1 = this.block1.position;
        let blockpos2 = this.block2.position;
        let blockpos3 = this.block3.position;
        push();
        imageMode(CENTER);
        noStroke();
        fill(148, 127, 146);
        image(wood, pos.x, pos.y + 10, 200, 55);
        rectMode(CENTER);
        fill(0,0,0,);
        rect(blockpos1.x,blockpos1.y+ 10,10,10)
        rect(blockpos2.x,blockpos2.y+ 10,10,10)
        rect(blockpos3.x,blockpos3.y+ 10,200,1)
        pop();
    }
}