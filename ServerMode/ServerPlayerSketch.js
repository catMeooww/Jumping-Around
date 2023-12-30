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

var database;
var Selected = 0;

var control = {
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    up: 'UP_ARROW',
}

function preload() {
    bg_img = loadImage('../background.png');
    grass = loadImage('../grass.png');
    player = loadImage('../player.png');
    player2 = loadImage('SecondPlayer.png');
    player3 = loadImage('ThirdPlayer.png');
    goldbar = loadImage("../gold.png");
    wood = loadImage("../wood.png");
}

function setup() {
    canvas = createCanvas(1000, 600);
    canvas.parent(document.getElementById("main"));
    frameRate(80);
    engine = Engine.create();
    world = engine.world;
    database = firebase.database();
    ground = new Ground(150, 670, 300, 100);
    slime = new Player(player, 50, 600, 30, 30);
    slime2 = new Player(player2, 70, 600, 30, 30);
    slime3 = new Player(player3, 90, 600, 30, 30);

    //plataforms
    plat1 = new Ground(450, 550, 150, 50);
    plat2 = new Ground(650, 550, 100, 40);
    plat3 = new Ground(850, 600, 100, 40);

    gold = new Gold(130, 150);
    textSize(40)
}

function draw() {
    background(51);

    image(bg_img, camera.position.x - 500, camera.position.y - 300, width, height);

    Engine.update(engine);
    if(Selected == 0){
    text("Select your player to join game",50,100);
    }else{
    ground.show();
    slime.show();
    slime2.show();
    slime3.show();
    stroke("black");
    textSize(12);
    fill("green");
    text("P1", slime.body.position.x + 10, slime.body.position.y - 10);
    fill("red");
    text("P2", slime2.body.position.x + 10, slime2.body.position.y - 10);
    fill("blue");
    text("P3", slime3.body.position.x + 10, slime3.body.position.y - 10);
    }
    //show plataforms
    plat1.show();
    plat2.show();
    plat3.show();

    gold.show();
    
    //camera
    if(Selected == 1){
        camera.position.x = slime.body.position.x;
        camera.position.y = slime.body.position.y;
    }else if(Selected == 2){
        camera.position.x = slime2.body.position.x;
        camera.position.y = slime2.body.position.y;
    }else if(Selected == 3){
        camera.position.x = slime3.body.position.x;
        camera.position.y = slime3.body.position.y;
    }

    //controls
    if (Selected == 1) {
        if (keyDown(control.right)) {
            Matter.Body.translate(slime.body, { x: 5, y: 0 });
        }
        if (keyDown(control.left)) {
            Matter.Body.translate(slime.body, { x: -5, y: 0 });
        }
        if (keyDown(control.up)) {
            jumping();
        }
    } else if (Selected == 2) {
        if (keyDown(control.right)) {
            Matter.Body.translate(slime2.body, { x: 5, y: 0 });
        }
        if (keyDown(control.left)) {
            Matter.Body.translate(slime2.body, { x: -5, y: 0 });
        }
        if (keyDown(control.up)) {
            jumping2();
        }
    } else if (Selected == 3) {
        if (keyDown(control.right)) {
            Matter.Body.translate(slime3.body, { x: 5, y: 0 });
        }
        if (keyDown(control.left)) {
            Matter.Body.translate(slime3.body, { x: -5, y: 0 });
        }
        if (keyDown(control.up)) {
            jumping3();
        }
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
    var golded3 = Matter.SAT.collides(
        slime3.body,
        gold.body
    );
    if (golded3.collided && !ended) {
        gameOver(3);
    }
    updatePositions();
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
    if (inGround) {
        inGround = false;
        Matter.Body.setVelocity(slime2.body, { x: 0, y: -10 });
        setTimeout(() => {
            inGround = true;
        }, 1200)
    }
}
function jumping3() {
    console.log("jump")
    if (inGround) {
        inGround = false;
        Matter.Body.setVelocity(slime3.body, { x: 0, y: -10 });
        setTimeout(() => {
            inGround = true;
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
                    RServer();
                }
            }
        );
    } else if (who == 2) {
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
                    RServer();
                }
            }
        );
    } else if (who == 3) {
        swal(
            {
                title: `WINNER`,
                text: "Player 3 reached the gold!",
                imageUrl:
                    "../gold.png",
                imageSize: "150x150",
                confirmButtonText: "Restart"
            },
            function (isConfirm) {
                if (isConfirm) {
                    RServer();
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
function ToLocal() {
    window.location = "../MultiplayerMode/MultiplayerGame.html";
}
function selectPlayer(n) {
    if (n == 1) {
        Selected = 1;
    } else if (n == 2) {
        Selected = 2;
    } else if (n == 3) {
        Selected = 3
    }
    document.getElementById("serverInfo").innerHTML = "<button class='serverbutton' onclick='RServer()'>Restart Server</button>"
}
function updatePositions(){
    if (Selected == 1) {
        database.ref("players/p1").update({
            x: slime.body.position.x,
            y: slime.body.position.y
          });
        var playerDistanceRef = database.ref("players/p2");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime2.body,{x:posX,y:posY});
        });
        var playerDistanceRef = database.ref("players/p3");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime3.body,{x:posX,y:posY});
        });
    }else if(Selected == 2){
        database.ref("players/p2").update({
            x: slime2.body.position.x,
            y: slime2.body.position.y
          });
        var playerDistanceRef = database.ref("players/p1");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime.body,{x:posX,y:posY});
        });
        var playerDistanceRef = database.ref("players/p3");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime3.body,{x:posX,y:posY});
        });
    }else if(Selected == 3){
        database.ref("players/p3").update({
            x: slime3.body.position.x,
            y: slime3.body.position.y
          });
        var playerDistanceRef = database.ref("players/p1");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime.body,{x:posX,y:posY});
        });
        var playerDistanceRef = database.ref("players/p2");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime2.body,{x:posX,y:posY});
        });
    }else{
        var playerDistanceRef = database.ref("players/p1");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime.body,{x:posX,y:posY});
        });
        var playerDistanceRef = database.ref("players/p2");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime2.body,{x:posX,y:posY});
        })
        var playerDistanceRef = database.ref("players/p3");
        playerDistanceRef.on("value", data => {
            var data = data.val();
            posX = data.x;
            posY = data.y;
            Matter.Body.setPosition(slime3.body,{x:posX,y:posY});
        });
    }
}
function RServer(){
    Selected = 0;
    database.ref("players/p1").update({
        x: 50,
        y: 600
      });
      database.ref("players/p2").update({
        x: 70,
        y: 600
      });
      database.ref("players/p3").update({
        x: 90,
        y: 600
      });
      location.reload();
}