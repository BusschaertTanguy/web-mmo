const pressedKeys = new Set<string>();

window.addEventListener("keydown", (event) => {
    pressedKeys.add(event.key);
});

window.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.key);
});

const keyPressed = (key: string) => {
    return pressedKeys.has(key);
};

const horizontal = () => {
    let x = 0;

    if (keyPressed("a")) {
        x--;
    }

    if (keyPressed("d")) {
        x++;
    }

    return x;
};

const vertical = () => {
    let y = 0;

    if (keyPressed("w")) {
        y--;
    }

    if (keyPressed("s")) {
        y++;
    }

    return y;
};

const Input = {
    keyPressed,
    horizontal,
    vertical,
};

export default Input;
