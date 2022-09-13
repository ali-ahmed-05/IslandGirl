const world_config = {
    worldWidth: 9500 * 4,
    worldHeight: innerHeight - 200
};

const player_config = {
    player_speed: 350,
    player_jumpspeed: -700,
};

export default class level_1 extends Phaser.Scene {

    constructor() {
        super('level_1');
    }

    init(data) {
        switch (data.player) {
            case 'Lily':
                this.currentPlayer = 'hero'
                break;
            case 'Manda':
                this.currentPlayer = 'hero1'
                break;
            case 'Chralotte':
                this.currentPlayer = 'hero2'
                break;
            case 'Ria':
                this.currentPlayer = 'hero3'
                break;
            case 'Alice':
                this.currentPlayer = 'hero4'
                break;
            case 'Esmeralda':
                this.currentPlayer = 'hero5'
                break;
            default:
                this.currentPlayer = 'hero6'
                break;
        }
        this.deadAnimation = this.currentPlayer + '_dead';
    }

    preload() {
        this.load.image('level_1_board', './assets/images/level_1_board.png');

        /* TODO:: Choose Character on Selection*/
        if (!this.scene.scene.textures.exists('hero'))
            this.load.multiatlas('hero', `./assets/images/${this.currentPlayer}/hero.json`, `./assets/images/${this.currentPlayer}`);

        if (!this.scene.scene.textures.exists('hero_dead'))
            this.load.multiatlas('hero_dead', `./assets/images/${this.currentPlayer}_dead/hero_dead.json`, `./assets/images/${this.currentPlayer}_dead`);

        /* TODO:: Character Lily*/
        // this.load.multiatlas('hero', './assets/images/hero/hero.json', './assets/images/hero');
        // this.load.multiatlas('hero_dead', './assets/images/hero_dead/hero_dead.json', './assets/images/hero_dead');

        /* TODO:: Character Manda*/
        // this.load.multiatlas('hero', './assets/images/hero1/hero.json', './assets/images/hero1');
        // this.load.multiatlas('hero_dead', './assets/images/hero1_dead/hero_dead.json', './assets/images/hero1_dead');

        /* TODO:: Character Chralotte*/
        // this.load.multiatlas('hero', './assets/images/hero2/hero.json', './assets/images/hero2');
        // this.load.multiatlas('hero_dead', './assets/images/hero2_dead/hero_dead.json', './assets/images/hero2_dead');

        /* TODO:: Character Ria*/
        // this.load.multiatlas('hero', './assets/images/hero3/hero.json', './assets/images/hero3');
        // this.load.multiatlas('hero_dead', './assets/images/hero3_dead/hero_dead.json', './assets/images/hero3_dead');

        /* TODO:: Character Alice*/
        // this.load.multiatlas('hero', './assets/images/hero4/hero.json', './assets/images/hero4');
        // this.load.multiatlas('hero_dead', './assets/images/hero4_dead/hero_dead.json', './assets/images/hero4_dead');

        /* TODO:: Character Esmeralda*/
        // this.load.multiatlas('hero', './assets/images/hero5/hero.json', './assets/images/hero5');
        // this.load.multiatlas('hero_dead', './assets/images/hero5_dead/hero_dead.json', './assets/images/hero5_dead');

        // this.load.multiatlas('crab_dead', './assets/images/crab_dead/crab_dead.json', './assets/images/crab_dead');
        // this.load.atlas('crab', './assets/images/crab/crab_walk.png', './assets/images/crab/crab_walk.json');

        // this.load.atlas('octopus', './assets/images/octopus/octopus.png', './assets/images/octopus/octopus.json');
        // this.load.atlas('octopus_dead', './assets/images/octopus_dead/octopus_dead.png', './assets/images/octopus_dead/octopus_dead.json');

        // this.load.atlas('coin', './assets/images/coin.png', './assets/images/coin.json');

        // this.load.audio('ping', 'assets/audio/coin.wav'); //Load the coin getting sound file

        this.count = 0;
        this.score = 0;
        this.gameOver = false;


        this.game.scale.scaleMode = Phaser.Scale.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.lastCoinPlacement = 0;
        this.coinPlacement = 0;
        this.touchGroud = false;
        // this.game.stage.backgroundColor = '#eee';

    }

