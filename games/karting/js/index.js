import Kart from "./kart.js";
import Coin from "./coin.js";
import { loadAssets } from "./assets.js";


window.onload = init;

const keys = {};
let canvas, 
    ctx, 
    canvasLargeur, 
    canvasHauteur, 
    redScore, 
    blueScore, 
    redScoreDisplay,
    blueScoreDisplay,
    redKart, 
    blueKart, 
    coin;

function init(){
    console.log("OK")


    loadAssets((assetsLoaded) => {
        canvas = document.getElementById("game");
        canvasLargeur = canvas.width;
        canvasHauteur = canvas.height;
        ctx = canvas.getContext("2d");
        redScore = 0;
        blueScore = 0;
        redScoreDisplay = document.getElementById("red-score");
        blueScoreDisplay = document.getElementById("blue-score");

        window.addEventListener("keydown", e => keys[e.key] = true);
        window.addEventListener("keyup", e => keys[e.key] = false); 

        redKart = new Kart(200, 300, "red", canvasHauteur, canvasLargeur, assetsLoaded.redKart,{
            up: "z",
            down: "s",
            left: "q",
            right: "d"
        });

        blueKart = new Kart(600, 300, "blue", canvasHauteur, canvasLargeur, assetsLoaded.blueKart,{
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight"
        });

        coin = new Coin(canvasLargeur, canvasHauteur, assetsLoaded.coin);

        requestAnimationFrame(loop);
    });
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redKart.update(keys);
    blueKart.update(keys);

    if (checkCollision(redKart, blueKart)) {
        resolveCollision(redKart, blueKart);
    }

    if (checkCollision(redKart, coin)) {
        coin.respawn(canvasLargeur, canvasHauteur);
        redScore++;
        redScoreDisplay.textContent = redScore;
    }

    if (checkCollision(blueKart, coin)) {
        coin.respawn(canvasLargeur, canvasHauteur);
        blueScore++;
        blueScoreDisplay.textContent = blueScore;
    }

    redKart.draw(ctx);
    blueKart.draw(ctx);
    coin.draw(ctx);

    if(redScore == 20 || blueScore == 20) {
        finishGame();
    }else{
        requestAnimationFrame(loop);
    }
}

function checkCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);

  return distance < a.radius + b.radius;
}

function resolveCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) return;

  const overlap = (a.radius + b.radius) - distance;

  const nx = dx / distance;
  const ny = dy / distance;

  // Séparation
  a.x += nx * overlap / 2;
  a.y += ny * overlap / 2;
  b.x -= nx * overlap / 2;
  b.y -= ny * overlap / 2;

  // Échange de vitesse
  const tempSpeed = a.speed;
  a.speed = b.speed * 0.8;
  b.speed = tempSpeed * 0.8;
}

function finishGame(){
    const gameOverPopup = document.getElementById("game-over");
    gameOverPopup.style.display = "block";
}