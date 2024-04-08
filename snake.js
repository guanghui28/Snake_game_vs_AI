class Snake {
    constructor(game, x, y, speedX, speedY, color, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.color = color;
        this.moving = true;
        this.score = 0;
        this.length = 2;
        this.segments = [];
        this.readyToTurn = true;
        this.name = name;
    }
    update() {
        this.readyToTurn = true;
        //eat food
        if (this.game.checkCollision(this, this.game.food)) {
            this.game.food.reset();
            this.score++;
            this.length++;
        }
        // boundaries
        if (
            (this.x <= 0 && this.speedX < 0) ||
            (this.y <= this.game.marginTop && this.speedY < 0) ||
            (this.x >= this.game.columns - 1 && this.speedX > 0) ||
            (this.y >= this.game.rows - 1 && this.speedY > 0)
        ) {
            this.moving = false;
        }
        if (this.moving) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.segments.unshift({
                x: this.x,
                y: this.y,
            });
            if (this.segments.length > this.length) {
                this.segments.pop();
            }
        }
        // win condition
        if (this.score >= this.game.winningScore) {
            this.game.UI.triggerGameOver();
        }
    }
    draw() {
        this.segments.forEach((segment, index) => {
            if (index === 0) this.game.ctx.fillStyle = "black";
            else this.game.ctx.fillStyle = this.color;

            this.game.ctx.fillRect(
                segment.x * this.game.cellSize,
                segment.y * this.game.cellSize,
                this.width,
                this.height
            );
        });
    }
    turnUp() {
        if (this.speedY === 0 && this.readyToTurn) {
            this.moving = true;
            this.speedX = 0;
            this.speedY = -1;
            this.readyToTurn = false;
        }
    }
    turnDown() {
        if (this.speedY === 0 && this.readyToTurn) {
            this.moving = true;
            this.speedX = 0;
            this.speedY = 1;
            this.readyToTurn = false;
        }
    }
    turnLeft() {
        if (this.speedX === 0 && this.readyToTurn) {
            this.moving = true;
            this.speedX = -1;
            this.speedY = 0;
            this.readyToTurn = false;
        }
    }
    turnRight() {
        if (this.speedX === 0 && this.readyToTurn) {
            this.moving = true;
            this.speedX = 1;
            this.speedY = 0;
            this.readyToTurn = false;
        }
    }
}

class Keyboard1 extends Snake {
    constructor(game, x, y, speedX, speedY, color, name) {
        super(game, x, y, speedX, speedY, color, name);

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.turnUp();
                    break;
                case "ArrowDown":
                    this.turnDown();
                    break;
                case "ArrowLeft":
                    this.turnLeft();
                    break;
                case "ArrowRight":
                    this.turnRight();
                    break;
            }
        });
    }
}

class Keyboard2 extends Snake {
    constructor(game, x, y, speedX, speedY, color, name) {
        super(game, x, y, speedX, speedY, color, name);

        window.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case "w":
                    this.turnUp();
                    break;
                case "s":
                    this.turnDown();
                    break;
                case "a":
                    this.turnLeft();
                    break;
                case "d":
                    this.turnRight();
                    break;
            }
        });
    }
}

class ComputerAi extends Snake {
    constructor(game, x, y, speedX, speedY, color, name) {
        super(game, x, y, speedX, speedY, color, name);

        this.turnTimer = 0;
        this.turnInterval = Math.floor(Math.random() * this.game.columns + 1); // change direction after every 5 frames
    }
    update() {
        super.update();
        if (this.turnTimer < this.turnInterval) {
            this.turnTimer += 1;
        } else {
            this.turnTimer = 0;
            this.turnInterval = Math.floor(
                Math.random() * this.game.columns - 1
            );
            this.turn();
        }
    }
    turn() {
        if (this.speedY === 0) {
            Math.random() < 0.5 ? this.turnUp() : this.turnDown();
        } else if (this.speedX === 0) {
            Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
        }
    }
}
