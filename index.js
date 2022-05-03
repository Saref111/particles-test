import Particle from "./particle.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let particles = [];

const changeVelocity = (particle) => {
    if (particle.x > canvas.width || particle.x < 0) {
        particle.velocity.x = -particle.velocity.x;
    }
    if (particle.y > canvas.height || particle.y < 0) {
        particle.velocity.y = -particle.velocity.y;
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        changeVelocity(particle);
        particle.draw(ctx);
    });
    requestAnimationFrame(animate);
}

const init = () => {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height, 
            Math.random() * 10, 
            '#000'
        ));
    }
    animate()
}


init();