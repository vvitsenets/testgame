export default class Fire extends PIXI.Sprite {
    constructor(texture,characterX,characterY) {
        super(texture);
        this.dead = false;
        this.x = characterX;
        this.y = characterY;
        this.speed = 20; 
    }
    move() {
        this.x += this.speed;
    }
}
