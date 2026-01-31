export default class Kart {
    constructor(x, y, color, canvasHauteur, canvasLargeur, angle, assets, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.controls = controls;
        this.canvasHauteur = canvasHauteur
        this.canvasLargeur = canvasLargeur
        this.angle = angle;
        this.speed = 0;

        this.maxSpeed = 4;
        this.accel = 0.2;
        this.friction = 0.05;
        this.turnSpeed = 0.08;
        this.radius = 15;

        this.assets = assets;
        this.sprite = assets[this.color + "Kart"]
        // Temporaire a chager une fois howler fonctionnel
        this.engineSound = new Audio("assets/sounds/engine.wav");
        this.engineSound.loop = true;

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

            const speedRatio = Math.abs(this.speed) / this.maxSpeed;
            this.engineSound.volume = 1 * speedRatio
            this.engineSound.play();

            if (keys[this.controls.left]) this.angle -= this.turnSpeed * (this.speed / this.maxSpeed);
            if (keys[this.controls.right]) this.angle += this.turnSpeed * (this.speed / this.maxSpeed);
        }else {
            this.engineSound.pause();
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
    
    draw(ctx) {
        const size = 16;
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