    create() {


        this.level_start = this.add.image(400, innerHeight - 90, "level_1_board");
        this.level_start.setScale(.1)
        this.level_start.setDepth(1)
        // console.log('==>', window.devicePixelRatio);
        this.coinSound = this.sound.add('ping'); //Add the ping sound to the audio player
        // this.bg_4 = this.add.tileSprite(1700, 310, world_config.worldWidth, 0, 'bg_4');
        // this.bg_4 = this.add.tileSprite(0, 0, world_config.worldWidth * 10, 300, 'bg_4').setScrollFactor(.27);

        this.bg_4_sprite_required = Math.round((world_config.worldWidth) / this.textures.get('bg_4').getSourceImage().width);
        for (let index = 0; index < this.bg_4_sprite_required; index++) {
            this.bg_4 = this.add.sprite(this.textures.get('bg_4').getSourceImage().width * index, 0, 'bg_4', null).setScrollFactor(0.2);
            this.bg_4.setOrigin(0, 0);
            this.bg_4.displayHeight = innerHeight + 20;
        }

        // this.bg_3_sprite_required = Math.round((world_config.worldWidth) / this.textures.get('bg_3').getSourceImage().width / 1.3);
        // for (let index = 0; index < this.bg_3_sprite_required; index++) {
        //     this.bg_3 = this.add.sprite(this.textures.get('bg_3').getSourceImage().width * index, 0, 'bg_3', null).setScrollFactor(0.2);
        //     this.bg_3.setOrigin(0, 0);
        //     this.bg_3.displayHeight = innerHeight / 1.3;
        // }


        // this.bg_2_sprite_required = Math.round((world_config.worldWidth * 5) / this.textures.get('bg_2').getSourceImage().width / 1.2);
        // for (let index = 0; index < this.bg_2_sprite_required; index++) {
        //     this.bg_2 = this.add.sprite(this.textures.get('bg_2').getSourceImage().width * index, 0, 'bg_2', null).setScrollFactor(0.2);
        //     this.bg_2.setOrigin(0, 0);
        //     this.bg_2.displayHeight = innerHeight / 1.2;
        // }

        // const animTreeConfig = {
        //     key: 'treeAnim',
        //     frames: 'bg_1',
        //     frameRate: 7,
        //     repeat: -1
        // };
        // this.anims.create(animTreeConfig);

        // this.bg_1_sprite_required = Math.round((world_config.worldWidth * 5) / this.textures.get('bg_1').getSourceImage().width);
        // for (let index = 0; index < this.bg_1_sprite_required; index++) {
        //     this.bg_1 = this.add.sprite(this.textures.get('bg_1').getSourceImage().width * index, game.config.height - 320, 'bg_1', null).setScrollFactor(0.2);
        //     this.bg_1.setOrigin(0, 0);
        //     this.bg_1.play('treeAnim');

        //     // this.bg_1.displayHeight = innerHeight / 1.2;
        // }


        // const animGrassConfig = {
        //     key: 'grassAnim',
        //     frames: 'grass',
        //     frameRate: 5,
        //     repeat: -1
        // };
        // this.anims.create(animGrassConfig);

        // this.grass_sprite_required = Math.round((world_config.worldWidth * 5) / this.textures.get('grass').getSourceImage().width);
        // for (let index = 0; index < this.grass_sprite_required; index++) {
        //     this.grass = this.add.sprite(this.textures.get('grass').getSourceImage().width * index, game.config.height - 200, 'grass', null).setScrollFactor(0.2);
        //     this.grass.setOrigin(0, 0);
        //     this.grass.play('grassAnim');
        // }

        // Player
        const animHeroConfig = {
            key: 'heroWalk',
            frames: 'hero',
            frameRate: this.currentPlayer === 'hero'
                ? 140
                : this.currentPlayer === 'hero4'
                    ? 40
                    : 60,
            repeat: 1
        };
        this.anims.create(animHeroConfig);

        const animDeadConfig = {
            key: 'heroDead',
            frames: 'hero_dead',
            frameRate: 120,
            repeat: 0
        };
        this.anims.create(animDeadConfig);

        this.playerShadow = this.physics.add.sprite(140, 0, 'coin', 'frame_0000', 8);
        this.playerShadow.setScale(0.09, 0.01);
        this.playerShadow.setCollideWorldBounds(true);
        this.playerShadow.setOrigin(0);
        this.playerShadow.setDepth(1)
        this.playerShadow.tint = 0x000000;
        this.playerShadow.alpha = 0.6;
        this.playerShadow.setGravityY(9999999);

        this.playerBound = this.physics.add.sprite(140, 0, 'coin', 'frame_0000', 8);
        this.playerBound.setCollideWorldBounds(true);
        this.playerBound.setScale(0.09, 0.2);
        this.playerBound.setOrigin(-.2, 0);
        this.playerBound.setDepth(1)
        this.playerBound.visible = false;


        this.player = this.physics.add.sprite(0, 0, 'hero', 'frame_0000', 8);
        this.player.setScale(0.16);
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0);
        this.player.width = 20
        this.player.setDepth(1)


