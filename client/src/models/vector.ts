export class Vector {
    private static _zero = new Vector(0, 0);

    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}

    public static get zero() {
        return this._zero;
    }

    public add(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    public multiply(value: number) {
        return new Vector(this.x * value, this.y * value);
    }

    public normalize() {
        if (this.equals(Vector.zero)) {
            return this;
        }

        const magnitude = this.magnitude();
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    public magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public equals(other: Vector) {
        return this.x === other.x && this.y === other.y;
    }
}
