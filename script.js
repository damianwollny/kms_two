// global variables
const grid = document.getElementById("grid");
let counter = 3;

// event listeners
document.getElementById("b1").addEventListener("click", green_clicked);
document.getElementById("b2").addEventListener("click", red_clicked);

// change the dimensions of the grid
function style_grid_container(dim){
    grid.style.gridTemplateColumns = "repeat("+dim+", 1fr)";
    grid.style.gridTemplateRows = "repeat("+dim+", 1fr)";
}

// generate new divs in the grid container
function make_grid_items(col_row_num){
    remove_divs("grid-item");
    for(let i = 0; i < (col_row_num ** 2); i++){
        let item = document.createElement("div");
        item.setAttribute("class", "grid-item");
        item.setAttribute("id", i+1);
        grid.appendChild(item);
        console.log(item)    
    }
}

// clear all divs
function remove_divs(classname){
    const elements = document.getElementsByClassName(classname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// go up one level
function level_up(col_row_num){
    style_grid_container(col_row_num)
    make_grid_items(col_row_num);
    counter++;
}

// reset/restart game 
function reset_level(){
    style_grid_container(2);
    make_grid_items(2);
    counter = 3;
}

// green button clicked
function green_clicked(){
    level_up(counter);
}

// red button clicked
function red_clicked(){
    reset_level();
}

reset_level();