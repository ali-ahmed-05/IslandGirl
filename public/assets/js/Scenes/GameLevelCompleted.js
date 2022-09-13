export default class gameLevelCompleted extends Phaser.Scene {
    #collectedCoins;

    constructor() {
        super('gameLevelCompleted');
        this.#collectedCoins = 0;
    }


    init({coins}) {
        this.#collectedCoins = coins;
    }

    preload() {
        this.load.image('game_complete', './assets/images/level_complete.png');
        this.load.image("earn", "./assets/images/earn.png");
        this.load.image("next_level", "./assets/images/next_level.png");
    }

    create() {
        this.cam = this.cameras.main;
        // this.background = this.add.image(0, 0, "game_complete").setOrigin(0, 0).scale(1,1).refreshBody();
        // this.physics.add.staticGroup().create(this.cam.midPoint.x, 0, "game_complete").setScale(1, 1).refreshBody();
        this.background = this.add.image(0, 0, "game_complete").setOrigin(0, 0);
        // this.background = this.add.image(0, 0, "game_complete");
        this.background.displayWidth = innerWidth;
        this.background.displayHeight = innerHeight;
        //Keyboard
        this.spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.levelCompleteButton = this.add
            .image(this.game.renderer.width / 1.65, innerHeight / 1.2, "next_level")
            .setScale(0.75);
        this.levelCompleteButton.setInteractive();

        this.earnButton = this.add
            .image(this.game.renderer.width / 2.8, innerHeight / 1.2, "earn")
            .setScale(0.75);
        this.earnButton.setInteractive();

        this.earnButton.on("pointerover", () => {
            this.earnButton.setScale(0.8);
        });
        this.earnButton.on("pointerout", () => {
            this.earnButton.setScale(0.75);
        });

        this.levelCompleteButton.on("pointerover", () => {
            this.levelCompleteButton.setScale(0.8);
        });
        this.levelCompleteButton.on("pointerout", () => {
            this.levelCompleteButton.setScale(0.75);
        });

        this.earnButton.on("pointerdown", async () => {
            await this.withDrawCoin();
        });

        this.levelCompleteButton.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start("level_1");
            });
        });
    }

    update() {
        if (this.spaceBar.isDown) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start("level_1");
            });
        }
    }

    async withDrawCoin() {
        try {

            let axiosHeader = {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            axios.post(
                `${window.ConstantVars.SERVER_URL}/api/admin/release`,
                {address: window.ethereum.selectedAddress, sendCoin: this.#collectedCoins},
            ).then((res) => {
                if (res.data.message)
                    alert("Successfully Earn")
                console.log({res});
                this.earnButton.destroy()
            })
                .catch(e => {
                    alert('Error Occurred while rewarding')
                    console.log(e);
                })
        } catch (e) {
            console.log('Error Occurred in withdraw coin', e)
        }
    }
}