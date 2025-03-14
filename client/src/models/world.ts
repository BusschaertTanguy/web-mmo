import { Entity } from "../entities/entity.ts";
import { SpriteComponent } from "../components/sprite-component.ts";
import { TransformComponent } from "../components/transform-component.ts";

interface RenderableEntity {
    readonly sprite: SpriteComponent;
    readonly transform: TransformComponent;
}

const entities: Entity[] = [];
const renderableEntities = new Map<number, RenderableEntity>();

const addEntity = (entity: Entity) => {
    entities.push(entity);
    updateEntity(entity);
};

const removeEntity = (entity: Entity) => {
    const index = entities.indexOf(entity);
    if (index !== -1) {
        entities.splice(index, 1);
        renderableEntities.delete(entity.id);
    }
};

const invalidateEntity = (entity: Entity) => {
    renderableEntities.delete(entity.id);
    updateEntity(entity);
};

const updateEntity = (entity: Entity) => {
    const sprite = entity.getComponent(SpriteComponent);
    const transform = entity.getComponent(TransformComponent);

    if (
        sprite instanceof SpriteComponent &&
        transform instanceof TransformComponent
    ) {
        renderableEntities.set(entity.id, { sprite, transform });
    } else {
        renderableEntities.delete(entity.id);
    }
};

const World = {
    entities,
    renderableEntities,
    addEntity,
    removeEntity,
    invalidateEntity,
    updateEntity,
};

export default World;