        // Floor
        this.floor = this.physics.add.staticGroup();
        this.ditchBlock = this.physics.add.staticGroup();
        this.ditchCounter = 0;
        this.floor_sprite_required = Math.ceil((world_config.worldWidth) / this.textures.get('floor').getSourceImage().width);
        for (let index = 0; index < this.floor_sprite_required * 2; index++) {
            this.ditchCounter++;
            if (this.ditchCounter < 3) {
                this.floor.create(this.textures.get('floor').getSourceImage().width * index, innerHeight + 40, 'floor');
            } else if (this.ditchCounter == 3) {
                this.ditchCounter = 0;
                this.floor.create(this.textures.get('ditch').getSourceImage().width * index, innerHeight + 40, 'ditch');
                this.ditchBlock.create((this.textures.get('ditch').getSourceImage().width * index) - 50, innerHeight + 10, "ditch_block").setScale(0.09).refreshBody();
                this.physics.add.overlap(this.playerBound, this.ditchBlock, this.dropToDitch, null, this)
            }

        }


        // this.scaleRatio = window.devicePixelRatio / 15;
        // console.log(this.scaleRatio);
        // this.player.setScale(this.scaleRatio);
        // console.log(this.player);
        // // this.player.anims.play('heroWalk', true);


        // // Coin
        const animCoinConfig = {
            key: 'coinFlipping',
            frames: 'coin',
            frameRate: 8,
            repeat: -1
        };
        this.anims.create(animCoinConfig);

        this.coins = this.physics.add.staticGroup();
        for (let index = 1; index < 5; index++) {
            this.coinPlacement = 3000 + (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - 50, "coin").setScale(0.07).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement + 1000

        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.07).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement

