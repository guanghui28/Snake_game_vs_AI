class Background {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.image = forestMarginRepeatImg;
        this.width = this.game.cellSize * 8;
        this.height = this.game.cellSize * (this.game.marginTop + 1);
        this.repeats = this.game.width / this.width;
    }
    draw() {
        for (let i = 0; i < this.repeats; i++) {
            this.game.ctx.drawImage(
                this.image,
                this.x + i * this.width,
                this.y,
                this.width,
                this.height
            );
        }
    }
}
