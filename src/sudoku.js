class Sudoku {
    constructor() {
        this.grid = Grid.init();

        this.grid.generate();
        this.clearCells();
    }
}