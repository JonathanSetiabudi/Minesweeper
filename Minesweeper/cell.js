function Cell(i, j, w) {
    let mine;
    //decides whether or not the cell will have a mine or not
    /* if (random(1) < 0.5){
        mine = true;
    }
    else {
        mine = false;
    }*/
    mine = false;
    //returns a cell object
    return {
        //whether the tile is a mine or not
        mine: mine,
        //whether the tile is revealed or not
        revealed: false,
        //whether the tile is marked or not
        marked: false,
        //column index
        i: i,
        //row index
        j: j,
        //x position
        x: i * w,
        //y position
        y: j * w,
        //width and length of the cell
        w: w,
        //number of mines around the cell
        count: 0,
        //show function so p5.js library can draw it.
        show() {
            stroke(0);
            noFill();
            
            if(rightPressed){
                rightPressed = false;
            }
            //draws the square/borders of the cell
            rect(this.x, this.y, this.w, this.w);
            if (this.marked && !this.revealed) {
                //this draws the flag pole
                line(this.x + this.w * 0.4, this.y + this.w * 0.25, this.x + this.w * 0.4, this.y + this.w * 0.75);
                //sets the color of the flag which is red
                let red = color(199, 0, 57);
                fill(red);
                //draws the flag as a triangle
                triangle(this.x + this.w * 0.43, this.y + this.w * 0.25, this.x + this.w * 0.43, this.y + this.w * 0.5, this.x + this.w * 0.75, this.y + this.w * 0.375);
            }
            //checks if revealed is true then will check if its a mine
            else if (this.revealed) {
                //draws the red flag if it is a rightclick
                if (this.mine) {
                    let black = color(0, 0, 0);
                    fill(black);
                    circle(this.x + this.w * 0.50, this.y + this.w * 0.50, this.w * 0.5);
                }
                //if there is no mine, make it slightly darker so user sees difference
                else {
                    fill(200);
                    rect(this.x, this.y, this.w, this.w);
                    if (this.count != 0) {
                        fill(0);
                        textAlign(CENTER);
                        textSize(w * 0.5);
                        text(this.count, this.x + this.w * 0.5, this.y + this.w * 0.7);
                    }
                }
            }
        },
        //This function checks whether the value x and y are within the boundaries of the cell/gridsquare
        contains(x, y) {
            return (x > this.x && x < this.x + this.w) && (y > this.y && y < this.y + this.w);
        },
        //function to set revealed to true once clicked on
        reveal() {
            this.revealed = true;
            if (this.count == 0) {
                //floodfill
                this.floodFill();
            }
        },
        mark() {
            this.marked = !this.marked;
        },
        countMines() {
            if (this.mine) {
                this.count = -1;
                return;
            }
            let total = 0;
            for (let xoff = -1; xoff <= 1; xoff++) {
                for (let yoff = -1; yoff <= 1; yoff++) {
                    let i = this.i + xoff;
                    let j = this.j + yoff;
                    if (i > -1 && i < cols && j > -1 && j < rows) {
                        let neighbor = grid[i][j];
                        if (neighbor.mine) {
                            total++;
                        }
                    }
                }
            }
            this.count = total;
        },
        floodFill() {
            for (let xoff = -1; xoff <= 1; xoff++) {
                for (let yoff = -1; yoff <= 1; yoff++) {
                    let i = this.i + xoff;
                    let j = this.j + yoff;
                    if (i > -1 && i < cols && j > -1 && j < rows) {
                        let neighbor = grid[i][j];
                        if (!neighbor.mine && !neighbor.revealed) {
                            neighbor.reveal();
                        }
                    }
                }
            }
        }
    }
}