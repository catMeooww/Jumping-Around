const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var bg_img;
var grass;
var player;
var button;

var inGround = true;
var activate = true;
var ended = false;

var control = {
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    up: 'UP_ARROW'
}

function preload() {
    bg_img = loadImage('../background.png');
    grass = loadImage('../grass.png');
    player = loadImage('../player.png');
    goldbar = loadImage("../gold.png");
    wood = loadImage("../wood.png");
    gravel = loadImage("../gravel.png");
}

function setup() {
    canvas = createCanvas(1200, 700);
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(200, 670, 400, 100);
    slime = new Player(player, 50, 600, 30, 30);
    toggle = "blue";

    //plataforms
    plat1 = new Ground(750, 630, 200, 60);
    plat2 = new Ground(1200, 630, 200, 60);
    plat3 = new Ground(1670, 630, 200, 60);
    plat4 = new Ground(2150, 630, 160, 60);
    plat5 = new Ground(2570, 630, 160, 60);
    elevator = new Elevator(3000, 350, 250);
    plat6 = new Ground(3400, 630, 160, 60);
    plat7 = new Ground(3800, 630, 160, 60);
    pad = new Bubble(3800, 600);
    plat8 = new Ground(3320, 360, 230, 60);
    plat9 = new Ground(3800, 360, 160, 60);
    portal = new Portal(3850, 270, 2570, 270);
    wall = new Ground(2660, 290, 60, 200)
    plat10 = new Ground(2530, 360, 200, 60);
    plat11 = new Ground(2050, 360, 160, 60);
    plat12 = new Ground(1600, 360, 160, 60);
    jumppad = new Bubble(1570, 325);
    plat13 = new Ground(1080, 200, 200, 60);
    plat14 = new Gravel(900, 200, 160, 60);
    plat15 = new Ground(900, 400, 200, 60);
    wall2 = new Ground(790, 100, 60, 200);
    wall3 = new Ground(1030, 330, 60, 200);
    plat16 = new Ground(600, 370, 160, 60);
    plat17 = new Ground(400, 350, 160, 60);
    plat18 = new Ground(200, 310, 200, 60);
    stair = new Stair(140,190,10);

    gold = new Gold(130, 30);
    textSize(50)
}

function draw() {
    background(51);

    image(bg_img, camera.position.x - 600, 0, 1200,700);

    Engine.update(engine);
    ground.show();
    slime.show();

    //show plataforms
    plat1.show();
    plat2.show();
    plat3.show();
    plat4.show();
    plat5.show();
    elevator.show();
    pad.show(toggle);
    plat6.show();
    plat7.show();
    plat8.show();
    portal.show();
    plat9.show();
    wall.show();
    plat10.show();
    plat11.show();
    jumppad.show("green");
    plat12.show();
    plat13.show();
    plat14.show();
    plat15.show();
    wall2.show();
    wall3.show();
    plat16.show();
    plat17.show();
    plat18.show();
    stair.show();

    gold.show();
    //controls
    if (keyDown(control.right)) {
        Matter.Body.translate(slime.body, { x: 5, y: 0 });
    }
    if (keyDown(control.left)) {
        Matter.Body.translate(slime.body, { x: -5, y: 0 });
    }
    if (keyDown(control.up)) {
        jumping();
    }

    camera.position.x = slime.body.position.x

    //colisions
    var upstairs = Matter.SAT.collides(
        slime.body,
        stair.body
    );
    if(upstairs.collided){
        Matter.Body.setVelocity(slime.body, { x: 0, y: -1 });
    }

    var fallgravel = Matter.SAT.collides(
        slime.body,
        plat14.body
    );
    if(fallgravel.collided){
        Matter.Body.setStatic(plat14.body,false);
    }

    var activation = Matter.SAT.collides(
        slime.body,
        pad.body
    );
    if(activation.collided && activate){
     activate = false;
     toggle = "red";
     moveElevator();
    }

    var teleport = Matter.SAT.collides(
        slime.body,
        portal.body
    );
    if (teleport.collided) {
        Matter.Body.setPosition(slime.body, { x: 2570, y: 280 });
    }

    var superJump = Matter.SAT.collides(
        slime.body,
        jumppad.body
    );
    if(superJump.collided){
        Matter.Body.setVelocity(slime.body, { x: 0, y: -16 });
    }
    
    //golded
    var golded = Matter.SAT.collides(
        slime.body,
        gold.body
    );
    if (golded.collided && !ended) {
        gameOver();
    }

}
function jumping() {
    console.log("jump")
    if (inGround) {
        inGround = false;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -10 });
        setTimeout(() => {
            inGround = true;
        }, 1200)
    }
}

function moveElevator(){
    setTimeout(()=>{
        Matter.Body.setVelocity(elevator.body, { x: 0, y: -14 });
        activate = true;
        toggle = "blue";
     },5000);
}

function gameOver() {
    swal(
        {
            title: `Line Jumping Complete`,
            text: "Thanks for playing, you are good in this!",
            imageUrl:
                "../gold.png",
            imageSize: "150x150",
            confirmButtonText: "Restart"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    );
}
function hideHeading() {
    document.getElementById("heading").innerHTML = "";
}
function returnMain() {
    window.location = "../index.html";
}