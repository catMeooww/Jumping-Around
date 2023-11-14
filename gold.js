class Gold
{
  constructor(x, y) 
  {
    let options = {
     isStatic:true,
     restitution:0
    };
    
    this.body = Bodies.circle(x, y, 50, options);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    imageMode(CENTER);
    noStroke();
    fill(148,127,146);
    image(goldbar,pos.x,pos.y+10, 50, 50);
    pop();
  }
}
