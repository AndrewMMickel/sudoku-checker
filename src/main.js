const size = 40;

let sudoku;
  
class Cell {
    constructor(value, stored = true) {
        this.value   = value;
        this.stored  = stored;
        this.focused = false;
    }
}

class Grid {
    constructor() {
        this.cells = [];
        this.solutions;
    }

    getCell(row, col) {
        return this.cells[row * 9 + col];
    }

    setCell(row, col, value) {
        this.cells[row * 9 + col] = new Cell(value);
        return this;
    }

    generate() {
        for(let i = 0; i < 81; i++) {
            if(this.cells[i].value === 0) {
                let values = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for(let value of values) {
                    if(this.possible(Math.floor(i / 9), i % 9, value)) {
                        this.cells[i].value = value;
                        if(this.generate()) {
                            return true;
                        }
                        this.cells[i].value = 0;
                    }
                }

                return false;
            }
        }

        return true;
    }
}


function setup() {
    createCanvas(size * 9, size * 9);
    frameRate(10);

    sudoku = new Sudoku();
}

function draw() {
    clear();

    textSize(size / 2);
    for(let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;

        let cell = sudoku.grid.getCell(row, col);

        stroke(96);
        if(cell.focused) {
            fill(96);
        } else {
            noFill();
        }
        square(col * size, row * size, size);

        noStroke();
        fill(cell.stored ? 255 : 192);
        textFont(cell.stored ? 'Lemonada' : 'Shadows Into Light');
        text(cell.value ? cell.value : '', col * size + size / 3, row * size + size / 1.5);
    }

    stroke(255);
    noFill();
    square(0, 0, width);
    line(width / 3, 0, width / 3, height);
    line(width / 3 * 2, 0, width / 3 * 2, height);
    line(0, height / 3, width, height / 3);
    line(0, height / 3 * 2, width, height / 3 * 2);
}