class Player {
    constructor(img, x, y, w, h) {
        this.body = Bodies.rectangle(x, y, w, h,{isStatic:false,restitution:0});
        this.w = w;
        this.h = h;
        this.img = img;
        World.add(world, this.body);
    }
    show() {
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        image(this.img,pos.x,pos.y, this.w, this.h);
        pop();
      }
}