export default class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        };

        this.velocityCounter = 0;
        this.velocityMaxCounter = 50;
        this.velocityMod = 0.1;
    }

    countVelocity() {
        this.velocityCounter++;
        if (this.velocityCounter > this.velocityMaxCounter) {
            this.velocityCounter = 0;

            if (this.velocity.x > 0){
                this.velocity.x -= this.velocityMod;
            } else if (this.velocity.x < 0){
                this.velocity.x += this.velocityMod;
            }
            if (this.velocity.y > 0){
                this.velocity.y -= this.velocityMod;
            } else if (this.velocity.y < 0){
                this.velocity.y += this.velocityMod;
            }
        }
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.countVelocity();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}