const GAME_ROOT = document.getElementById("game-root");
const TICKS_PER_SECOND = 4;
let GRID = [];
let SHAPE = null;
const SHAPE_TYPES = [Shape_O, Shape_I, Shape_L, Shape_T, Shape_Z];
const FILL = { EMPTY: false, FILLED: true };
const ROWS = 20;
const COLS = 10;
let PAUSED = true;
let GAME_LOOP_REF = null;

// set a new event on window
const UPDATE_EVENT = new Event("update");

function createGrid(rows, cols) {
     // create grid
     GRID = new Array(rows).fill().map(() => new Array(cols).fill().map(() => new Block()));

     // add the first shape to the grid
     addNewShape();
     // create the initial dom node to show playing area before the game loop kicks in
     recreateDOMNodes();
}

createGrid(ROWS, COLS);

function startGame() {
     PAUSED = false;
     // start the game loop
     GAME_LOOP_REF = setInterval(() => {
          removeDOMNodes();
          recreateDOMNodes();
          updateShapes();
     }, 1000 / TICKS_PER_SECOND);
}

function pauseGame() {
     PAUSED = true;
     clearInterval(GAME_LOOP_REF);
}

window.addEventListener("keydown", function (event) {
     if (event.code === "Space") {
          if (PAUSED) startGame();
          else pauseGame();
     } else if (event.code === "ArrowRight") SHAPE?.moveRight?.(GRID);
     else if (event.code === "ArrowLeft") SHAPE?.moveLeft?.(GRID);
     else if (event.code === "ArrowDown") updateShapes();
     // else if (event.code === "ArrowUp") SHAPE?.rotate(GRID);

     window.dispatchEvent(UPDATE_EVENT);
});

window.addEventListener("update", (event) => {
     removeDOMNodes();
     recreateDOMNodes();
});

function updateShapes() {
     if (SHAPE?.moveDown?.(GRID)) {
          if (checkGameOver()) return restartGame();
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

               if (GRID[i][j].filled === FILL.FILLED) {
                    cell.classList.add("filled");
                    cell.style.backgroundColor = GRID[i][j].color;
               }
               row.appendChild(cell);
          }
          GAME_ROOT.appendChild(row);
     }
}

function removeFullRows() {
     const NEW_GRID = [];
     let count = 0;

     for (let i = GRID.length - 1; i >= 0; i--) {
          if (GRID[i].every((cell) => cell.filled === FILL.FILLED)) {
               GRID[i] = GRID[i].map((cell) => ({ ...cell, filled: FILL.EMPTY }));
               count++;
          } else NEW_GRID.unshift([...GRID[i]]);
     }

     // normalize new grid
     for (let i = 0; i < count; i++) NEW_GRID.unshift(new Array(COLS).fill().map(() => new Block()));

     GRID = NEW_GRID;
}

function checkGameOver() {
     return GRID[0].some((cell) => cell.filled === FILL.FILLED);
}

function restartGame() {
     SHAPE = null;
     createGrid(ROWS, COLS);
     window.dispatchEvent(UPDATE_EVENT);
}
