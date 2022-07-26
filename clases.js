class Entity{
    constructor (positionX, positionY, width, height, src){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.src = src;
    }
}

class Player extends Entity{
    constructor (life, dmge, positionX, positionY, speed, width, height, src){
        super(positionX, positionY, width, height, src)
        this.life = life;
        this.dmge = dmge;
        this.speed = speed;
    }

    getPosition(){
        return [this.positionX, this.positionY]
    }
    


    setPosition(newPosition){
        this.positionX = newPosition[0];
        this.positionY = newPosition[1];
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
        this.canvasWidth = 500;
        this.canvasHeigth = 500;
        this.ctx = ctx;

        this.drawEntity(this.player);
        this.foods.map(foods => this.drawEntity(foods));
        this.enemys.map(enemy => this.drawEntity(enemy)); //Recorro el array enemys con map y aplico el evento draw en cada elemento)
    }
    drawEntity(entity){
        this.ctx.drawImage(entity.src, entity.positionX, entity.positionY, entity.width, entity.height);
    }
    
    get Player(){
        this.player.positionX;
    }

    update(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);
        this.drawEntity(this.player);
        this.foods.map(foods => this.drawEntity(foods));
        this.enemys.map(enemy => this.drawEntity(enemy));
    }
    
}
   

class GameController{
    constructor(){
        const playerImage = document.getElementById("playerImg");
        const enemyImage = document.getElementById("enemyImg");
        const foodImage = document.getElementById("foodImg");
        const backgroundImage = document.getElementById("background");
        const widthStandard = 40;
        const heightStandard = 40;
        const playerSpeed = 10.3;
        const canvas = document.getElementById("escenario");
        this.movement = document.getElementById("body");
        let ctx = canvas.getContext("2d");
        let player = new Player(7, 4, 0, 400, playerSpeed,widthStandard, heightStandard, playerImage);
        let enemys = [new Enemy(2, 0, 100, 400, widthStandard, heightStandard, enemyImage), new Enemy(2, 2, 300, 400, widthStandard, heightStandard, enemyImage)];
        let foods = [new Food(2, 400, 400, widthStandard, heightStandard, foodImage), new Food(2, 150, 400, widthStandard, heightStandard, foodImage)];
        this.board = new Board(player, enemys, foods, canvas, ctx);
    }

    get player(){
        return this.board.player;
    };
    
    load(){
    this.movement.addEventListener("keydown", (e) => {
        let playerPosition = this.board.player.getPosition();
        switch(e.key){      
            case "w":
                console.log("w");
                break;
            case "s":
                console.log("s");
                break;
            case "a":
                if(playerPosition[0] >= 1 ){
                    playerPosition[0] -= 1 * this.board.player.speed;
                    this.board.player.setPosition(playerPosition);
                    this.board.update();
                    console.log(playerPosition);
                }
                break;
            case "d":
                if(playerPosition[0] <= 460){
                playerPosition[0] += 1 * this.board.player.speed;
                this.board.player.setPosition(playerPosition);
                this.board.update();
                console.log(playerPosition);
                }
                break;
        }
    });
    }
    
    play(){
        if((this.board.player.positionX + this.board.player.width/2) == (this.board.foods[0].positionX - this.board.foods[0].width/2)){
           return console.log("esta pasando");
        }
    }
    
}

let gameController = new GameController();
gameController.load();
gameController.play();