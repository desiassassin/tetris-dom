const GAME_ROOT = document.getElementById("game-root");
const TICK_RATE = 10;
let GRID = [];
let SHAPE = null;
const SHAPE_TYPES = [Shape_O, Shape_I, Shape_L, Shape_T, Shape_Z];
const FILL = {
     EMPTY: 0,
     FILLED: 1
};
const ROWS = 20;
const COLS = 10;

// set a new event on window
const UPDATE_EVENT = new Event("update");

(function createGrid(rows, cols) {
     // create grid
     for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) row.push(FILL.EMPTY);
          GRID.push(row);
     }

     // add the first shape to the grid
     addNewShape();
     // create the initial dom node
     recreateDOMNodes();
})(ROWS, COLS);

setInterval(() => {
     removeDOMNodes();
     recreateDOMNodes();
     updateShapes();
}, 500);

window.addEventListener("keydown", function (event) {
     if (event.code === "Space") {
          // todo add rotation
     } else if (event.code === "ArrowRight") SHAPE?.moveRight?.(GRID);
     else if (event.code === "ArrowLeft") SHAPE?.moveLeft?.(GRID);
     else if (event.code === "ArrowDown") SHAPE?.moveDown?.(GRID);

     window.dispatchEvent(UPDATE_EVENT);
});

window.addEventListener("update", (event) => {
     removeDOMNodes();
     recreateDOMNodes();
});

function updateShapes() {
     if (SHAPE?.moveDown?.(GRID)) {
          removeFullRows();
          addNewShape();
     }
}

function addNewShape() {
     SHAPE = new SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]();
     SHAPE.addToGrid(GRID);
}

function removeDOMNodes() {
     document.querySelectorAll(".row").forEach((cell) => cell.remove());
}

function recreateDOMNodes() {
     for (let i = 0; i < GRID.length; i++) {
          const row = document.createElement("div");
          row.classList.add("row");

          for (let j = 0; j < GRID[i].length; j++) {
               const cell = document.createElement("div");
               cell.classList.add("cell");
               cell.id = `${i}-${j}`;
               row.appendChild(cell);

               if (GRID[i][j] == FILL.FILLED) cell.classList.add("filled");
          }
          GAME_ROOT.appendChild(row);
     }
}

function removeFullRows() {
     const NEW_GRID = [];
     let count = 0;

     for (let i = GRID.length - 1; i >= 0; i--) {
          if (GRID[i].every((cell) => cell == 1)) {
               GRID[i] = GRID[i].map(() => FILL.EMPTY);
               count++;
          } else NEW_GRID.unshift([...GRID[i]]);
     }

     // normalize new grid
     for (let i = 0; i < count; i++) NEW_GRID.unshift(new Array(COLS).fill(0));

     GRID = NEW_GRID;
}
