
interface mousePos {
    x: number,
    y: number,
}

const getCoords = (event: MouseEvent): mousePos => {
    return {x: event.offsetX, y: event.offsetY}
}

type hsl = {
    h: number,
    s: number,
    l: number,
}

class pixelGrid {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    
    pixelSize: number;
    colours: string[];
    
    constructor(gridId: string, size: number) {
        this.pixelSize = size;
        this.canvas = <HTMLCanvasElement> document.getElementById(gridId);
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');

        this.colours = [''];
        this.initGrid();

        this.canvas.addEventListener('click', (e) => {
            this.changeTile(<MouseEvent> e)
        })
    }

    initGrid() {
        for (let row = 0; row < 30; row++) {
            for (let col = 0; col < 30; col++) {
                this.ctx.fillStyle = this.randomColour();
                this.ctx.fillRect(
                    row * this.pixelSize,
                    col * this.pixelSize,
                    this.pixelSize,
                    this.pixelSize
                )
            }
        }
    }

    randomColour(): string {
        let col = "#"+((1<<24)*Math.random()|0).toString(16)
        this.colours.push(col.substring(0, 7))
        if (this.colours.length > 50) {
            this.colours.shift()
        }
        console.log(this.colours)
        return col
    }

    changeTile(event: MouseEvent) {
        let loc = getCoords(event);
        let row = Math.floor(loc.x / this.pixelSize)
        let col = Math.floor(loc.y / this.pixelSize)

        this.ctx.fillStyle = this.randomColour();
        this.ctx.fillRect(
            row * this.pixelSize, col * this.pixelSize, 
            this.pixelSize,  this.pixelSize
        )
    }
}

var px = new pixelGrid('pbd', 15);

