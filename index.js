import Particle from "./particle.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let particles = [];

const animate = (timer) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
        console.log(particle);
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