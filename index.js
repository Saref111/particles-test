import Particle from "./particle.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const MOUSE_GRAVITY = 0.1;
const CONNECT_DISTANCE = (canvas.width / 100) * (canvas.height / 100);

let deltaTime = 0;
let particles = [];
let mouse = {
    x: undefined,
    y: undefined,
    radius: (canvas.width / 90) * (canvas.width / 90),
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

window.addEventListener('touchstart', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
window.addEventListener('click', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const connect = (particle, i) => {
    for (let j = i; j < particles.length; j++) {
        const dx = particle.x - particles[j].x;
        const dy = particle.y - particles[j].y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
        }
    }
}

const changeVelocity = (particle) => {
    if (particle.x > canvas.width || particle.x < 0) {
        particle.velocity.x = -particle.velocity.x;
    }
    if (particle.y > canvas.height || particle.y < 0) {
        particle.velocity.y = -particle.velocity.y;
    }
}

const reactOnMouse = (particle) => {
    let dx = mouse.x - particle.x;
    let dy = mouse.y - particle.y;

    if (Math.sqrt(dx * dx + dy * dy) < mouse.radius + particle.radius) {
        if (particle.x > mouse.x) {
            particle.velocity.x += MOUSE_GRAVITY;
        }
        if (particle.x < mouse.x) {
            particle.velocity.x -= MOUSE_GRAVITY;
        }
        if (particle.y > mouse.y) {
            particle.velocity.y += MOUSE_GRAVITY;
        }
        if (particle.y < mouse.y) {
            particle.velocity.y -= MOUSE_GRAVITY;
        }
    }
}

const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, i) => {
        particle.update();
        changeVelocity(particle);

        reactOnMouse(particle);

        connect(particle, i);

        particle.draw(ctx);
    });
    requestAnimationFrame(animate);
}

const init = () => {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height, 
            Math.random() * 10, 
            '#000'
        ));
    }
    animate();
}


//controls 

init();