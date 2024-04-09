class Food {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.image = foodImg;
        this.spriteWidth = 200;
        this.spriteHeight = 400;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
        this.maxFrame = 8;
        this.reset();
    }
    reset() {
        this.x = Math.floor(Math.random() * this.game.columns);
        this.y = Math.floor(Math.random() * (this.game.rows - 2) + 2);
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
    }
    draw() {
        if (this.game.debug) {
            this.game.ctx.fillStyle = "white";
            this.game.ctx.fillRect(
                this.x * this.game.cellSize,
                this.y * this.game.cellSize,
                this.game.cellSize,
                this.game.cellSize
            );
        }

        this.game.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x * this.game.cellSize,
            (this.y - 1) * this.game.cellSize,
            this.game.cellSize,
            this.game.cellSize * 2
        );
    }
    update() {
        if (this.frameX < this.maxFrame) this.frameX++;
    }
}
