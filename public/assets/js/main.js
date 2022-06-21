class titleScene extends Phaser.Scene {

    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.image('bg', './assets/images/title/bg.png');

        this.load.image('buy_coin', './assets/images/title/buy-coin.png');
        this.load.image('about', './assets/images/title/about.png');
        this.load.image('nft', './assets/images/title/nft.png');
        this.load.image('play_to_earn', './assets/images/title/play-to-earn.png');
        this.load.image('store', './assets/images/title/store.png');

        this.load.image('youtube', './assets/images/title/youtube.png');
        this.load.image('twitter', './assets/images/title/twitter.png');
        this.load.image('instagram', './assets/images/title/instagram.png');
        this.load.image('telegram', './assets/images/title/telegram.png');
        this.load.image('discord', './assets/images/title/discord.png');

        this.load.image('avatar', './assets/images/title/avatar.png');

        this.load.image('playAndEarn', './assets/images/title/play-to-earn.png');

        (() => {
            axios.get('https://island-girl.herokuapp.com/api/admin/generateToken').then((res) => {
                localStorage.setItem('token', res.data.token)
            })
        })()
    }

    create() {
        this.background = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.background.displayWidth = innerWidth;
        this.background.displayHeight = innerHeight;

        this.topBar = this.add.container(innerWidth / 2, innerHeight / 10);

        this.buy_coin = this.add.image(0, 0, "buy_coin");
        this.buy_coin.setScale(0.3)


        this.store = this.add.image(150, 0, "store");
        this.store.setScale(0.3)

        this.nft = this.add.image(300, 0, "nft");
        this.nft.setScale(0.3)

        this.about = this.add.image(450, 0, "about");
        this.about.setScale(0.3)

        this.topBar.add(this.buy_coin);
        this.topBar.add(this.store);
        this.topBar.add(this.nft);
        this.topBar.add(this.about);

        this.redirect(this.buy_coin, 'https://pancakeswap.finance/swap?outputCurrency=0x85469cb22c5e8a063106c987c36c7587810e4bf1')
        this.redirect(this.store, 'https://islandgirltoken.com')
        this.redirect(this.nft, 'https://islandgirltoken.com')
        this.redirect(this.about, 'https://islandgirltoken.com/PDF/IslandGirl_Whitepaper.pdf')


        this.bottomBar = this.add.container(innerWidth / 1.75, innerHeight / 5.5);

        this.youtube = this.add.image(0, 0, "youtube");
        this.youtube.setScale(0.3)

        this.twitter = this.add.image(70, 0, "twitter");
        this.twitter.setScale(0.3)

        this.instagram = this.add.image(140, 0, "instagram");
        this.instagram.setScale(0.3)

        this.telegram = this.add.image(210, 0, "telegram");
        this.telegram.setScale(0.3)

        this.discord = this.add.image(280, 0, "discord");
        this.discord.setScale(0.3)

        this.bottomBar.add(this.youtube);
        this.bottomBar.add(this.twitter);
        this.bottomBar.add(this.instagram);
        this.bottomBar.add(this.telegram);
        this.bottomBar.add(this.discord);

        this.redirect(this.youtube, 'https://pancakeswap.finance/swap?outputCurrency=0x85469cb22c5e8a063106c987c36c7587810e4bf1')
        this.redirect(this.twitter, 'https://twitter.com/Islandgirltoken')
        this.redirect(this.instagram, 'https://www.instagram.com/islandgirltoken')
        this.redirect(this.telegram, 'https://t.me/islandgirltoken')
        this.redirect(this.discord, 'https://islandgirltoken.com/PDF/IslandGirl_Whitepaper.pdf')


        this.avatar = this.add.image(innerWidth / 1.7, innerHeight / 3, "avatar").setOrigin(0, 0);
        this.avatar.setScale(0.3)


        this.playAndEarn = this.add.image(innerWidth / 1.72, innerHeight / 1.5, "playAndEarn").setOrigin(0, 0);
        this.playAndEarn.setScale(0.5)
        this.playAndEarn.setInteractive()


        //Keyboard
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playAndEarn.on('pointerover', () => {
            this.playAndEarn.setScale(0.51)
        })
        this.playAndEarn.on('pointerout', () => {
            this.playAndEarn.setScale(0.5)
        })

        this.playAndEarn.on('pointerdown', async () => {
            // this.cameras.main.fadeOut(1000, 0, 0, 0)
            // this.playAndEarn.setScale(0.5)
            // this.time.delayedCall(1000, () => {
            //     this.scene.start('level_1');
            // })


            let checkConnection = await window.WalletFunction.checkConnection()
            // console.log(checkConnection)
            if (checkConnection) {
                try {
                    await window.WalletFunction.loadWeb3()

                    // Checking wallet connect or not

                    var checkAccount = [];
                    var checkWalletConnection = setInterval(async () => {

                        checkAccount = await window.web3.eth.getAccounts();


                        if (checkAccount.length > 0) {

                            localStorage.setItem('address', checkAccount[0])
                            clearInterval(checkWalletConnection);
                            this.checkBalance = await window.WalletFunction.balanceOf(checkAccount[0])

                            console.log('ACOUNT ADDRESS', checkAccount[0]);
                            console.log('BALANCE', this.checkBalance);


                            window.MoralisFunctions.initialize();
                            // await window.MoralisFunctions.authenticate(checkAccount[0]);
                            const userNFTs = await window.MoralisFunctions.getNFTs(checkAccount[0])
                            const userNFTsNames = userNFTs.length > 0 && userNFTs
                                .map(userNFT => JSON.parse(userNFT.metadata));

                            // console.log(userNFTsNames);


                            if (this.checkBalance > 0) {
                                this.scene.start('characters', {userNFTsNames});
                                // this.cameras.main.fadeOut(1000, 0, 0, 0)
                                // this.playAndEarn.setScale(0.5)

                                // this.time.delayedCall(1000, () => {
                                //     this.scene.start('level_1');
                                // })
                            } else {
                                alert('You Cannot Play')
                            }
                        }

                    }, 1000);


                } catch (error) {
                    console.log(error);
                }
            }


        })


    }

    update() {

    }

    redirect(btn, url) {
        btn.setInteractive()
        btn.on('pointerdown', () => {
            window.open(url, '_blank');
        })
    }
}


