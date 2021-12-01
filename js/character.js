export default class Character extends PIXI.Sprite {
    constructor(x) {
        super(x);
        this.x = 80;
        this.y = 600 / 2;
        this.speed = 20;
    }
}