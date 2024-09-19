function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
//the width of the user's screen * 2/3 for the board size
let screenWidth = window.innerWidth * 0.66;
// the width and length of each cell/gridsquare
let w = screenWidth / 10;
let totalMines = 10;
//for rightclicks in order to add markers
let rightPressed = false;

function resetGame(){
    //pick totalMines spots
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = false;
            grid[i][j].mine = false;
            grid[i][j].marked = false;
        }
    }
}

function setMines(){
    for (let n = 0; n < totalMines; n++) {
        let i = floor(random(cols));
        let j = floor(random(rows));
        if (!grid[i][j].mine) {
            grid[i][j].mine = true;
        }
        else { n--; }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }
}

function setEasy(){
    totalMines = 10;
    resetGame();
    setMines();
}

function setNormal(){
    totalMines = 15;
    resetGame();
    setMines();
}

function setHard(){
    totalMines = 20;
    resetGame();
    setMines();
}

//p5.js function for setup
function setup() {

    createCanvas(screenWidth + 3, screenWidth + 50);
    //code for the easy difficulty button
    easybutton = createButton('Easy');
    easybutton.position(screenWidth / 3 + 15, screenWidth + 150);
    easybutton.mousePressed(setEasy);
    //code for the normal difficulty button
    normalbutton = createButton('Normal');
    normalbutton.position(2*screenWidth / 3 + 15, screenWidth + 150);
    normalbutton.mousePressed(setNormal);
    //code for the hard difficulty button
    hardbutton = createButton('Hard');
    hardbutton.position(screenWidth + 15, screenWidth + 150);
    hardbutton.mousePressed(setHard);

    //Use math to find out how many columns and rows we need and then floor it so we don't have say 20.1 rows
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //pick totalMines spots
    for (let n = 0; n < totalMines; n++) {
        let i = floor(random(cols));
        let j = floor(random(rows));
        if (!grid[i][j].mine) {
            grid[i][j].mine = true;
        }
        else { n--; }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }

}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].reveal();
        }
    }
}

//this is a p5.js function that is able to tell when the mouse is pressed
//this code block will automatically run when the user presses their mouse.
function mousePressed() {
    if(mouseButton === RIGHT){rightPressed = true;}
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //when the user clicks, a mouseX and mouseY value will be sent to the p5 which we use below
            //Yes I know this is resource intensive having a O(n) loop for each mouse click but most computers now a days can handle this
            if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].reveal != true && rightPressed === false) {
                grid[i][j].reveal();

                if (grid[i][j].mine) {
                    gameOver();
                }
            }
            else if(grid[i][j].contains(mouseX, mouseY) && grid[i][j].reveal != true && rightPressed === true){
                grid[i][j].mark();
            }
        }
    }
}


//p5.js function that draws the board
function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

