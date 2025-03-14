import "./style.css";
import World from "./models/world.ts";
import { Player } from "./entities/player.ts";

// Setup canvas
const canvas = document.createElement("canvas");
canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;
document.body.appendChild(canvas);

window.addEventListener("resize", () => {
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
});

const context = canvas.getContext("2d");
if (!context) {
    throw new Error("Can't find the canvas context");
}

// Debug variables
const frameTimes: number[] = [];
const maxFrameSamples = 60;
let fps = 0;

// Game update loop
const update = (delta: number) => {
    for (const entity of World.entities) {
        entity.update(delta);
    }
};

// Game render loop
const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(`FPS: ${fps.toString()}`, 10, 10);

    for (const { sprite, transform } of World.renderableEntities.values()) {
        context.drawImage(
            sprite.image,
            transform.position.x,
            transform.position.y,
            sprite.width,
            sprite.height
        );
    }
};

// Debug FPS updater
const updateFPS = (currentTime: number) => {
    frameTimes.push(currentTime);

    if (frameTimes.length > maxFrameSamples) {
        frameTimes.shift();
    }

    if (frameTimes.length >= 2) {
        const delta = frameTimes[frameTimes.length - 1] - frameTimes[0];

        fps = Math.round((frameTimes.length / delta) * 1000);
    }
};

// Game main loop
const timeStep = 1000 / 60;
let previous = performance.now();
let delta = 0.0;

const loop = (current: number) => {
    const dt = current - previous;
    delta += dt;
    previous = current;

    updateFPS(current);

    while (delta >= timeStep) {
        update(timeStep / 1000);
        delta -= timeStep;
    }

    render();

    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);

// World setup
World.addEntity(new Player());
