export default class Loader extends Phaser.Scene {

    constructor() {
        super('Loader');
    }

    preload() {
    }

    create() {

        this.load.atlas('bg_1', './assets/images/tree.png', './assets/images/tree.json');
        this.load.image('bg_1', './assets/images/bg_1.png');
        this.load.image('bg_2', './assets/images/bg_2.png');
        this.load.image('bg_3', './assets/images/bg_3.png');
        this.load.image('bg_4', './assets/images/bg_0.png');
        this.load.image('tree', './assets/images/tree.png');
        this.load.image('floor', './assets/images/floor.png');
        // this.load.image('level_1_board', './assets/images/level_1_board.png');

        this.load.image('counter', './assets/images/coin_counter.png');
        this.load.image('pause', './assets/images/pause_btn.png');
        this.load.image('life', './assets/images/life.png');

        this.load.image('hurdle_1', './assets/images/hurdle/hurdle_1.png');
        this.load.image('hurdle_2', './assets/images/hurdle/hurdle_2.png');
        this.load.image('hurdle_3', './assets/images/hurdle/hurdle_3.png');

        this.load.image('ditch', './assets/images/ditch.png');
        this.load.image('ditch_block', './assets/images/ditch_block.png');
        this.load.image('fire', './assets/images/fire.png');

        this.load.atlas('grass', './assets/images/grass.png', './assets/images/grass.json');

        this.load.multiatlas('crab_dead', './assets/images/crab_dead/crab_dead.json', './assets/images/crab_dead');
        this.load.atlas('crab', './assets/images/crab/crab_walk.png', './assets/images/crab/crab_walk.json');

        this.load.atlas('octopus', './assets/images/octopus/octopus.png', './assets/images/octopus/octopus.json');
        this.load.atlas('octopus_dead', './assets/images/octopus_dead/octopus_dead.png', './assets/images/octopus_dead/octopus_dead.json');

        this.load.atlas('coin', './assets/images/coin.png', './assets/images/coin.json');

        this.load.audio('ping', 'assets/audio/coin.wav'); //Load the coin getting sound file


        //Game Over Scene
        this.load.image('game_over_bg', './assets/images/game_over.png');
        this.load.image('reset_button', './assets/images/reset.png');


        this.container = this.add.container(0, 0);

        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        var progressBar = new Phaser.Geom.Rectangle(0, 0, 400, 50);
        var progressBarFill = new Phaser.Geom.Rectangle(5, 5, 290, 40);

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRectShape(progressBar);

        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(progressBarFill);

        this.loadingText = this.add.text(70, 60, "Loading: ", {
            fontSize: '32px',
            fill: '#FFF'
        });


        this.container.add(this.graphics);
        this.container.add(this.newGraphics);
        this.container.add(this.loadingText);
        Phaser.Display.Align.In.Center(this.container, this.add.zone(this.sys.canvas.width / 2.5, (this.sys.canvas.height + 50) / 2.5, this.sys.canvas.width, this.sys.canvas.height))
        // console.log(this.container.setOriginX=10);
        // console.log(this.container);
        this.load.on('progress', (e) => {
            // console.log(Math.round(e * 100));
            this.newGraphics.clear();
            this.newGraphics.fillStyle(0x3587e2, 1);
            this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(5, 5, e * 390, 40));

            this.percentage = Math.round(e * 100);
            this.loadingText.setText("Loading: " + this.percentage + "%");

        });
        this.load.on('complete', (e) => {
            // this.scene.start('level_1');
            this.scene.start('titleScene');
        });
        this.load.start();


    }

    update() {


    }
}