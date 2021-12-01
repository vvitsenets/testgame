import Score from "./score.js";
import Health from "./health.js";
export default class Hud extends PIXI.Text {
    constructor() {
        super();
        this.scoretext = new PIXI.Text('score 0',{fontSize: 20, fill : 0xEC255A, align : 'center'});
        this.healthtext = new PIXI.Text('3♡',{fontSize: 60, fill : 0xEC255A, align : 'center'});
        this.healthtext.x = 350;
        this.healthtext.y = 500;
        this.scoretext.x = 350;
        this.score; 
        this.count= 0;
        this.health= 3;
    }
    addText(){
    }
    updateScore(){
        this.count++;
        this.scoretext.text = "score "+this.count;
    }
    updateHealth(){
        this.health--;
        this.healthtext.text = this.health+"♡";
    }
}