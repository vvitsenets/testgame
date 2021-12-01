export default class Health extends PIXI.Text {
    constructor(x,y) {
        super(x+" 0",y);
        this.score = 0;
    }
    updateHealth(){
        this.score++;
        this.text = "♡"+this.score;
    }
}