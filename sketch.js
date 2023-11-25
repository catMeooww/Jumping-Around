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
var ended = false;

var control = {
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    up: 'SPACE'
}

function preload() {
    bg_img = loadImage('background.png');
    grass = loadImage('grass.png');
    player = loadImage('player.png');
    goldbar = loadImage("gold.png");
}

function setup() {

    var celular = /iPhone|Android|iPad/i.test(navigator.userAgent)
    if(celular){
        window.location = "MobileMode/mobile.html"
    }

    canvas = createCanvas(500, 700);
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(250, 670, width, 100);
    slime = new Player(player, 50, 600, 30, 30);

    //plataforms
    plat1 = new Ground(450, 550, 200, 60);
    plat2 = new Ground(200, 410, 200, 60);
    plat3 = new Ground(450, 300, 200, 60);
    plat4 = new Ground(150, 200, 160, 60);

    gold = new Gold(130, 30);
    textSize(50)
}

function draw() {
    background(51);

    image(bg_img, 0, 0, width, height);

    Engine.update(engine);
    ground.show();
    slime.show();

    //show plataforms
    plat1.show();
    plat2.show();
    plat3.show();
    plat4.show();

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
        Matter.Body.setVelocity(slime.body, {x:0,y:-10});
        setTimeout(() => {
            inGround = true;
        }, 1200)
    }
}
function gameOver() {
    swal(
        {
            title: `Level 1 complete`,
            text: "Thanks for playing, you are good in this!",
            imageUrl:
                "gold.png",
            imageSize: "150x150",
            confirmButtonText: "Next Level"
        },
        function (isConfirm) {
            if (isConfirm) {
                window.location = "SecondLevel.html";
            }
        }
    );
}
function hideHeading() {
    document.getElementById("heading").innerHTML = "";
}
function ToMulti(){
    window.location = "MultiplayerMode/MultiplayerGame.html"
}