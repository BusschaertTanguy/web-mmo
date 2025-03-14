import { Entity } from "./entity.ts";
import { TransformComponent } from "../components/transform-component.ts";
import { SpriteComponent } from "../components/sprite-component.ts";
import { Vector } from "../models/vector.ts";
import { BodyComponent } from "../components/body-component.ts";
import Input from "../utils/input.ts";

export class Player extends Entity {
    constructor() {
        super([
            new TransformComponent(new Vector(10, 10)),
            new SpriteComponent(96, 96, "/assets/charmander.png"),
            new BodyComponent(200),
        ]);
    }

    public update(delta: number): void {
        const transform = this.getComponent(TransformComponent);
        const body = this.getComponent(BodyComponent);

        if (transform && body) {
            const direction = new Vector(Input.horizontal(), Input.vertical());
            const velocity = body.getVelocity(direction).multiply(delta);
            transform.translate(velocity);
        }
    }
}
