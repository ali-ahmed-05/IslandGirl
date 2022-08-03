import { map } from "jquery";

export default class characterSelection extends Phaser.Scene {
    constructor() {
        super('characterSelection');
    }

    init(data) {
        this.players = [];
        if (data?.userNFTsNames.length === 1) {

            const player = data.userNFTsNames[0].name;
            return this.scene.start('level_1', { player });
        }
        let unqiuePlayers = data?.userNFTsNames.map(metadeta => metadeta.name)
        unqiuePlayers = [... new Set(unqiuePlayers)]

        this.players = data.userNFTsNames;
    }

    preload() {
        this.load.image('character_bg', 'assets/images/characters/character_bg.png');
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

        this.background = this.add.image(0, 0, "character_bg").setOrigin(0);
        this.background.displayWidth = innerWidth;
        this.background.displayHeight = innerHeight;

        const characters = []
        const charactersTitle = [];
        let gape = 0;

        this.players.forEach(function (player, index) {
            gape += 200;

            characters[index] = ref.add.image(gape, innerHeight / 2, player.name);
            ref.add.text(index === 0 ? (gape - 40) : gape - 20, (innerHeight / 2) + 100, player.name, {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            });

            characters[index].setScale(0.2);

            characters[index].on('pointerover', () => {
                characters[index].setScale(0.22)
            })
            characters[index].on('pointerout', () => {
                characters[index].setScale(0.2)
            })
        });

        ref.add.text((innerWidth / 2) * 0.75, (innerHeight / 2) * 0.5, 'Please Choose Your Player', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: '3em'
            // color: '#F7B32A',
        });

        characters.forEach(function (character) {
            ref.onCharacterSelect(character, character.texture.key)
        });

    }


    onCharacterSelect(btn, player) {
        btn.setInteractive()
        btn.on('pointerdown', () => {

            this.time.delayedCall(100, function () {
                this.cameras.main.fadeOut(1000, 0, 0, 0)
            }, [], this);

            this.time.delayedCall(2000, function () {
                this.scene.start('level_1', { player });
            }, [], this);
        })
    }
}