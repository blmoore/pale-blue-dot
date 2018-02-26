
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
    squares: number;
    colours: string[];
    
    constructor(gridId: string, size: number) {
        this.pixelSize = size;
        this.canvas = <HTMLCanvasElement> document.getElementById(gridId);
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        
        // clear for redraw
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.colours = [''];

        this.squares = this.canvas.width / this.pixelSize;
        this.initGrid();
        
        let tileSwap = (event: MouseEvent) => this.changeTile(event)
        this.canvas.addEventListener('click', tileSwap)
    }
    
    initGrid() {
        for (let row = 0; row < this.squares; row++) {
            for (let col = 0; col < this.squares; col++) {
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
        // console.log(this.colours)
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

let canvasID = 'pbd'

const buildCanvas = () => {
    let canvas = document.createElement('canvas')
    canvas.id = canvasID, canvas.height = 500, canvas.width = 500;
    (<HTMLElement> document.getElementById('canvas-container')).appendChild(canvas)
}

let btn = (<HTMLInputElement> document.getElementById('controls__draw'))
    .addEventListener('click', (e) => {
        let cref = document.getElementById(canvasID)
        if (cref) {
            (<HTMLInputElement> cref.parentNode).removeChild(cref);
        }

        let size = (<HTMLInputElement> document.getElementById('px')).value;
        buildCanvas();
        let pGrid = new pixelGrid(canvasID, parseInt(size));
    })