class level_1 extends Phaser.Scene {

    constructor() {
        super('level_1');
    }

    init(data) {
        this.currentPlayer = data.player
        switch (data.player){
            case 'Lily':
                this.currentPlayer = 'hero'
                break;
            case 'Manda':
                this.currentPlayer = 'hero'
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
        }
    }

    preload() {

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

        //   this.load.on('progress', (e) => {
        //     console.log(Math.round(e * 100));
        //     // this.progressBar.clear();
        //     // this.progressBar.fillStyle(0xffffff, 1);
        //     // this.progressBar.fillRect(250, 280, 300 * e, 30);
        //     // this.scene.start('level_1');
        // });
        // this.load.start();

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

        this.tree = this.physics.add.staticGroup();
        this.tree_sprite_required = Math.round((world_config.worldWidth) / this.textures.get('tree').getSourceImage().width);
        for (let index = 0; index < this.tree_sprite_required; index++) {
            this.tree.create(this.textures.get('tree').getSourceImage().width * index, innerHeight - 300, 'tree');
            // this.tree.displayHeight = this.textures.get('tree').getSourceImage().height;
        }


        /*TODO::Hero used 1*/
        // Player
        const animHeroConfig = {
            key: 'heroWalk',
            frames: this.currentPlayer,
            frameRate: 20,
            repeat: 1
        };
        this.anims.create(animHeroConfig);

        const animDeadConfig = {
            key: 'heroDead',
            frames: 'hero_dead',
            frameRate: 150,
            repeat: 0
        };
        this.anims.create(animDeadConfig);

        this.playerShadow = this.physics.add.sprite(150, 0, 'coin', 'frame_0000', 8);
        this.playerShadow.setScale(0.09, 0.01);
        this.playerShadow.setCollideWorldBounds(true);
        this.playerShadow.setOrigin(0);
        this.playerShadow.setDepth(1)
        this.playerShadow.tint = 0x000000;
        this.playerShadow.alpha = 0.6;
        this.playerShadow.setGravityY(900);

        this.playerBound = this.physics.add.sprite(150, 0, 'coin', 'frame_0000', 8);
        this.playerBound.setCollideWorldBounds(true);
        this.playerBound.setScale(0.09, 0.2);
        this.playerBound.setOrigin(-.2, 0);
        this.playerBound.setDepth(1)
        this.playerBound.visible = false;

        /*TODO:: Hero used*/
        this.player = this.physics.add.sprite(0, 0, this.currentPlayer, 'frame_0000', 8);
        this.player.setScale(0.35);
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0);
        this.player.width = 20
        this.player.setDepth(1)
        // setTimeout(() => {
        // this.player.body.setSize(this.player.width, this.player.height)
        // this.player.body.immovable = true;

