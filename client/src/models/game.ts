import { Entity } from "../entities/entity.ts";
import { SpriteComponent } from "../components/sprite-component.ts";
import { TransformComponent } from "../components/transform-component.ts";

interface RenderCacheItem {
    readonly sprite: SpriteComponent;
    readonly transform: TransformComponent;
}

export class Game {
    private readonly frameTimes: number[] = [];
    private readonly maxFrameSamples: number = 60;
    private fps = 0;

    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly entities: Entity[] = [];
    private readonly renderCache: Map<number, RenderCacheItem>;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.handleResize();
        window.addEventListener("resize", () => {
            this.handleResize();
        });

        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Can't find the canvas context");
        }

        this.context = context;
        this.entities = [];
        this.renderCache = new Map<number, RenderCacheItem>();
    }

    public addEntity(entity: Entity) {
        this.entities.push(entity);
        this.updateRenderCache(entity);
    }

    public removeEntity(entity: Entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
            this.renderCache.delete(entity.id);
        }
    }

    public invalidateRenderCache(entity: Entity) {
        this.renderCache.delete(entity.id);
        this.updateRenderCache(entity);
    }

    public updateRenderCache(entity: Entity) {
        const sprite = entity.getComponent(SpriteComponent);
        const transform = entity.getComponent(TransformComponent);

        if (
            sprite instanceof SpriteComponent &&
            transform instanceof TransformComponent
        ) {
            this.renderCache.set(entity.id, { sprite, transform });
        } else {
            this.renderCache.delete(entity.id);
        }
    }

    public start() {
        const fps = 60;
        const timeStep = 1000 / fps;
        let previous = performance.now();
        let delta = 0.0;

        const loop = (current: number) => {
            const dt = current - previous;
            delta += dt;
            previous = current;

            this.updateFPS(current);

            while (delta >= timeStep) {
                this.update(timeStep / 1000);
                delta -= timeStep;
            }

            this.render();

            window.requestAnimationFrame(loop);
        };

        window.requestAnimationFrame(loop);
    }

    private update(delta: number): void {
        for (const entity of this.entities) {
            entity.update(delta);
        }
    }

    private render(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillText(`FPS: ${this.fps.toString()}`, 10, 10);

        for (const { sprite, transform } of this.renderCache.values()) {
            this.context.drawImage(
                sprite.image,
                transform.position.x,
                transform.position.y,
                sprite.width,
                sprite.height
            );
        }
    }

    private handleResize(): void {
        this.canvas.width = document.body.scrollWidth;
        this.canvas.height = document.body.scrollHeight;
    }

    private updateFPS(currentTime: number) {
        this.frameTimes.push(currentTime);

        if (this.frameTimes.length > this.maxFrameSamples) {
            this.frameTimes.shift();
        }

        if (this.frameTimes.length >= 2) {
            const delta =
                this.frameTimes[this.frameTimes.length - 1] -
                this.frameTimes[0];
            this.fps = Math.round((this.frameTimes.length / delta) * 1000);
        }
    }
}
