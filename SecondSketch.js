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
var PlayerBubble = false;

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
    bubble = loadImage("bubble.png");
}

function setup() {
    canvas = createCanvas(500, 700);
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(250, 670, width, 100);
    slime = new Player(player, 50, 600, 30, 30);

    //plataforms
    plat1 = new Ground(45, 190, 600, 60);
    plat2 = new Ground(310, 320, 200, 60);
    plat3 = new Ground(155, 580, 100, 70);
    plat4 = new Ground(260, 480, 100, 270);
    plat5 = new Ground(400, 460, 200, 80);

    bubblepad = new Bubble(140, 540);
    portal = new Portal(300,230,350,360);

    gold = new Gold(130, 30);
    textSize(50)
}

function draw() {
    background(51);

    image(bg_img, 0, 0, width, height);

    Engine.update(engine);
    ground.show();

    //player_data
    slime.show();
    if (PlayerBubble) {
        image(bubble, slime.body.position.x - 10, slime.body.position.y - 10, 50, 50);
    }

    //show plataforms
    plat1.show();
    plat2.show();
    plat3.show();
    plat4.show();
    plat5.show();

    bubblepad.show();
    portal.show();

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

    //portals
    var teleport = Matter.SAT.collides(
        slime.body,
        portal.body
    );
    if (teleport.collided) {
        Matter.Body.setPosition(slime.body, { x: 350, y: 360 });
    }

    //bubble
    var bubbling = Matter.SAT.collides(
        slime.body,
        bubblepad.body
    );
    if (bubbling.collided) {
        engine.world.gravity.y = -0.4;
        PlayerBubble = true;
        setTimeout(() => {
            engine.world.gravity.y = 1;
            PlayerBubble = false;
        },1500)
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
    if (inGround && !PlayerBubble) {
        inGround = false;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -10 });
        setTimeout(() => {
            inGround = true;
        }, 1200)
    }
}
function gameOver() {
    swal(
        {
            title: `Level 2 complete`,
            text: "Thanks for playing, you are good in this!",
            imageUrl:
                "gold.png",
            imageSize: "150x150",
            confirmButtonText: "Restart Game"
        },
        function (isConfirm) {
            if (isConfirm) {
                window.location = "index.html";
            }
        }
    );
}
function hideHeading() {
    document.getElementById("heading").innerHTML = "";
}