import Kart from "./kart.js";
import Coin from "./coin.js";
import { loadAssets } from "./assets.js";
import { drawCapsule, checkCollision, resolveCollision } from "./utils.js";


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
    startGameDiv,
    redKart, 
    blueKart, 
    coin,
    explosionSound,
    lastTime;

function init(){
    console.log("OK")

    loadAssets((assetsLoaded) => {
        canvas = document.getElementById("game");
        canvasLargeur = canvas.width;
        canvasHauteur = canvas.height;
        ctx = canvas.getContext("2d");
        lastTime = 0;
        redScore = 0;
        blueScore = 0;
        redScoreDisplay = document.getElementById("red-score");
        blueScoreDisplay = document.getElementById("blue-score");

        // TODO howler marche pas pour le moment je fait comme ça
        explosionSound = assetsLoaded.explosion;

        window.addEventListener("keydown", e => keys[e.key] = true);
        window.addEventListener("keyup", e => keys[e.key] = false); 

        startGameDiv = document.getElementById("start");

        redKart = new Kart(200, 300, "red", canvasHauteur, canvasLargeur, 0, assetsLoaded, {
            up: "z",
            down: "s",
            left: "q",
            right: "d"
        });

        blueKart = new Kart(600, 300, "blue", canvasHauteur, canvasLargeur, Math.PI, assetsLoaded, {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight"
        });

        coin = new Coin(canvasLargeur, canvasHauteur, assetsLoaded);
        canvas.addEventListener("click", startGame, { once: true }); 
    });
}

function startGame() {
    startGameDiv.style.display = "none"
    unlockAudio();
    coin.respawn();
    requestAnimationFrame(loop);
}

function loop(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dt = (time - lastTime) / 1000;
    lastTime = time;

    redKart.update(keys);
    blueKart.update(keys);
    coin.update(dt);

    // Verification collision entre les 2 karts
    if (checkCollision(redKart, blueKart)) {
        resolveCollision(redKart, blueKart);
        if(!explosionSound.playing()) explosionSound.play();
    }

    // Verification collision & logique de recuperation de la piece
    if(coin.state === "DEFAULT"){
        if (checkCollision(redKart, coin)) {
            coin.collect()
            redScore++;
            redScoreDisplay.textContent = redScore;
        }

        if (checkCollision(blueKart, coin)) {
            coin.collect()
            blueScore++;
            blueScoreDisplay.textContent = blueScore;
        }
    }

    //drawCapsule(ctx, 450, 300, 900, 590)
    redKart.draw(ctx);
    blueKart.draw(ctx);
    coin.draw(ctx);

    if(redScore == 10 || blueScore == 10) {
        finishGame();
    }else{
        requestAnimationFrame(loop);
    }
}

function finishGame(){
    const gameOverPopup = document.getElementById("game-over");
    gameOverPopup.style.display = "block";

    Howler.stop();
}

function unlockAudio() {
  Howler.ctx.resume();
}