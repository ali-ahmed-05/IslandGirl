export default class titleScene extends Phaser.Scene {
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

            let checkConnection = await window.WalletFunction.checkConnection()


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

                            // console.log('ACOUNT ADDRESS', checkAccount[0]);
                            // console.log('BALANCE', this.checkBalance);


                            window.MoralisFunctions.initialize();
                            // await window.MoralisFunctions.authenticate(checkAccount[0]);
                            const userNFTs = await window.MoralisFunctions.getNFTs(checkAccount[0])
                            const userNFTsNames = userNFTs.length > 0
                                ? userNFTs.map(userNFT => JSON.parse(userNFT.metadata))
                                : [];

                            if (this.checkBalance <= 0)
                                return alert('You Cannot Play')

                            if (userNFTsNames.length > 0) {
                                this.cameras.main.fadeOut(1000, 0, 0, 0)
                                return this.scene.start('characterSelection', {userNFTsNames});
                            } else {
                                return alert('you do not possess any nft character')
                            }
                        }

                    }, 1000);


                } catch (error) {
                    console.log(error);
                }
            }
        });
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