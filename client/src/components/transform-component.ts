import { Component } from "./component.ts";
import { Vector } from "../models/vector.ts";

export class TransformComponent implements Component {
    constructor(public position: Vector) {}

    public translate(vector: Vector) {
        this.position = this.position.add(vector);
    }
}
