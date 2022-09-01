
class Entity{
    constructor (positionX, positionY, width, height, src){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.src = src;
    }
}

class Background extends Entity{
    constructor(positionX, positionY, width, height, src){
        super(positionX, positionY, width, height, src)
        this.backgroundLoad = false;
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
        this.direction = "up";
    }
}

class Food extends Entity{
    constructor (heal, use, positionX, positionY, width, height, src){
        super(positionX, positionY, width, height, src)
        this.heal = heal;
        this.use = use;
    }
}

class Board{
    constructor(background, player, enemys, foods, canvas, ctx){
        this.background = background;
        this.player = player;
        this.enemys = enemys;
        this.foods = foods;
        this.canvas = canvas;
        this.canvasWidth = 500;
        this.canvasHeigth = 500;
        this.ctx = ctx;

        //esto no se hace mas aca, ahora lo hace setinterval
        //this.drawEntity(this.background);
        //this.drawEntity(this.player);
        //this.foods.map(foods => this.drawEntity(foods));
        //this.enemys.map(enemy => this.drawEntity(enemy));
    }

    update(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);
        this.drawEntity(this.background);
        this.drawEntity(this.player);
        this.foods.map(foods => this.drawEntity(foods));
        this.enemys.map(enemy => this.drawEntity(enemy)); 
    }

    drawEntity(entity){
        this.ctx.drawImage(entity.src, entity.positionX, entity.positionY, entity.width, entity.height);
    }    
    
    get Player(){
        this.player.positionX;
    }


    }



class GameController{
    constructor(playerImageSrc){
        const playerImage = document.createElement('img');
        playerImage.src = playerImageSrc;
        const enemyImage = document.createElement('img');
        enemyImage.src = "images/enemy.png";
        const foodImage = document.createElement('img');
        foodImage.src = "images/food.png";
        const backgroundImage = document.createElement('img');
        backgroundImage.src = "images/background.png";
        const widthStandard = 40;
        const heightStandard = 40;
        const widthPlayer = 60;
        const heightPlayer = 80;
        const playerSpeed = 10.3;
        const canvas = document.getElementById("escenario");
        let positionBeforeX = parseInt(localStorage.getItem("playerPositionX"));
        if (isNaN(positionBeforeX)){
            positionBeforeX = 0;
        }
        let positionBeforeY = 400;
        this.movement = document.getElementById("body");
        let ctx = canvas.getContext("2d");
        let background = new Background(0, 0, 500, 500, backgroundImage);
        let player = new Player(7, 4, positionBeforeX, positionBeforeY, playerSpeed,widthPlayer, heightPlayer, playerImage);
        let enemys = [new Enemy(4, 2, 100, 400, widthStandard, heightStandard, enemyImage), new Enemy(4, 2, 300, 400, widthStandard, heightStandard, enemyImage)];
        let foods = [new Food(2, 1, 400, 400, widthStandard, heightStandard, foodImage), new Food(2, 1, 150, 400, widthStandard, heightStandard, foodImage)];
        this.board = new Board(background, player, enemys, foods, canvas, ctx);
        this.count = 5;
        
        this.lifeHTML = document.getElementById("life")
        var gameControllerInstance = this
        this.interval = setInterval(function(){
            gameControllerInstance.board.update()
            gameControllerInstance.lifeHTML.innerHTML = "Tenés " + gameControllerInstance.board.player.life + " de vida!";

            //moviendo los enemigos de a un pixel
            gameControllerInstance.board.enemys.map(enemy => gameControllerInstance.moveEnemy(enemy));

            //chequeando colisiones
            gameControllerInstance.checkEnemysCollision()
            gameControllerInstance.checkFoodsCollision()

        }, 10);
    }

    moveEnemy(enemy){
        if (enemy.direction == "up"){
            enemy.positionY = enemy.positionY - 1;
        }
        if (enemy.direction == "down"){
            enemy.positionY = enemy.positionY + 1;
        }
        if (enemy.positionY == 200){
                enemy.direction = "down";
        }
        if (enemy.positionY == 400){
            enemy.direction = "up";
        }
    }

    get player(){
        return this.board.player;
    };


