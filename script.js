class Game {
    constructor(canvas, ctx, canvas2, ctx2) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas2 = canvas2;
        this.ctx2 = ctx2;
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
        this.soundControl = new Sound(this);
        this.background;

        this.eventUpdate = false;
        this.eventTimer = 0;
        this.eventInterval = 200;
        this.gameOver = true;
        this.winningScore = 10;
        this.debug = false;
        this.timer = 0;
        this.particles = [];
        this.numberOfParticles = 50;
        this.createParticlePool();

        // short key
        window.addEventListener("keydown", (e) => {
            // toggle full screen
            if (e.key === "-") {
                this.toggleFullScreen();
            } else if (e.key.toLowerCase() === "=") {
                this.debug = !this.debug;
            }
        });

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

        this.canvas2.width = this.canvas.width;
        this.canvas2.height = this.canvas.height;
        this.ctx2.fillStyle = "gold";
        this.ctx2.lineWidth = 2;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.columns = Math.floor(this.width / this.cellSize);
        this.rows = Math.floor(this.height / this.cellSize);
        this.background = new Background(this);
    }
    initPlayer1() {
        const image = this.UI.player1Character.value;
        const name = this.UI.player1Name.value;
        if (this.UI.player1Controls.value === "arrows") {
            this.player1 = new Keyboard1(
                this,
                0,
                this.marginTop,
                1,
                0,
                "orange",
                name,
                image
            );
        } else {
            this.player1 = new ComputerAi(
                this,
                0,
                this.marginTop,
                1,
                0,
                "orange",
                name,
                image
            );
        }
    }
    initPlayer2() {
        const image = this.UI.player2Character.value;
        const name = this.UI.player2Name.value;

        if (this.UI.player1Controls.value === "wsad") {
            this.player2 = new Keyboard2(
                this,
                this.columns - 1,
                this.marginTop,
                0,
                1,
                "magenta",
                name,
                image
            );
        } else {
            this.player2 = new ComputerAi(
                this,
                this.columns - 1,
                this.marginTop,
                0,
                1,
                "magenta",
                name,
                image
            );
        }
    }
    initPlayer3() {
        const image = this.UI.player3Character.value;
        const name = this.UI.player3Name.value;

        this.player3 = new ComputerAi(
            this,
            this.columns - 1,
            this.rows - 1,
            -1,
            0,
            "yellow",
            name,
            image
        );
    }
    initPlayer4() {
        const image = this.UI.player4Character.value;
        const name = this.UI.player4Name.value;

        this.player4 = new ComputerAi(
            this,
            0,
            this.rows - 1,
            0,
            -1,
            "red",
            name,
            image
        );
    }
    createParticlePool() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    getParticle() {
        return this.particles.find((particle) => particle.free);
    }
    handleParticles() {
        this.ctx2.clearRect(0, 0, this.width, this.height);
        this.particles.forEach((particle) => {
            particle.draw();
            particle.update();
        });
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    start() {
        if (!this.gameOver) {
            this.UI.triggerGameOver();
            this.soundControl.play(this.soundControl.restart);
        } else {
            this.soundControl.play(this.soundControl.start);
            this.gameOver = false;
            this.UI.gamePlayUI();
            this.initPlayer1();
            this.initPlayer2();
            this.initPlayer3();
            this.initPlayer4();
            this.food = new Food(this);
            this.gameObject = [
                this.player1,
                this.player2,
                this.player3,
                this.player4,
                this.food,
            ];
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.timer = 0;
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
        if (!this.gameOver) this.timer += deltaTime;
        if (this.eventUpdate && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            if (this.debug) this.drawGrid();
            this.background.draw();
            this.gameObject.forEach((player) => {
                player.draw();
                player.update();
            });
            // this.drawStatusText();
            this.UI.update();
        }
        this.handleParticles();
    }
    formattedTimer() {
        return (this.timer * 0.001).toFixed(1);
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
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const game = new Game(canvas, ctx, canvas2, ctx2);
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
