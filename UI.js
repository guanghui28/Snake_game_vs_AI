class UI {
    constructor(game) {
        this.game = game;
        // score board
        this.scoreBoard1 = scoreBoard1;
        this.scoreBoard2 = scoreBoard2;
        this.scoreBoard3 = scoreBoard3;
        this.scoreBoard4 = scoreBoard4;
        // game menu
        this.gameMenu = gameMenu;
        // game over
        this.gameOverScreen = gameOverScreen;
        // start btn
        this.startButton = startGameBtn;
        this.startButton.addEventListener("click", () => {
            this.game.start();
        });
        // fullscreen btn
        this.fullScreenBtn = fullScreenBtn;
        this.fullScreenBtn.addEventListener("click", () => {
            this.game.toggleFullScreen();
            this.game.soundControl.play(this.game.soundControl.button);
        });
        // debug btn
        this.debugBtn = debugBtn;
        this.debugBtn.addEventListener("click", () => {
            this.game.debug = !this.game.debug;
            this.game.soundControl.play(this.game.soundControl.button);
        });
        // controls
        this.player1Controls = player1Controls;
        this.player2Controls = player2Controls;
        this.player3Controls = player3Controls;
        this.player4Controls = player4Controls;
        // player name
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player3Name = player3Name;
        this.player4Name = player4Name;
        // player character
        this.player1Character = player1Character;
        this.player2Character = player2Character;
        this.player3Character = player3Character;
        this.player4Character = player4Character;
        // message
        this.message1 = message1;
        this.message2 = message2;
    }
    update() {
        this.scoreBoard1.textContent = `${this.game.player1.name}: ${this.game.player1.score}`;
        this.scoreBoard2.textContent = `${this.game.player2.name}: ${this.game.player2.score}`;
        this.scoreBoard3.textContent = `${this.game.player3.name}: ${this.game.player3.score}`;
        this.scoreBoard4.textContent = `${this.game.player4.name}: ${this.game.player4.score}`;
    }
    triggerGameOver(winner) {
        this.game.gameOver = true;
        this.gameOverUI();
        if (winner) {
            this.message1.textContent = `${winner.name} wins!`;
            this.message2.textContent = `Time: ${this.game.formattedTimer()} seconds.`;
            for (let i = 0; i < this.game.numberOfParticles; i++) {
                const particle = this.game.getParticle();
                if (particle) {
                    particle.start(
                        Math.random() * this.game.width,
                        this.game.height * 0.9,
                        "gold"
                    );
                }
            }
        } else {
            this.message1.textContent = "Welcome to the battle arena!";
            this.message2.textContent = "Choose your fighter!";
        }
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
