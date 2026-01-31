export default class Kart {
    constructor(x, y, color, canvasHauteur, canvasLargeur, sprite, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.controls = controls;
        this.canvasHauteur = canvasHauteur
        this.canvasLargeur = canvasLargeur
        this.angle = 0;
        this.speed = 0;
        this.sprite = sprite

        this.maxSpeed = 4;
        this.accel = 0.2;
        this.friction = 0.05;
        this.turnSpeed = 0.08;
        this.radius = 15;
    }

    update(keys) {
        // Accélération / frein
        if (keys[this.controls.up]) this.speed += this.accel;
        if (keys[this.controls.down]) this.speed -= this.accel;

        // Clamp vitesse
        this.speed = Math.max(
            -this.maxSpeed / 2,
            Math.min(this.speed, this.maxSpeed)
        );

        // Rotation dépendante de la vitesse
        if (Math.abs(this.speed) > 0.2) {
            if (keys[this.controls.left]) this.angle -= this.turnSpeed * (this.speed / this.maxSpeed);
            if (keys[this.controls.right]) this.angle += this.turnSpeed * (this.speed / this.maxSpeed);
        }

        // Mouvement
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Friction
        this.speed *= (1 - this.friction);

        // Bords de l'écran
        this.x = Math.max(0, Math.min(this.canvasLargeur, this.x));
        this.y = Math.max(0, Math.min(this.canvasHauteur, this.y));
    }

    /*draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = this.color;
        ctx.fillRect(-15, -10, 30, 20);

        // petit nez du kart
        ctx.fillStyle = "black";
        ctx.fillRect(5, -5, 10, 10);

        ctx.restore();
    }*/

    draw(ctx) {
        const size = 16;
        const scale = 2; // agrandir pixel art

        const dir = this.getDirectionIndex();

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.imageSmoothingEnabled = false; // pixel art net

        ctx.drawImage(
            this.sprite,
            dir * size, 0,   // source x, y
            size, size,
            -size, -size,
            size * 2.5,
            size * 2.5
        );

        ctx.restore();
    }


    getDirectionIndex() {
        const directions = 8;
        const slice = (Math.PI * 2) / directions;

        let index = Math.round((this.angle + Math.PI/2) / slice);

        index = ((index % directions) + directions) % directions;

        return index;
    }
}