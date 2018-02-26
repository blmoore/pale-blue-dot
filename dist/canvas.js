"use strict";
var getCoords = function (event) {
    return { x: event.offsetX, y: event.offsetY };
};
var pixelGrid = /** @class */ (function () {
    function pixelGrid(gridId, size) {
        var _this = this;
        this.pixelSize = size;
        this.canvas = document.getElementById(gridId);
        this.ctx = this.canvas.getContext('2d');
        // clear for redraw
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.colours = [''];
        this.squares = this.canvas.width / this.pixelSize;
        this.initGrid();
        var tileSwap = function (event) { return _this.changeTile(event); };
        this.canvas.addEventListener('click', tileSwap);
    }
    pixelGrid.prototype.initGrid = function () {
        for (var row = 0; row < this.squares; row++) {
            for (var col = 0; col < this.squares; col++) {
                this.ctx.fillStyle = this.randomColour();
                this.ctx.fillRect(row * this.pixelSize, col * this.pixelSize, this.pixelSize, this.pixelSize);
            }
        }
    };
    pixelGrid.prototype.randomColour = function () {
        var col = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        this.colours.push(col.substring(0, 7));
        if (this.colours.length > 50) {
            this.colours.shift();
        }
        // console.log(this.colours)
        return col;
    };
    pixelGrid.prototype.changeTile = function (event) {
        var loc = getCoords(event);
        var row = Math.floor(loc.x / this.pixelSize);
        var col = Math.floor(loc.y / this.pixelSize);
        this.ctx.fillStyle = this.randomColour();
        this.ctx.fillRect(row * this.pixelSize, col * this.pixelSize, this.pixelSize, this.pixelSize);
    };
    return pixelGrid;
}());
var canvasID = 'pbd';
var buildCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.id = canvasID, canvas.height = 500, canvas.width = 500;
    document.getElementById('canvas-container').appendChild(canvas);
};
var btn = document.getElementById('controls__draw')
    .addEventListener('click', function (e) {
    var cref = document.getElementById(canvasID);
    if (cref) {
        cref.parentNode.removeChild(cref);
    }
    var size = document.getElementById('px').value;
    buildCanvas();
    var pGrid = new pixelGrid(canvasID, parseInt(size));
});
//# sourceMappingURL=canvas.js.map