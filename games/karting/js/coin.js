export default class Coin {
    constructor(width, height, assets) {
        this.radius = 10;
        this.width = width;
        this.height = height;

        this.assets = assets;
        this.sprite = assets.coin;
        this.coinPickupSound = new Audio("assets/sounds/coin.wav"); // A modifier une fois qu'howler fonctionne
        this.coinSpawnSound = new Audio("assets/sounds/coin_spawn.wav"); // A modifier une fois qu'howler fonctionne

        this.frame = 0;
        this.frameCount = 6;
        this.animSpeed = 1;

        this.state = "DEFAULT"; // 3 etats possibles DEFAULT -> DISSOLVING -> HIDDEN
        this.respawn();
    }

    respawn() {
        this.x = Math.random() * this.width;
        this.y = Math.random() * this.height;

        this.state = "DEFAULT";
        this.frame = 0;
        this.coinSpawnSound.play();
    }

    draw(ctx) {

        if (this.state === "HIDDEN") return;

        ctx.save();

        ctx.imageSmoothingEnabled = false; // pixel art net

        this.frame = Math.floor(Date.now() / 120) % 6;

        let currentSprite;
        if(this.state === "DEFAULT") currentSprite = this.assets.coin;
        if(this.state === "DISSOLVING") currentSprite = this.assets.coinDissolve;

        ctx.drawImage(
            currentSprite,
            this.frame * 16,
            0,
            16,
            32,
            this.x - 16,
            this.y - 16,
            16 * 2.5,
            32 * 2.5
        );

        ctx.restore();
    }

    collect() {
        if (this.state !== "DEFAULT") return;

        this.state = "DISSOLVING";
        this.frame = 0;
        this.coinPickupSound.play();
    }

    update(dt) {
        console.log(this.state)
        if (this.state === "DISSOLVING") {
            this.frame += this.animSpeed;

            if (this.frame >= this.frameCount) {
                this.state = "HIDDEN";
                this.timer = 0;
            }
        }

        if (this.state === "HIDDEN") {
            this.timer += dt;

            if (this.timer > 1) { // 1 seconde
                this.respawn();
            }
        }
    }

}
