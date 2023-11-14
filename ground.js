class Ground 
{
  constructor(x, y, w,h) 
  {
    let options = {
     isStatic:true,
     restitution:0
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    imageMode(CENTER);
    noStroke();
    fill(148,127,146);
    image(grass,pos.x,pos.y+10, this.w, this.h);
    pop();
  }
}
