import level_1 from "./Scenes/Level_1.js";
import gameOver from "./Scenes/GameOver.js";
import titleScene from "./Scenes/TitleScene.js";
import gameLevelCompleted from "./Scenes/GameLevelCompleted.js";
import characterSelection from "./Scenes/CharacterSelection.js";
import Loader from "./Scenes/Loader.js";


const config = {
    type: Phaser.AUTO,
    scale: {
        // zoom:1,
        // mode: Phaser.Scale.ScaleModes.FIT,
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // autoCenter:Phaser.Scale.Center.CENTER_BOTH,
        width: innerWidth,
        height: innerHeight,
    },
    // zoom: 1,
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
    scene: [Loader, titleScene, characterSelection, level_1, gameOver, gameLevelCompleted]
};


const LEVELS = {
    level_1: {
        complete: false,
        over: false,
        score: 0,
        total_enemies: 4,
    },
    level_2: {
        complete: false,
        over: false,
        score: 0,
        total_enemies: 2,
    },

};

const game = new Phaser.Game(config);