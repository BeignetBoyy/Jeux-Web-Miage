export default class Coin {
    constructor(width, height, sprite) {
        this.radius = 10;
        this.respawn(width, height);
        this.sprite = sprite;
    }

    respawn(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
    }

    /*draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
    }*/

    draw(ctx) {
        ctx.save();

        ctx.imageSmoothingEnabled = false; // pixel art net

        this.frame = Math.floor(Date.now() / 120) % 6;

        ctx.drawImage(
        this.sprite,
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

}
