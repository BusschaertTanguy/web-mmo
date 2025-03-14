import { Component } from "./component.ts";
import { Vector } from "../models/vector.ts";

export class BodyComponent implements Component {
    constructor(private readonly speed: number) {}

    public getVelocity(direction: Vector) {
        if (direction.equals(Vector.zero)) {
            return Vector.zero;
        }

        return direction.normalize().multiply(this.speed);
    }
}
