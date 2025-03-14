import { Component } from "./component.ts";

export class SpriteComponent implements Component {
    readonly image: HTMLImageElement;

    constructor(
        public readonly width: number,
        public readonly height: number,
        src: string
    ) {
        const image = document.createElement("img");
        image.src = src;
        this.image = image;
    }
}
