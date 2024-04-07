class Shape {
     constructor(shapeStructure) {
          this.shape = shapeStructure;
     }

     addToGrid(GRID) {
          console.log(this.shape);
          for (let i = 0; i < this.shape.length; i++) {
               for (let j = 0; j < this.shape[i].length; j++) {
                    GRID[i][j] = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;

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
                    if (this.shape[i][j].empty && GRID[x + 1][y] === FILL.FILLED) {
                         reachedBottom = true;
                         continue;
                    }

                    // cell is filled
                    if (!this.shape[i][j].empty && GRID[x + 1][y] === FILL.FILLED) {
                         console.log("reached bottom");
                         return true;
                    }

                    // set the previous position's as empty and mark the lower cells as filled
                    GRID[x][y] = FILL.EMPTY;
                    GRID[x + 1][y] = this.shape[i][j].empty ? FILL.EMPTY : FILL.FILLED;
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
                    if (GRID[x][y + 1] === undefined || GRID[x][y + 1] === 1) return;

                    // set the previous position's as empty and mark the right cells as filled
                    GRID[x][y] = 0;
                    GRID[x][y + 1] = FILL.FILLED;
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
                    if (GRID[x][y - 1] === undefined || GRID[x][y - 1] === 1) return;

                    // set the previous position's as empty and mark the right cells as filled
                    GRID[x][y] = 0;
                    GRID[x][y - 1] = FILL.FILLED;
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
