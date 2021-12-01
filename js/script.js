import Character from "./character.js";
import Enemy from "./enemy.js";
import Fire from "./fire.js";
import Hud from "./hud.js";
import FireEnemy from "./fireenemy.js";

let app,hud,character,enemy;
let keys = {};
let fires = [];
let firesenemy = [];
let enemySpeed = 2;
let bgX = 0;
let bgSpeed = 1;

window.onload = function () {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xFAEDF0
    });
    document.querySelector("#game").appendChild(app.view);
    app.stage.interactive = true;
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
    app.loader.baseUrl = "img";
    app.loader
        .add("character", "idle.png")
        .add("enemy", "enemy2.png")
        .add("fire", "fire.png");
    app.loader.onComplete.add(initLevel);
    app.loader.load();
}

function initLevel() {
    character = new Character(app.loader.resources["character"].texture);
    enemy = new Enemy(app.loader.resources["enemy"].texture);
    hud = new Hud();
    hud.addText();
    console.log(enemy);

    app.stage.addChild(enemy);
    app.stage.addChild(character);
    app.stage.addChild(hud.scoretext);
    app.stage.addChild(hud.healthtext);
    document.querySelector("#game ").addEventListener("pointerdown", () => {
        //if (e.code === "Space") - ??
        let bul = new Fire(app.loader.resources["fire"].texture, character.x, character.y);
        fires.push(bul);
        app.stage.addChild(bul);
        console.log(fires);
        console.log(bul.x);
    });
    app.ticker.add(gameLoop);
}

function keysDown(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop(delta) {
    updateBg();
    enemy.move();
    updateFire(delta);
    updateFireEnemy();

    if (keys["38"] == true) {
        console.log("character");
        character.y -= 5;
    }
    if (keys["40"] == true)
        character.y += 5;

    if (keys["39"] == true)
        character.x += 5;

    if (keys["37"] == true)
        character.x -= 5;

}

function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 800, 600);
    tiling.position.set(0, 0);
    app.stage.addChild(tiling);

    return tiling;
}

function updateBg() {
    bgX = (bgX - bgSpeed);
}

function updateFire(delta) {
    for (let i = 0; i < fires.length; i++) {

        fires[i].move();

        if (fires[i].x > enemy.x && fires[i].x < enemy.x + 32 &&
            fires[i].y + 12 > enemy.y && fires[i].y < enemy.y + 32) {
            app.stage.removeChild(enemy);
            hud.updateScore();
            console.log("dead");
            fires[i].dead = true;
            enemy = new Enemy(app.loader.resources["enemy"].texture);
            app.stage.addChild(enemy);
        }

        if (fires[i].x > 800) {
            fires[i].dead = true;
        }
    }

    for (let i = fires.length - 1; i > 0; i--) {
        if (fires[i].dead) {
            app.stage.removeChild(fires[i]);
            fires.splice(i, 1);
        }
    }
}

function updateFireEnemy() {
    if (enemy.y % 100 == 0) {
        let bul = new FireEnemy(app.loader.resources["fire"].texture, enemy.x, enemy.y);
        firesenemy.push(bul);
        app.stage.addChild(bul);
    }

    for (let i = 0; i < firesenemy.length; i++) {
        firesenemy[i].move();
        if (firesenemy[i].x > character.x && firesenemy[i].x < character.x + 32 &&
            firesenemy[i].y + 12 > character.y && firesenemy[i].y < character.y + 32) {

            hud.updateHealth();
            console.log("dead");
            firesenemy[i].dead = true;
        }
        if (firesenemy[i].x < 0) {
            firesenemy[i].dead = true;
        }
    }

    for (let i = firesenemy.length - 1; i >= 0; i--) {
        if (firesenemy[i].dead) {
            app.stage.removeChild(firesenemy[i]);
            firesenemy.splice(i, 1);
        }
    }
}