        // }, 2000);
        // this.player.displayWidth = 100;


        // // Floor
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
            this.coins.create(this.coinPlacement, innerHeight - 50, "coin").setScale(0.08).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement + 1000

        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.08).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement

        for (let index = 5; index > 0; index--) {
            this.coinPlacement = this.lastCoinPlacement - (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.08).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement + 3000

        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 400)
            this.coins.create(this.coinPlacement, innerHeight - (100 * index), "coin").setScale(0.08).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement;

        for (let index = 1; index < 5; index++) {
            this.coinPlacement = this.lastCoinPlacement + (index * 200)
            this.coins.create(this.coinPlacement, innerHeight - (100), "coin").setScale(0.08).refreshBody();
        }
        this.lastCoinPlacement = this.coinPlacement;

        this.coinPlacementArea(800, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)

        this.coinPlacementArea(1000, 200, 600)
        this.coinPlacementArea(100, 200, 550)
        this.coinPlacementArea(100, 200, 500)
        this.coinPlacementArea(100, 200, 450)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 400)

        this.coinPlacementArea(800, 200, 100)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 200, 300)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 200, 300)
        this.coinPlacementArea(100, 200, 100)

        for (let index = 0; index < 110; index++) {
            this.coinPlacementArea(200, 100, Math.floor(Math.random() * 600) + 100)
        }

        this.coinPlacementArea(500, 200, 100)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 200, 300)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 500)
        this.coinPlacementArea(100, 200, 600)
        this.coinPlacementArea(100, 200, 700)

        this.coinPlacementArea(100, 200, 700)
        this.coinPlacementArea(100, 200, 600)
        this.coinPlacementArea(100, 200, 500)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 300)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 200, 100)

        this.coinPlacementArea(400, 200, 400)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 300, 400)
        this.coinPlacementArea(100, 200, 200)

        this.coinPlacementArea(400, 200, 400)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 300, 400)
        this.coinPlacementArea(100, 200, 200)

        this.coinPlacementArea(400, 200, 400)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 300, 400)
        this.coinPlacementArea(100, 200, 200)

        this.coinPlacementArea(500, 200, 100)
        this.coinPlacementArea(100, 200, 200)
        this.coinPlacementArea(100, 200, 300)
        this.coinPlacementArea(100, 200, 400)
        this.coinPlacementArea(100, 200, 500)
        this.coinPlacementArea(100, 200, 600)
        this.coinPlacementArea(100, 200, 700)

        this.coins.playAnimation('coinFlipping', null);
        this.physics.add.overlap(this.playerBound, this.coins, this.hitCoin, null, this)

        this.finalCoin = this.physics.add.staticGroup();
        this.finalCoin.create(world_config.worldWidth - 200, 500, "coin").setScale(.3).refreshBody()
        this.finalCoin.playAnimation('coinFlipping', null);

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
            frameRate: 20,
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
            this.physics.add.overlap(this.playerBound, this.blocks, this.hitFire, null, this)
        }

        for (let index = 1; index < 14; index++) {
            if (index % 2 == 0) {
                this.crab = this.physics.add.sprite(1000 * (index * 5), 100, 'crab', 'frame_0000', 8);
                this.crab.setScale(0.3);
                this.crab.setCollideWorldBounds(true);
                this.crab.play('crabWalk');
                this.crab.body.velocity.x = -100;
                this.physics.add.overlap(this.playerBound, this.crab, this.hitEnemy, null, this)
                this.physics.add.collider(this.crab, this.blocks);

            } else {
                this.octopus = this.physics.add.sprite(2500 * (index * 2), 100, 'octopus', 'frame_0000', 8);
                this.octopus.setScale(0.4);
                this.octopus.setCollideWorldBounds(true);
                this.octopus.play('octopusWalk');
                this.octopus.body.velocity.x = -50;
                this.physics.add.overlap(this.playerBound, this.octopus, this.hitEnemy, null, this)
                this.physics.add.collider(this.octopus, this.blocks);
            }
        }


        // //Keyboard
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // COIN COUNTER
        this.containerInnerWidth = innerWidth / (innerWidth <= 1024 ? 10 : 15);
        this.scoreBoard = this.add.container(this.containerInnerWidth, innerHeight / 5);

        this.counter = this.add.image(0, 0, "counter");
        this.counter.setScale(.1)

        // this.pause = this.add.image(innerWidth - 150, 0, "pause");
        // this.pause.setScale(.1)

        this.life = this.add.image(innerWidth - 250, 0, "life");
        this.life.setScale(.1)
        // this.counter = this.physics.add.sprite(0, 0, 'counter', null, 0)

        this.scoreText = this.add.text(70, -30, "0", {
            font: '600 56px Poppins',
            color: '#fff',
        });
        this.scoreBoard.add(this.counter);
        // this.scoreBoard.add(this.pause);
        this.scoreBoard.add(this.life);
        this.scoreBoard.add(this.scoreText);
        // this.physics.world.enableBody(this.scoreBoard);


        // COIN COUNTER
        // this.cameras.main.setBounds(0, 0, world_config.worldWidth * 10, world_config.worldHeight + 300);
        this.cameras.main.setBounds(0, 0, world_config.worldWidth, world_config.worldHeight + 300);
        this.cameras.main.startFollow(this.player, true, true);
        this.cameras.main.setFollowOffset(-(innerWidth - 1200), -300);
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
                this.containerPositionMinus = -290;
            }
            this.scoreBoard.x = (this.player.body.position.x) + this.containerPositionMinus;
        }

        if (!this.gameOver && this.spaceBar.isDown && this.player.body.blocked.down) {
            // this.player.body.velocity.x = player_config.player_speed * 2;

            this.playerBound.setVelocityY(player_config.player_jumpspeed * 2.5)
            this.playerBound.setGravityY(3000)

            this.player.setVelocityY(player_config.player_jumpspeed * 2.5)
            this.player.setGravityY(3000)

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
            this.player.body.velocity.x = player_config.player_speed * 2;
            this.playerShadow.body.position.x = this.player.body.position.x + 180;
            this.playerBound.body.position.x = this.player.body.position.x + 180;
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
        // console.log('====>',block.body.overlapY);
        // if (block.body.touching.left) {
        // if(block.body.overlapY>500){
        this.gameOver = true

        this.player.setCollideWorldBounds(false);
        this.player.body.velocity.x = 0;
        this.playerShadow.setCollideWorldBounds(false);
        this.playerShadow.body.velocity.x = 0;
        this.playerBound.setCollideWorldBounds(false);
        this.playerBound.body.velocity.x = 0;

        this.player.anims.stop('heroWalk', false);

        this.time.delayedCall(2000, function () {
            this.cameras.main.fadeOut(2000, 0, 0, 0)
        }, [], this);
        //TODO:: FIX BUG (Game Over screen does not show)
        this.time.delayedCall(3000, function () {
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
        this.score += 10;
        player_config.earnCoins = this.score;
        this.scoreText.setText(this.score);
        this.coinSound.play();

        setTimeout(() => {
            this.player.body.velocity.x = 0;
            this.gameOver = true;
            this.player.anims.stop('heroWalk', false);
        }, 1000);

        this.time.delayedCall(1000, function () {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.time.delayedCall(1100, function () {
                localStorage.setItem('coin', this.score)
                this.scene.start('gameLevelCompleted');
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

    coinPlacementArea(startGapFromPreviousCoin, x, y) {
        this.lastCoinPlacement = this.coinPlacement + startGapFromPreviousCoin;
        this.coinPlacement = this.lastCoinPlacement + x
        this.coins.create(this.coinPlacement, innerHeight - (y), "coin").setScale(0.08).refreshBody();
    }

    hurdlePlacementArea(x, y, hurdle) {
        if (this.hurdle.children.entries.length > 0) {
            let lastHurdlePlacementX = this.hurdle.children.entries.slice(-1).pop().x
            this.hurdle.create(lastHurdlePlacementX + x, innerHeight - y, hurdle).setScale(0.04).refreshBody();
        } else {
            this.hurdle.create(x, innerHeight - y, hurdle).setScale(0.04).refreshBody();
        }
    }
}

class characters extends Phaser.Scene {
    constructor() {
        super('characters');
    }

    init(data) {
        console.log(data);
        this.players = data.userNFTsNames;
    }

    preload() {
        this.load.image('character_bg', '../assets/images/characters/character_bg.png');
        this.load.image("Alice", "../assets/images/characters/Alice.png");
        this.load.image("Chralotte", "../assets/images/characters/Chralotte.png");
        this.load.image("Esmeralda", "../assets/images/characters/Esmeralda.png");
        this.load.image("Lily", "../assets/images/characters/Lily.png");
        this.load.image("Lily", "../assets/images/characters/Lily.png");
        this.load.image("Manda", "../assets/images/characters/Manda.png");
        this.load.image("Ria", "../assets/images/characters/Ria.png");
    }

    create() {
        const ref = this;

        this.background = this.add.image(0, 0, "bg").setOrigin(0, 0);

        const characters = []
        let gape = 0.4;

        this.players.forEach(function (player, index) {
            gape += 0.3;
            characters[index] = ref.add.image(innerWidth / 2 * gape, innerHeight * 0.3, player.name);
            characters[index].setScale(0.2);

            ref.add.text(innerWidth / 2 * gape - 40, innerHeight * 0.4, player.name, {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
            });
        });

        characters.forEach(function (character) {
            ref.onCharacterSelect(character, character.texture.key)
        });

    }


    onCharacterSelect(btn, player) {
        btn.setInteractive()
        btn.on('pointerdown', () => {
            this.scene.start('level_1', {player});
        })
    }
}

class gameOver extends Phaser.Scene {

    constructor() {
        super('gameOver');
    }

    preload() {
        this.load.image('game_over_bg', './assets/images/game_over.png');
        this.load.image('reset_button', './assets/images/reset.png');
    }

    create() {
        this.background = this.add.image(0, 0, "game_over_bg");
        // this.background.displayWidth = this.sys.canvas.width-50;
        // this.background.displayHeight = this.sys.canvas.height;
        Phaser.Display.Align.In.Center(this.background, this.add.zone(this.sys.canvas.width / 2, this.sys.canvas.height / 3, this.sys.canvas.width, this.sys.canvas.height))

        // this.cam = this.cameras.main;
        // this.physics.add.staticGroup().create(this.cam.midPoint.x, 400, "game_over").setScale(1, 1).refreshBody();


        this.playButton = this.add.image(this.game.renderer.width / 2, innerHeight / 1.3, 'reset_button').setDepth(1).setScale(0.08);
        this.playButton.setInteractive()


        // //Keyboard
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

class gameLevelCompleted extends Phaser.Scene {

    constructor() {
        super('gameLevelCompleted');
    }

    preload() {
        this.load.image('game_complete', './assets/images/level_complete.png');

        this.load.image('earn', './assets/images/earn.png');
        this.load.image('next_level', './assets/images/next_level.png');
    }

    create() {
        // this.cam = this.cameras.main;
        // this.physics.add.staticGroup().create(this.cam.midPoint.x, 400, "game_complete").setScale(1, 1).refreshBody();
        this.background = this.add.image(0, 0, "game_complete");
        this.background.displayWidth = this.sys.canvas.width / 2;
        this.background.displayHeight = this.sys.canvas.height;

        Phaser.Display.Align.In.Center(this.background, this.add.zone(this.sys.canvas.width / 2, (this.sys.canvas.height + 50) / 2, this.sys.canvas.width, this.sys.canvas.height))
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#141a3c");
        // this.background.setPosition(innerWidth / 2, innerHeight / 2);
        //Keyboard
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.levelCompleteButton = this.add.image(this.game.renderer.width / 1.8, innerHeight / 1.2, 'next_level').setScale(0.4);
        this.levelCompleteButton.setInteractive()

        this.earnButton = this.add.image(this.game.renderer.width / 2.4, innerHeight / 1.2, 'earn').setScale(0.4);
        this.earnButton.setInteractive()


        this.earnButton.on('pointerover', () => {
            this.earnButton.setScale(0.44)
        })
        this.earnButton.on('pointerout', () => {
            this.earnButton.setScale(0.4)
        })

        this.levelCompleteButton.on('pointerover', () => {
            this.levelCompleteButton.setScale(0.44)
        })
        this.levelCompleteButton.on('pointerout', () => {
            this.levelCompleteButton.setScale(0.4)
        })

        this.earnButton.on('pointerdown', () => {
            this.withDrawCoin()
        })

        this.levelCompleteButton.on('pointerdown', () => {

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

    async withDrawCoin() {
        try {

            const data = {
                token: window.HelperFunction.generateHash()
            }

            let axiosHeader = {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

            axios.post('https://island-girl.herokuapp.com/api/admin/release', data, axiosHeader).then((res) => {
                if (res.data.message) {
                    alert('Successfully Earn')
                }
                location.reload();
            }).catch(e => {
                location.reload();
            })
        } catch (e) {
            location.reload();
        }
    }
}

class Loader extends Phaser.Scene {

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
        // this.load.atlas('hero', './assets/images/hero-2.png', './assets/images/hero.json');

        //TODO:: Hero
        // this.load.multiatlas('hero', './assets/images/hero/hero.json', './assets/images/hero');
        //TODO:: Hero 1
        this.load.multiatlas('hero', './assets/images/hero1/hero.json', './assets/images/hero1');
        //TODO:: Hero 2
        this.load.multiatlas('hero2', './assets/images/hero2/hero.json', './assets/images/hero2');
        //TODO:: Hero 3
        this.load.multiatlas('hero3', './assets/images/hero3/hero.json', './assets/images/hero3');
        //TODO:: Hero 4
        this.load.multiatlas('hero4', './assets/images/hero4/hero.json', './assets/images/hero4');
        //TODO:: Hero 5
        this.load.multiatlas('hero5', './assets/images/hero5/hero.json', './assets/images/hero5');
        //TODO:: Hero 6
        this.load.multiatlas('hero6', './assets/images/hero6/hero.json', './assets/images/hero6');


        // this.load.multiatlas('hero_dead', './assets/images/hero_dead/hero_dead.json', './assets/images/hero_dead');
        this.load.multiatlas('hero_dead', './assets/images/hero1_dead/hero-dead.json', './assets/images/hero1_dead');

        this.load.multiatlas('crab_dead', './assets/images/crab_dead/crab_dead.json', './assets/images/crab_dead');
        this.load.atlas('crab', './assets/images/crab/crab_walk.png', './assets/images/crab/crab_walk.json');

        this.load.atlas('octopus', './assets/images/octopus/octopus.png', './assets/images/octopus/octopus.json');
        this.load.atlas('octopus_dead', './assets/images/octopus_dead/octopus_dead.png', './assets/images/octopus_dead/octopus_dead.json');

        this.load.atlas('coin', './assets/images/coin.png', './assets/images/coin.json');

        this.load.audio('ping', 'assets/audio/coin.wav'); //Load the coin getting sound file

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


var config = {
    type: Phaser.AUTO,
    scale: {
        width: innerWidth,
        height: innerHeight,
    },
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800,
            },
            debug: false
        }
    },
    scene: [Loader, titleScene, level_1, gameOver, gameLevelCompleted, characters]
};


var player_config = {
    player_speed: 350,
    player_jumpspeed: -700,
    earnCoins: 0
}

var world_config = {
    worldWidth: 9500 * 7,
    worldHeight: innerHeight - 200
};


var game = new Phaser.Game(config);
