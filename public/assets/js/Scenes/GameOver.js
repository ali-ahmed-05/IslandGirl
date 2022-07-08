export default class gameOver extends Phaser.Scene {

    constructor() {
        super('gameOver');
    }

    preload() {
        // this.load.image('game_over_bg', './assets/images/game_over.png');
        // this.load.image('reset_button', './assets/images/reset.png');
    }

    create() {
        this.background = this.add.image(0, 0, "game_over_bg");
        Phaser.Display.Align.In.Center(this.background, this.add.zone(this.sys.canvas.width / 2, this.sys.canvas.height / 3, this.sys.canvas.width, this.sys.canvas.height))

        this.playButton = this.add.image(this.game.renderer.width / 2, innerHeight / 1.3, 'reset_button').setDepth(1).setScale(0.08);
        this.playButton.setInteractive();

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playButton.on('pointerover', () => {
            this.playButton.setScale(0.1)
        })
        this.playButton.on('pointerout', () => {
            this.playButton.setScale(0.08)
        })

        this.playButton.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.playButton.setScale(0.1)
            this.time.delayedCall(1000, () => {
                this.scene.start('level_1');
            })
        })
    }

    update() {
        if (this.spaceBar.isDown) {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1000, () => {
                this.scene.start('level_1');
            })
        }

    }
}