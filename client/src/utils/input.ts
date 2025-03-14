const pressedKeys = new Set<string>();

window.addEventListener("keydown", (event) => {
    pressedKeys.add(event.key);
});

window.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.key);
});

export const keyPressed = (key: string): boolean => {
    return pressedKeys.has(key);
};

export const horizontal = (): number => {
    let x = 0;

    if (keyPressed("a")) {
        x--;
    }

    if (keyPressed("d")) {
        x++;
    }

    return x;
};

export const vertical = (): number => {
    let y = 0;

    if (keyPressed("w")) {
        y--;
    }

    if (keyPressed("s")) {
        y++;
    }

    return y;
};
