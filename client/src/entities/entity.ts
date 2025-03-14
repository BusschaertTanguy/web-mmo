import { Component } from "../components/component.ts";

export abstract class Entity {
    private static globalEntityId = 1;
    public readonly id: number;

    protected constructor(protected readonly components: Component[]) {
        this.id = Entity.globalEntityId++;
        this.components = components;
    }

    public abstract update(delta: number): void;

    public getComponent<T extends Component>(
        type: new (...args: never[]) => T
    ) {
        return this.components.find(
            (component): component is T => component instanceof type
        );
    }
}
