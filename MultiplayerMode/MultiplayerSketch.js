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
var inGround2 = true;
var ended = false;

var control = {
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    up: 'UP_ARROW',

    left2: 'A',
    right2: 'D',
    up2: 'W'
}

function preload() {
    bg_img = loadImage('../background.png');
    grass = loadImage('../grass.png');
    player = loadImage('../player.png');
    player2 = loadImage('SecondPlayer.png');
    goldbar = loadImage("../gold.png");
    wood = loadImage("../wood.png");
}

function setup() {
    canvas = createCanvas(1000, 700);
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(150, 670, 300, 100);
    slime = new Player(player, 50, 600, 30, 30);
    slime2 = new Player(player2, 70, 600, 30, 30);

    //plataforms
    plat1 = new Ground(450, 550, 200, 60);
    elevator = new Elevator(670, 200, 250);
    activator = new Bubble(950, 520);
    plat3 = new Ground(900, 550, 200, 60);
    plat4 = new Ground(370, 200, 160, 60);
    plat5 = new Ground(150, 120, 160, 60);
    plat6 = new Ground(150, 270, 160, 60);

    gold = new Gold(130, 150);
    textSize(50)
}

function draw() {
    background(51);

    image(bg_img, 0, 0, width, height);

    Engine.update(engine);
    ground.show();
    slime.show();
    slime2.show();
    stroke("black");
    textSize(12);
    fill("red");
    text("P1", slime.body.position.x + 10, slime.body.position.y - 10);
    fill("blue");
    text("P2", slime2.body.position.x + 10, slime2.body.position.y - 10);

    //show plataforms
    plat1.show();
    elevator.show();
    activator.show("blue");
    plat3.show();
    plat4.show();
    plat5.show();
    plat6.show();

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
    if (keyDown(control.right2)) {
        Matter.Body.translate(slime2.body, { x: 5, y: 0 });
    }
    if (keyDown(control.left2)) {
        Matter.Body.translate(slime2.body, { x: -5, y: 0 });
    }
    if (keyDown(control.up2)) {
        jumping2();
    }
    //activator
    var slimeActiving1 = Matter.SAT.collides(
        slime.body,
        activator.body
    )
    var slimeActiving2 = Matter.SAT.collides(
        slime2.body,
        activator.body
    )
    if(slimeActiving1.collided || slimeActiving2.collided){
        Matter.Body.setVelocity(elevator.body, { x: 0, y: -5 });
    }

    //golded
    var golded = Matter.SAT.collides(
        slime.body,
        gold.body
    );
    if (golded.collided && !ended) {
        gameOver(1);
    }
    var golded2 = Matter.SAT.collides(
        slime2.body,
        gold.body
    );
    if (golded2.collided && !ended) {
        gameOver(2);
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
function jumping2() {
    console.log("jump")
    if (inGround2) {
        inGround2 = false;
        Matter.Body.setVelocity(slime2.body, { x: 0, y: -10 });
        setTimeout(() => {
            inGround2 = true;
        }, 1200)
    }
}
function gameOver(who) {
    if (who == 1) {
        swal(
            {
                title: `WINNER`,
                text: "Player 1 reached the gold!",
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
    } else {
        swal(
            {
                title: `WINNER`,
                text: "Player 2 reached the gold!",
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
}
function hideHeading() {
    document.getElementById("heading").innerHTML = "";
}
function returnMain() {
    window.location = "../index.html";
}
function ToServer() {
    window.location = "../ServerMode/ServerPlayerGame.html";
}