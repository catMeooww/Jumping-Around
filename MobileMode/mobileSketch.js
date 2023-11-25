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
var canvas;

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
    bg_img = loadImage('../background.png');
    grass = loadImage('../grass.png');
    player = loadImage('../player.png');
    goldbar = loadImage("../gold.png");
}

function setup() {
    var celular = /iPhone|Android|iPad/i.test(navigator.userAgent)
    if (celular) {
        canW = displayWidth;
        canH = displayHeight;

        canvas = createCanvas(displayWidth, displayHeight);
    } else {
        window.location = "../index.html";
    }
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(210, 500, width, 100);
    slime = new Player(player, 50, 450, 30, 30);

    //plataforms
    plat1 = new Ground(270, 330, 120, 40);
    plat2 = new Ground(200, 410, 120, 40);
    plat3 = new Ground(360, 240, 120, 40);
    plat4 = new Ground(150, 180, 100, 40);

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
    Jbtn = createImg("arrow_up.png");
    Jbtn.position(50, height + 100);
    Jbtn.size(50, 50)
    Jbtn.mouseClicked(jumping);

    Rbtn = createImg("arrow_right.png");
    Rbtn.position(75, height + 150);
    Rbtn.size(50, 50)
    Rbtn.mouseClicked(righting);

    Lbtn = createImg("arrow_left.png");
    Lbtn.position(25, height + 150);
    Lbtn.size(50, 50)
    Lbtn.mouseClicked(lefting);

    //golded
    var golded = Matter.SAT.collides(
        slime.body,
        gold.body
    );
    if (golded.collided && !ended) {
        gameOver();
    }

}

//moving
function jumping() {
    console.log("jump")
    if (inGround) {
        inGround = false;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -8 });
        setTimeout(() => {
            inGround = true;
        }, 1300)
    }
}
function righting(){
    Matter.Body.translate(slime.body, { x: 10, y: 0 });
}
function lefting(){
    Matter.Body.translate(slime.body, { x: -10, y: 0 });
}

function gameOver() {
    swal(
        {
            title: `Level 1 complete`,
            text: "Thanks for playing, you are good in this! (better experience in computer version)",
            imageUrl:
                "../gold.png",
            imageSize: "150x150",
            confirmButtonText: "Reload"
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