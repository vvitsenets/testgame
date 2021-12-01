export default class FireEnemy extends PIXI.Sprite {
    constructor(texture,enemyX,enemyY) {
        super(texture);
        this.dead = false;
        this.x = enemyX;
        this.y = enemyY;
        this.speed = 10;  
    }
    move() {
        this.x -= this.speed;
    }
}
