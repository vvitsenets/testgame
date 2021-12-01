export default class Enemy extends PIXI.Sprite {
    constructor(texture,name = "none", hp = 100, speed = 1) {
        super(texture);
        this.name = name;
        this.hp = hp;
        this.x = 500;
        this.y = 50;
        this.speed = speed;
    }
    status() {
        return this.name + " has " + this.hp + "hit points";
    }
    move() {
        if (this.y < 0 || this.y > 500)
            this.speed = -this.speed;
        this.y += this.speed;
    }
}