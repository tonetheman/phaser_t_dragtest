
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
        board.add(children);
        return board;
    }
    create_drag1() : Phaser.GameObjects.Container {
        let tmp = this.add.container(100,600);
        tmp.add(this.add.image(0,0,"blue"));
        tmp.setSize(48,48);
        tmp.setInteractive({draggable:true});
        this.input.setDraggable(tmp); 
        return tmp;
    }
    create_drag2() : Phaser.GameObjects.Container {
        let tmp = this.add.container(200,600);
        tmp.add(this.add.image(0,0,"blue"));
        tmp.add(this.add.image(48,0,"blue"));
        tmp.setSize(48*2,48*2);
        tmp.setInteractive();
        this.input.setDraggable(tmp);
        return tmp;
    }
    create_drag3() : Phaser.GameObjects.Container {
        let tmp = this.add.container(350,600);
        tmp.add(this.add.image(0,48,"blue"));
        tmp.add(this.add.image(48,48,"blue"));
        tmp.add(this.add.image(48,0,"blue"));
        tmp.add(this.add.image(96,0,"blue"));
        tmp.setSize(48*3,48*3);
        tmp.setInteractive();
        this.input.setDraggable(tmp);
        return tmp;
    }
    create() {
        let board = this.create_board();
        let d1 = this.create_drag1();
        let d2 = this.create_drag2();
        let d3 = this.create_drag3();

        this.input.on("dragstart", function (pointer, gameObject) {
            console.log("dragstart",gameObject);
        },this);
        this.input.on("dragend", function(pointer,gameObject){
            console.log("x and y",pointer.x, pointer.y);
            console.log("gx gy",gameObject.x,gameObject.y);
        },this);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            if ((dragX>=100)&&(dragY>=100)) {
                const x = Phaser.Math.Snap.To(dragX, 48);
                const y = Phaser.Math.Snap.To(dragY, 48);
                gameObject.setPosition(x-48/2, y-48/2);
            } else {
                gameObject.setPosition(dragX,dragY);
            }
        });
    }
}

function mainline() {
    let game = new Phaser.Game({
        type: Phaser.AUTO,
        scale : {
            width:600,
            height:800,
        }
    });
    game.scene.add("game",GameScene);
    game.scene.start("game");

}

window.onload = mainline;