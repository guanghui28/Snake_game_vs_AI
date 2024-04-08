class UI {
    constructor(game) {
        this.game = game;
        // score board
        this.scoreBoard1 = scoreBoard1;
        this.scoreBoard2 = scoreBoard2;
        this.scoreBoard3 = scoreBoard3;
        this.scoreBoard4 = scoreBoard4;
        this.startButton = startGameBtn;
        // game menu
        this.gameMenu = gameMenu;
        // game over
        this.gameOverScreen = gameOverScreen;
        // start btn
        this.startButton.addEventListener("click", () => {
            this.game.start();
        });
    }
    update() {
        this.scoreBoard1.textContent = `${this.game.player1.name}: ${this.game.player1.score}`;
        this.scoreBoard2.textContent = `${this.game.player2.name}: ${this.game.player2.score}`;
        this.scoreBoard3.textContent = `${this.game.player3.name}: ${this.game.player3.score}`;
        this.scoreBoard4.textContent = `${this.game.player4.name}: ${this.game.player4.score}`;
    }
    triggerGameOver() {
        this.game.gameOver = true;
        this.gameOverUI();
    }
    gamePlayUI() {
        this.gameMenu.style.display = "none";
        this.startButton.textContent = "Restart";
        this.gameOverScreen.style.display = "none";
    }
    gameOverUI() {
        this.gameMenu.style.display = "block";
        this.startButton.textContent = "Start";
        this.gameOverScreen.style.display = "block";
    }
}
