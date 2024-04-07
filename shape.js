const COLORS = ["#de2d24ff", "#266ac3ff", "#f82173ff", "#33c03fff", "#cfc424ff"];

class Shape {
     constructor(shapeStructure) {
          this.shape = shapeStructure;
          this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
     }

     addToGrid(GRID) {
          for (let i = 0; i < this.shape.length; i++) {
               for (let j = 0; j < this.shape[i].length; j++) {
                    GRID[i][j].filled = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;
                    GRID[i][j].color = this.color;

                    this.shape[i][j].x = i;
                    this.shape[i][j].y = j;
               }
          }
     }

     moveDown(GRID) {
          let reachedBottom = false;

          // update in reverse order
          for (let i = this.shape.length - 1; i >= 0; i--) {
               for (let j = 0; j < this.shape[i].length; j++) {
                    const x = this.shape[i][j].x;
                    const y = this.shape[i][j].y;

                    // return true to remove the shape and cement it's last position in the grid
                    // the shape has reached the bottom of the grid or is at the lowest it can go
                    // ground check
                    if (GRID[x + 1] === undefined) return true;

                    // above a block check
                    // cell is empty
                    if (this.shape[i][j].empty && GRID[x + 1][y].filled === FILL.FILLED) {
                         reachedBottom = true;
                         continue;
                    }

                    // cell is filled
                    if (!this.shape[i][j].empty && GRID[x + 1][y].filled === FILL.FILLED) return true;

                    // set the previous position's as empty and mark the lower cells as filled
                    GRID[x][y].filled = FILL.EMPTY;
                    // set fill and color
                    GRID[x + 1][y].filled = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;
                    GRID[x + 1][y].color = this.color;

                    this.shape[i][j].x = this.shape[i][j].x + 1;
               }
          }

          if (reachedBottom) return true;
     }

     moveRight(GRID) {
          // update from right to left
          for (let i = 0; i < this.shape.length; i++) {
               for (let j = this.shape[i].length - 1; j >= 0; j--) {
                    const x = this.shape[i][j].x;
                    const y = this.shape[i][j].y;

                    // right side wall check
                    if (GRID[x][y + 1] === undefined || GRID[x][y + 1].filled === FILL.FILLED) return;

                    // set the previous position's as empty and mark the right cells as filled
                    GRID[x][y].filled = 0;
                    GRID[x][y + 1].filled = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;
                    GRID[x][y + 1].color = this.color;
                    this.shape[i][j].y = this.shape[i][j].y + 1;
               }
          }
     }

     moveLeft(GRID) {
          // update from right to left
          for (let i = 0; i < this.shape.length; i++) {
               for (let j = 0; j < this.shape[i].length; j++) {
                    const x = this.shape[i][j].x;
                    const y = this.shape[i][j].y;

                    // right side wall check
                    if (GRID[x][y - 1] === undefined || GRID[x][y - 1].filled === FILL.FILLED) return;

                    // set the previous position's as empty and mark the right cells as filled
                    GRID[x][y].filled = 0;
                    GRID[x][y - 1].filled = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;
                    GRID[x][y - 1].color = this.color;
                    this.shape[i][j].y = this.shape[i][j].y - 1;
               }
          }
     }
}

class Shape_O extends Shape {
     constructor() {
          super([
               [new Cell(), new Cell()],
               [new Cell(), new Cell()]
          ]);
     }
}

class Shape_T extends Shape {
     constructor() {
          super([
               [new Cell(), new Cell(), new Cell()],
               [new Cell(true), new Cell(), new Cell(true)]
          ]);
     }
}
class Shape_I extends Shape {
     constructor() {
          super([[new Cell(), new Cell(), new Cell(), new Cell()]]);
     }
}

class Shape_L extends Shape {
     constructor() {
          super([
               [new Cell(), new Cell(), new Cell()],
               [new Cell(true), new Cell(true), new Cell()]
          ]);
     }
}

class Shape_Z extends Shape {
     constructor() {
          super([
               [new Cell(), new Cell(), new Cell(true)],
               [new Cell(true), new Cell(), new Cell()]
          ]);
     }
}

class Cell {
     constructor(empty, x = 0, y = 0) {
          this.x = x;
          this.y = y;
          this.empty = empty;
     }
}