        for (let index = 5; index > 0; index--) {
            this.coinPlacement = this.lastCoinPlacement - (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.07).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement + 3000


        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 400)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.07).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement;

        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100), "coin").setScale(0.07).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement + 1000;

        this.coinPlacement = this.lastCoinPlacement + 200
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (600), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (600), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (500), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (300), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 2200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 2400;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (600), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (500), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (300), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (600), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (500), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (300), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();


        this.lastCoinPlacement = this.coinPlacement + 2000;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (600), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (500), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (300), "coin").setScale(0.07).refreshBody();

        this.lastCoinPlacement = this.coinPlacement + 200;

        this.coinPlacement = this.lastCoinPlacement
        this.coins.create(this.coinPlacement, innerHeight - (400), "coin").setScale(0.07).refreshBody();

        // this.coins.create(900, innerHeight - 50, "coin").setScale(0.07).refreshBody();
        // this.coins.create(1100, innerHeight - 50, "coin").setScale(0.07).refreshBody();
        // this.coins.create(1300, innerHeight - 50, "coin").setScale(0.07).refreshBody();
        // this.coins.create(1500, innerHeight - 50, "coin").setScale(0.07).refreshBody();
        // this.coins.create(1500, innerHeight - 50, "coin").setScale(0.07).refreshBody();

        // this.coins.create(2500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(2500, 220, "coin").setScale(0.07).refreshBody();
        // this.coins.create(2500, 100, "coin").setScale(0.07).refreshBody();

        // this.coins.create(5000, 200, "coin").setScale(0.07).refreshBody();
        // this.coins.create(5500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(6000, 200, "coin").setScale(0.07).refreshBody();
        // this.coins.create(6500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(7000, 200, "coin").setScale(0.07).refreshBody();
        // this.coins.create(7500, 200, "coin").setScale(0.07).refreshBody();
        // this.coins.create(8000, 350, "coin").setScale(0.07).refreshBody();

        // this.coins.create(8500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(9000, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(9500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(10000, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(10500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(11000, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(11500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(12000, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(12500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(13000, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(13500, 350, "coin").setScale(0.07).refreshBody();
        // this.coins.create(14000, 350, "coin").setScale(0.07).refreshBody();

        // this.coinPlaceValue = 14500;
        // for (let index = 1; index <= 150; index++) {
        //     if (index % 2 == 0) {
        //         this.coins.create(this.coinPlaceValue, 350, "coin").setScale(0.07).refreshBody();
        //     } else {
        //         // this.coins.create(this.coinPlaceValue, 200, "coin").setScale(0.1, 0.1).refreshBody();
        //         this.coins.create(this.coinPlaceValue, 350, "coin").setScale(0.07).refreshBody();
        //         this.coins.create(this.coinPlaceValue, 230, "coin").setScale(0.07).refreshBody();
        //         this.coins.create(this.coinPlaceValue, 100, "coin").setScale(0.07).refreshBody();
        //     }
        //     this.coinPlaceValue += 500
        // }
        this.coins.playAnimation('coinFlipping', null);
        // this.physics.add.overlap(this.player, this.coins, this.hitCoin, null, this)
        this.physics.add.overlap(this.playerBound, this.coins, this.hitCoin, null, this)


        this.finalCoin = this.physics.add.staticGroup();
        this.finalCoin.create(world_config.worldWidth - 300, 500, "coin").setScale(.3).refreshBody()
        this.finalCoin.playAnimation('coinFlipping', null);

        // this.physics.add.overlap(this.player, this.finalCoin, this.levelComplete, null, this)
        this.physics.add.overlap(this.playerBound, this.finalCoin, this.levelComplete, null, this)

        const animCrabConfig = {
            key: 'crabWalk',
            frames: 'crab',
            frameRate: 8,
            repeat: -1
        };
        this.anims.create(animCrabConfig);

        const animCrabDeadConfig = {
            key: 'crabDead',
            frames: 'crab_dead',
            frameRate: 25,
            repeat: 0,
        };
        this.anims.create(animCrabDeadConfig);


        const animOctopusConfig = {
            key: 'octopusWalk',
            frames: 'octopus',
            frameRate: 8,
            repeat: -1
        };
        this.anims.create(animOctopusConfig);

        const animOctopusDeadConfig = {
            key: 'octopusDead',
            frames: 'octopus_dead',
            frameRate: 25,
            repeat: 0,
        };
        this.anims.create(animOctopusDeadConfig);


        this.blocks = this.physics.add.staticGroup();
        this.hurdle_count = Math.round((world_config.worldWidth) / this.textures.get('hurdle_1').getSourceImage().width);
        for (let index = 1; index <= this.hurdle_count; index++) {
            if (index % 2 == 0) {
                this.blocks.create(5700 * index, innerHeight - 50, "fire").setScale(0.09).refreshBody();
            } else {
                this.blocks.create(5700 * index, innerHeight - 50, "fire").setScale(0.09).refreshBody();
            }
            // this.physics.add.overlap(this.player, this.blocks, this.hitFire, null, this)
            this.physics.add.overlap(this.playerBound, this.blocks, this.hitFire, null, this)
        }

        for (let index = 1; index < 5; index++) {
            if (index % 2 == 0) {
                this.crab = this.physics.add.sprite(2000 * (index + 3), 100, 'crab', 'frame_0000', 8);
                this.crab.setScale(0.3);
                this.crab.setCollideWorldBounds(true);
                this.crab.play('crabWalk');
                this.crab.body.velocity.x = -100;
                // this.physics.add.overlap(this.player, this.crab, this.hitEnemy, null, this)
                this.physics.add.overlap(this.playerBound, this.crab, this.hitEnemy, null, this)
                this.physics.add.collider(this.crab, this.blocks);

            } else {
                this.octopus = this.physics.add.sprite(3500 * (index * 2), 100, 'octopus', 'frame_0000', 8);
                this.octopus.setScale(0.4);
                this.octopus.setCollideWorldBounds(true);
                this.octopus.play('octopusWalk');
                this.octopus.body.velocity.x = -50;
                // this.physics.add.overlap(this.player, this.octopus, this.hitEnemy, null, this)
                this.physics.add.overlap(this.playerBound, this.octopus, this.hitEnemy, null, this)
                this.physics.add.collider(this.octopus, this.blocks);
            }
        }


        this.physics.add.collider(this.playerBound, this.blocks);
        this.physics.add.collider(this.playerShadow, this.blocks);


        // // Crabs collision.
        // this.physics.add.collider(this.crab, this.blocks);
        // this.physics.add.collider(this.crab1, this.blocks);
        // this.physics.add.collider(this.crab2, this.blocks);


        // // this.hurdle_1 = this.physics.add.sprite(2000, 100, 'hurdle_1', null, 0);
        // // this.hurdle_1.setScale(0.1);
        // // this.hurdle_1.setCollideWorldBounds(true);
        // // console.log(this.blocks.children.entries[0]);


        // //Keyboard
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // COIN COUNTER
        this.containerInnerWidth = innerWidth / (innerWidth <= 1024 ? 10 : 15);
        this.scoreBoard = this.add.container(this.containerInnerWidth, innerHeight / 5);

        this.counter = this.add.image(0, 0, "counter");
        this.counter.setScale(.1)

        this.pause = this.add.image(innerWidth - 150, 0, "pause");
        this.pause.setScale(.1)

        this.life = this.add.image(innerWidth - 250, 0, "life");
        this.life.setScale(.1)
        // this.counter = this.physics.add.sprite(0, 0, 'counter', null, 0)

        this.scoreText = this.add.text(70, -30, "0", {
            font: '600 56px Poppins',
            color: '#fff',
        });
        this.scoreBoard.add(this.counter);
        this.scoreBoard.add(this.pause);
        this.scoreBoard.add(this.life);
        this.scoreBoard.add(this.scoreText);
        // this.physics.world.enableBody(this.scoreBoard);


        // COIN COUNTER
        // this.cameras.main.setBounds(0, 0, world_config.worldWidth * 10, world_config.worldHeight + 300);
        this.cameras.main.setBounds(0, 0, world_config.worldWidth, world_config.worldHeight + 300);
        this.cameras.main.startFollow(this.player, true, true);
        this.cameras.main.setFollowOffset(-(innerWidth - 800), -300);
        this.physics.world.setBounds(0, 0, world_config.worldWidth, innerHeight + 20);
        // // this.cameras.main.setZoom(1.35)
        // // this.cameras.main.setLerp(1000,1000);
        // // this.cameras.main.setFollowOffset(-700, 125);
        // this.cameras.main.zoom = 0.5;

        // console.log(this);

    }

    update() {

        // console.log(this.player.body.onFloor());
        // console.log(this.player.body.deltaY() );

        // console.log(this.player.body.position.x);
        // console.log(this.playerBound.body.position.x);
        // console.log('========================');

        if (this.scoreBoard.x < (world_config.worldWidth) - 1600) {

            if (innerWidth == 1024) {
                this.containerPositionMinus = -600
            }
            if (innerWidth == 1440) {
                this.containerPositionMinus = -400
            }
            if (innerWidth == 2560) {
                this.containerPositionMinus = 150
            } else {
                // this.containerPositionMinus = -290;
                this.containerPositionMinus = -400;
            }
            // this.scoreBoard.x = (this.player.body.position.x) + this.containerPositionMinus;
            this.scoreBoard.x = (this.player.body.position.x);
        }

        if (!this.gameOver && this.spaceBar.isDown && this.player.body.blocked.down) {
            // this.player.body.velocity.x = player_config.player_speed * 2;

            this.playerBound.setVelocityY(player_config.player_jumpspeed * 2.5)
            this.playerBound.setGravityY(4000)

            this.player.setVelocityY(player_config.player_jumpspeed * 2.5)
            this.player.setGravityY(4000)

            this.player.anims.stop('heroWalk', false);

        }

        if (!this.spaceBar.isDown && this.player.body.blocked.down && !this.gameOver) {
            this.player.anims.play('heroWalk', true);
        }

        // if (this.touchGroud && !this.gameOver && this.player.body.blocked.down && !this.spaceBar.isDown) {
        //     this.player.body.velocity.x = player_config.player_speed * 3;
        //     this.playerShadow.body.velocity.x = player_config.player_speed * 3;
        //     this.playerBound.body.velocity.x = player_config.player_speed * 3;
        // }

        if (this.touchGroud && !this.gameOver) {

            const updatedPosition = this.currentPlayer === 'hero'
                ? this.player.body.position.x + 10
                : (this.player.body.position.x - 60)

            this.player.body.velocity.x = player_config.player_speed * 3;
            this.playerShadow.body.position.x = updatedPosition + 180;
            this.playerBound.body.position.x = updatedPosition + 180;
            // this.playerShadow.body.velocity.x = player_config.player_speed * 3;
            // this.playerBound.body.velocity.x = player_config.player_speed * 3;
            // console.log('this.player.body.position.x===>', this.player);
            // console.log(this.playerBound.body.position.x);
            // this.playerBound.body.x = this.player.body.x + 200;
        }

        if (!this.touchGroud && !this.gameOver && this.player.body.blocked.down) {
            this.touchGroud = true
        }

        this.playerJumpRotationAndShadow();

    }

    dropToDitch(player, block) {
        this.gameOver = true;

        this.player.setCollideWorldBounds(false);
        this.player.body.velocity.x = 0;
        this.playerShadow.setCollideWorldBounds(false);
        this.playerShadow.body.velocity.x = 0;

        /* TODO:: Player Bound */
        // this.playerBound.setCollideWorldBounds(false);
        // this.playerBound.body.velocity.x = 0;

        this.player.anims.stop('heroWalk', false);

        this.time.delayedCall(500, function () {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        }, [], this);
        this.time.delayedCall(2000, function () {
            this.scene.start('gameOver');
        }, [], this);
    }

    hitCoin(player, coin) {
        coin.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(this.score);
        this.coinSound.play();
    }

    levelComplete(player, coin) {
        coin.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(this.score);
        this.coinSound.play();
        this.time.delayedCall(500, function () {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(600, function () {
                this.scene.start('gameLevelCompleted',{coins: this.score});
            }, [], this);
        }, [], this);
    }


    hitEnemy(player, enemy) {
        if (!this.gameOver) {

            if (enemy.body.touching.up) {
                ++this.count
                // enemy.disableBody(true, true);
                if (enemy.texture.key == 'crab') {
                    enemy.anims.play('crabDead', true);
                }
                if (enemy.texture.key == 'octopus') {
                    enemy.anims.play('octopusDead', true);
                }
                this.playerBound.setVelocityY(player_config.player_jumpspeed * 2.5)
                this.player.setVelocityY(player_config.player_jumpspeed * 2.5)
                enemy.setTint(0xff0000);
                this.time.delayedCall(500, function () {
                    enemy.disableBody(true, true);
                }, [], this);


            } else {
                if ((Math.round(enemy.x) - Math.round(player.x) < 130)) {
                    // console.log('Enemy===>', Math.round(enemy.x));
                    // console.log('Player===>', Math.round(player.x));
                    // if (!this.gameOver) {
                    this.gameOver = true
                    // enemy.disableBody(true, true);
                    this.player.body.velocity.x = 0;
                    this.playerShadow.body.velocity.x = 0;
                    this.playerBound.body.velocity.x = 0;

                    enemy.body.velocity.x = 0;
                    // this.player.setVelocityY(player_config.player_jumpspeed + 200)
                    this.player.anims.stop('heroWalk', false);
                    this.player.anims.play('heroDead', true);
                    // }
                    // player.disableBody(true, true);
                    this.time.delayedCall(2000, function () {
                        this.cameras.main.fadeOut(2000, 0, 0, 0)
                    }, [], this);
                    this.time.delayedCall(3000, function () {
                        this.scene.start('gameOver');
                    }, [], this);

                }
            }
        }
    }

    hitFire(player, fire) {
        if (!this.gameOver) {
            if (fire.body.touching.up) {
                this.playerBound.setVelocityY(player_config.player_jumpspeed * 2)
                this.player.setVelocityY(player_config.player_jumpspeed * 2)
            }
            if (!fire.body.touching.up) {
                // if (!this.gameOver) {
                this.gameOver = true
                this.player.body.velocity.x = 0;
                this.playerShadow.body.velocity.x = 0;

                this.player.anims.stop('heroWalk', false);
                this.player.anims.play('heroDead', true);
                // }
                this.time.delayedCall(2000, function () {
                    this.cameras.main.fadeOut(2000, 0, 0, 0)
                }, [], this);
                this.time.delayedCall(3000, function () {
                    this.scene.start('gameOver');
                }, [], this);
            }
        }
    }

    playerJumpRotationAndShadow() {
        if (this.touchGroud && this.player.body.deltaY() < 0) {
            this.playerShadow.scaleX -= 0.0019;
            // this.playerShadow.scaleY -= 0.001;
            // this.player.angle -= 0.5
        }
        if (this.touchGroud && this.player.body.deltaY() > 0) {
            this.playerShadow.scaleX += 0.0019;
            // this.playerShadow.scaleY += 0.001;
            // this.player.angle += 1
        }

        if (this.touchGroud && this.player.body.deltaY() == 0) {
            this.playerShadow.scaleX = 0.09;
            // this.player.setAngle(0)
        }

    }
}