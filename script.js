class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width;
        this.height;
        this.cellSize = 50;
        this.marginTop = 2;
        this.columns;
        this.rows;
        this.player1;
        this.player2;
        this.player3;
        this.player4;
        this.food;
        this.gameObject;
        this.UI = new UI(this);
        this.background;

        this.eventUpdate = false;
        this.eventTimer = 0;
        this.eventInterval = 200;
        this.gameOver = true;
        this.winningScore = 2;

        window.addEventListener("resize", (e) => {
            this.resize(
                e.currentTarget.innerWidth,
                e.currentTarget.innerHeight
            );
        });
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.canvas.width = Math.floor(width - (width % this.cellSize));
        this.canvas.height = Math.floor(height - (height % this.cellSize));
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Impact";
        this.ctx.textBaseline = "top";
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.columns = Math.floor(this.width / this.cellSize);
        this.rows = Math.floor(this.height / this.cellSize);
        this.background = new Background(this);
    }
    start() {
        if (!this.gameOver) {
            this.UI.triggerGameOver();
        } else {
            this.gameOver = false;
            this.UI.gamePlayUI();
            this.player1 = new ComputerAi(
                this,
                0,
                this.marginTop,
                1,
                0,
                "orange",
                "Huy"
            );
            this.player2 = new ComputerAi(
                this,
                this.columns - 1,
                this.marginTop,
                0,
                1,
                "magenta",
                "Anyone"
            );
            this.player3 = new ComputerAi(
                this,
                this.columns - 1,
                this.rows - 1,
                -1,
                0,
                "yellow",
                "AI"
            );
            this.player4 = new Keyboard1(
                this,
                0,
                this.rows - 1,
                0,
                -1,
                "red",
                "Mine"
            );
            this.food = new Food(this);
            this.gameObject = [
                this.player1,
                this.player2,
                this.player3,
                this.player4,
                this.food,
            ];
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }
    drawGrid() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.ctx.strokeRect(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
                this.ctx.stroke();
            }
        }
    }
    handlePeriodicEvents(deltaTime) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = 0;
            this.eventUpdate = true;
        }
    }
    render(deltaTime) {
        this.handlePeriodicEvents(deltaTime);
        if (this.eventUpdate && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawGrid();
            this.background.draw();
            this.gameObject.forEach((player) => {
                player.draw();
                player.update();
            });
            // this.drawStatusText();
            this.UI.update();
        }
    }
    checkCollision(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    drawStatusText() {
        this.ctx.fillText(
            `P1: ${this.player1.score}`,
            this.cellSize,
            this.cellSize
        );
        this.ctx.fillText(
            `P2: ${this.player2.score}`,
            this.cellSize,
            this.cellSize * 2
        );
        this.ctx.fillText(
            `P3: ${this.player3.score}`,
            this.cellSize,
            this.cellSize * 3
        );
        this.ctx.fillText(
            `P4: ${this.player4.score}`,
            this.cellSize,
            this.cellSize * 4
        );
    }
}
window.addEventListener("load", () => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const game = new Game(canvas, ctx);
    game.ctx.fillStyle = "blue";

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});
