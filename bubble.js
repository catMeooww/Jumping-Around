class Bubble{
constructor(x,y){
    this.body = Bodies.rectangle(x,y,50,15,{isStatic: true});
    this.x = x;
    this.y = y;
    World.add(world, this.body);
}

show(){
    push();
    imageMode(CENTER);
    noStroke();
    fill("blue");
    rect(this.x-10,this.y,50,15);
    pop();
}
}