export default class gameLevelCompleted extends Phaser.Scene {

    constructor() {
        super('gameLevelCompleted');
    }

    init() {
        (() => {
            axios.post(
                `${window.ConstantVars.SERVER_URL}/api/admin/release`,
                {token: '0x5e19ea95f8d27769033beb0ed3b53f5d3f840c40c68a01ffeb8b3b9e0afc8808'}
            ).then((res) => {
                console.log(res, '######################');
            })
        })()
    }

    preload() {
        this.load.image('game_complete', './assets/images/level_complete.png');
    }

    create() {
        // this.cam = this.cameras.main;
        // this.physics.add.staticGroup().create(this.cam.midPoint.x, 400, "game_complete").setScale(1, 1).refreshBody();
        this.background = this.add.image(0, 0, "game_complete").setOrigin(0, 0);
        this.background.displayWidth = this.textures.get('game_complete').getSourceImage().width;
        this.background.displayHeight = this.sys.canvas.height;

        Phaser.Display.Align.In.Center(this.background, this.add.zone(this.sys.canvas.width / 2, (this.sys.canvas.height + 200) / 2, this.sys.canvas.width, this.sys.canvas.height))
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#141a3c");
        //Keyboard
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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