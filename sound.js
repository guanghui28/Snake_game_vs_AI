class Sound {
    constructor(game) {
        this.game = game;
        this.win = winSound;
        this.start = startSound;
        this.restart = restartSound;
        this.button = buttonSound;
        this.badFood = badFoodSound;
        this.bite1 = bite1Sound;
        this.bite2 = bite2Sound;
        this.bite3 = bite3Sound;
        this.bite4 = bite4Sound;
        this.bite5 = bite5Sound;
        this.biteSounds = [
            this.bite1,
            this.bite2,
            this.bite3,
            this.bite4,
            this.bite5,
        ];
    }
    play(sound) {
        sound.currentTime = 0;
        sound.play();
    }
}
