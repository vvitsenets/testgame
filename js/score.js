export default class Score extends PIXI.Text {
    constructor(x,y) {
        super(x+" 0",y);
        this.score = 0;
    }
    updateScore(){
        this.score++;
        this.text = "Score : "+this.score;
    }
}