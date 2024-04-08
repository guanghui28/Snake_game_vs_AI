class Food {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.reset();
    }
    reset() {
        this.x = Math.floor(Math.random() * this.game.columns);
        this.y = Math.floor(Math.random() * (this.game.rows - 2) + 2);
    }
    draw() {
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillRect(
            this.x * this.game.cellSize,
            this.y * this.game.cellSize,
            this.game.cellSize,
            this.game.cellSize
        );
    }
    update() {}
}
