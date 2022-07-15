class Entity{
    constructor (positionX, positionY, width, height, src){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this. height = height;
        this.src = src;
    }
}

class Player extends Entity{
    constructor (life, dmge, positionX, positionY, width, height, src){
        super(positionX, positionY, width, height, src)
        this.life = life;
        this.dmge = dmge;
    }
}

class Enemy extends Entity{
    constructor (life, dmge, positionX, positionY, width, height, src){
        super(positionX, positionY, width, height, src)
        this.life = life;
        this.dmge = dmge;
    }
}

class Food extends Entity{
    constructor (heal, positionX, positionY, width, height, src){
        super(positionX, positionY, width, height, src)
        this.heal = heal;
    }
}

class Board{
    constructor(player, enemys, foods, canvas, ctx){
        this.player = player;
        this.enemys = enemys;
        this.foods = foods;
        this.canvas = canvas;
        this.ctx = ctx;

        this.drawEntity(this.player);
    }
    drawEntity(entity){
        this.ctx.drawImage(entity.src, entity.positionX, entity.positionY, entity.width, entity.height);
    }
}

class GameController{
    constructor(){
        const playerImage = document.getElementById("source");
        const enemyImage = "";
        const foodImage = "";
        const widthStandard = 40;
        const heightStandard = 40;      
        const canvas = document.getElementById("escenario");
        let ctx = canvas.getContext("2d");
        //-----------
        let player = new Player(7, 4, 0, 0, widthStandard, heightStandard, playerImage);
        let enemys = [new Enemy(2, 1, 4, 0, widthStandard, heightStandard, enemyImage), new Enemy(2, 1, 9, 0, widthStandard, heightStandard, enemyImage)];
        let foods = [new Food(2, -2, 0, widthStandard, heightStandard, foodImage), new Food(2, 10, 0, widthStandard, heightStandard, foodImage)];
        // ----------
        this.board = new Board(player, enemys, foods, canvas, ctx);
    }
}

let gameController = new GameController();

