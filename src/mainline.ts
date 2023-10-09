
import "phaser";

class GameScene extends Phaser.Scene {

    constructor() {
        super("game");
    }
    preload() {
        this.load.image("blue","assets/blue_48x48.png");
        this.load.image("green","assets/green_48x48.png");
    }
    create_board() : Phaser.GameObjects.Container {
        let board = this.add.container(100,100);
        let x = 0;
        let y = 0;
        const children : Array<Phaser.GameObjects.Image> = [];
        for(let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                let tmp = this.add.image(x,y,"green");
                tmp.setOrigin(0,0);
                children.push(tmp);
                x += 48;
            }
            y += 48;
            x = 0;
        }
        console.log("adding children");
        board.add(children);
        return board;
    }
    create_drag1() : Phaser.GameObjects.Container {
        let tmp = this.add.container(500,32);
        tmp.add(this.add.image(0,0,"blue"));
        tmp.setInteractive(true);
        return tmp;
    }
    create() {
        let board = this.create_board();
        let d1 = this.create_drag1();

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.setPosition(dragX, dragY);

        });
    }
}

function mainline() {
    let game = new Phaser.Game({
        scale : {
            width:600,
            height:800,
        }
    });
    game.scene.add("game",GameScene);
    game.scene.start("game");

}

window.onload = mainline;