    collisionX(obj1, obj2){
        let limitLeftObj1 =  obj1.positionX - obj1.width/2;
        let limitRightObj1 = obj1.positionX + obj1.width/2;
        let limitLeftObj2 = obj2.positionX - obj2.width/2;
        let limitRightObj2 = obj2.positionX + obj2.width/2;
        if(limitLeftObj2 <= limitRightObj1 && limitRightObj1 <= limitRightObj2){
            return true;
        }
        if(limitLeftObj2 <= limitLeftObj1 && limitLeftObj1 <= limitRightObj2){
            return true;
        }
        return false;
    };

    collisionY(obj1, obj2){
        let limitLeftObj1 =  obj1.positionY - obj1.height/2;
        let limitRightObj1 = obj1.positionY + obj1.height/2;
        let limitLeftObj2 = obj2.positionY - obj2.height/2;
        let limitRightObj2 = obj2.positionY + obj2.height/2;
        if(limitLeftObj2 <= limitRightObj1 && limitRightObj1 <= limitRightObj2){
            return true;
        }
        if(limitLeftObj2 <= limitLeftObj1 && limitLeftObj1 <= limitRightObj2){
            return true;
        }
        return false;
    };


    checkEnemysCollision(){
        let gameController = this;
        let player = this.board.player;
        this.board.enemys.map(function(enemy){
            if(gameController.collisionX(player, enemy) && gameController.collisionY(player, enemy)){
                player.life -= enemy.dmge;
                enemy.life -= player.dmge;
            }
        });
        this.board.enemys = this.board.enemys.filter(enemy => enemy.life > 0);
    };

    checkFoodsCollision(){
        var gameController = this;
        var player = this.board.player;
        this.board.foods.map(function(food){
            if(gameController.collisionX(player, food)){
                player.life += food.heal;
                food.use -= 1;
            }
            console.log(player.life); 
        });
        this.board.foods = this.board.foods.filter(food => food.use > 0);
    };
    
    load(){
       

    this.movement.addEventListener("keydown", (e) => {
        let playerPosition = this.board.player.getPosition();
        switch(e.key){
            case "w":
                if(playerPosition[1] >= 1 ){
                   
                }
                break;
            case "s":
                console.log("s");
                break;
            case "a":
                if(playerPosition[0] >= 1 ){
                    playerPosition[0] -= 1 * this.board.player.speed;
                    this.board.player.setPosition(playerPosition);
                    this.count += -1;
                if(this.count == 0){
                    localStorage.setItem("playerPositionX", playerPosition[0]);
                    this.count = 5;
                }};
                this.checkEnemysCollision();
                this.checkFoodsCollision();
                break;
            case "d":
                if(playerPosition[0] <= 460){
                playerPosition[0] += 1 * this.board.player.speed;
                this.board.player.setPosition(playerPosition);
                this.count += -1;
                if(this.count == 0){
                    localStorage.setItem("playerPositionX", playerPosition[0]);
                    this.count = 5;
                }};
                break;
        }
    });
};
    
}

const comienzo = document.createElement('img');
comienzo.src = "images/comienzo.png";
const canvas = document.getElementById("escenario");
let ctx = canvas.getContext("2d");

setTimeout(() => {
    ctx.drawImage(comienzo, 0, 0, 500, 500)
},1000);


const body = document.getElementById("body");
body.addEventListener("click", () =>
fetch("https://api.npoint.io/caa675e5edd5ab2c8a2b")
.then(response => response.json())
.then(json => {
    let randomNumber = Math.round(Math.random(json.cat.length)*3,5)
    let gameController = new GameController(json.cat[randomNumber].src);
    //eventos del timer

    var timer = new Timer;
    let config = {
        startValues: [0,10,0,0,0],
        target: [0,0,0,0,0],
        countdown: true 
    }
    
    const gameOver = document.createElement('img');
    gameOver.src = "images/game.png";
    const felicitaciones = document.createElement('img');
    felicitaciones.src = "images/felicitaciones.png";
    const canvas = document.getElementById("escenario");
    
    let ctx = canvas.getContext("2d");
    timer.start(config);
    timer.addEventListener('secondsUpdated', function(e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
    });
    
    timer.addEventListener('stopped', function(e) {
    clearInterval(gameController.interval)
    ctx.clearRect(0, 0, 500, 500);
    if (gameController.board.player.life >= 7){
        ctx.drawImage(felicitaciones, 0, 0, 500, 500)

    } else {
        ctx.drawImage(gameOver, 0, 0, 500, 500)
    }
    });


    //


    gameController.load();

}))