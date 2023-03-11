// --- No levels ---
// --- Random colors ---

// global variables
const grid = document.getElementById("grid");
let counter = 3;
let difficulty = 1;
let color1 = 0;
let color2 = 0;
let grid_array = [];
let col1 = "#f6d55c";
let col2 = "#219ebc";
let colors_1 = ["#f6d55c", "#fb8500", "#ffb703", "#84a59d", "#2a9d8f", "#ff006e", "#e5989b", "#d00000"];
let colors_2 = ["#219ebc", "#219ebc", "#023047", "#f6bd60", "#e76f51", "#3a86ff", "#6d6875", "#001219"];

// event listeners
document.getElementById("left_button").addEventListener("click", left_clicked);
document.getElementById("right_button").addEventListener("click", right_clicked);
for (let cp = 0; cp <= 7; cp++) {
    document.getElementById("cp"+cp).addEventListener("click", function(){pick_color(cp)});
}

function pick_color(color_num){
    col1 = colors_1[color_num]
    col2 = colors_2[color_num]
    console.log("col1 = ", col1);
    console.log("col2 = ", col2);
    reset_level()
}

// change the dimensions of the grid
function style_grid_container(dim){
    grid.style.gridTemplateColumns = "repeat("+dim+", 1fr)";
    grid.style.gridTemplateRows = "repeat("+dim+", 1fr)";
}

// generate new divs in the grid container
function make_grid_items(col_row_num){
    remove_divs("grid-item");
    for(let i = 0; i < (col_row_num ** 2); i++){
        const item = document.createElement("div");
        item.setAttribute("class", "grid-item");
        item.setAttribute("id", i+1);
        grid.appendChild(item);
    }
}

// clear all divs
function remove_divs(classname){
    const elements = document.getElementsByClassName(classname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// shuffle array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// --- color grid items:
// col_row_num = number of rows/cols of the grid
// dif1:dif2 = ratio between the different colors
// dif1:dif2 ratio is equivalent to difficulty of game (see Halberda et al)
function color_items(col_row_num, dif1, dif2){
    const dim = col_row_num ** 2;
    const frac = Math.floor(dim / (dif1+dif2))
    // randomly pick if dif1 is color1 or color2
    const ran_num = Math.round(Math.random())
    if (ran_num == 1) {
        color1 = dif1 * frac
        color2 = dif2 * frac
        // add the remainder to the larger(!) number
        if (color1 > color2) {
            color1 = color1 + (dim-(color1+color2))
        }else{
            color2 = color2 + (dim-(color1+color2))
        }
    }else{
        color1 = dif2 * frac
        color2 = dif1 * frac 
        // add the remainder to the larger(!) number
        if (color1 > color2) {
            color1 = color1 + (dim-(color1+color2))
        }else{
            color2 = color2 + (dim-(color1+color2))
        }
    }
    console.log("color1=", color1);
    console.log("color2=", color2);
    // generate an array of length: 1:(color1+color2)
    grid_array = Array.from({length: (color1+color2)}, (_, i) => i + 1);
    // shuffle the grid_array
    let shuffled_array = shuffle(grid_array);
    // color the first "color1" items of array with the first color
    let color1_array = shuffled_array.slice(0, color1);
    // chose a color pair - pick a random color pair from the array: colors1/2
    var color_num = Math.floor(Math.random()*8);
    console.log(color_num);
    for (let a = 0; a < color1_array.length; a++) {
        document.getElementById(color1_array[a]).style.backgroundColor = col1;
    };
    // color the other "color2" items of array with the 2nd color
    let color2_array = shuffled_array.slice(color1,)
    for (let b = 0; b < color2_array.length; b++) {
        // color grid blue - 
         // color grid item - pick a color pair from the array: colors1/2
         document.getElementById(color2_array[b]).style.backgroundColor = col2;
    };
    // color buttons
    document.getElementById("left_button").style.backgroundColor = col2;
    document.getElementById("right_button").style.backgroundColor = col1;
    console.log(col1)
}

// go up one level
function level_up(col_row_num){
    style_grid_container(col_row_num)
    make_grid_items(col_row_num);
    // coloring based on difficulty
    color_items(col_row_num, 7,8)
    // upper limit for level set here:
    if (counter <=31) {
        counter++;
        document.getElementById("title").innerHTML = "PUNKTE: " + (counter-2)
    // reset game upon winning
    }else{
        alert("GEWONNEN\nPUNKTE: " + (counter-2));
        reset_level()
        document.getElementById("title").innerHTML = "PUNKTE: " + (counter-2)
    }
    console.log("level=", counter)
}

// reset/restart game 
function reset_level(){
    style_grid_container(2);
    make_grid_items(2);
    color_items(2, 1, 3);
    counter = 3;
    document.getElementById("title").innerHTML = "PUNKTE: " + (counter-2)
}


// blue button clicked
function left_clicked(){
    if (color1 < color2) {
        level_up(counter);
    } else {
        alert("Leider falsch\nPUNKTE: " + (counter-2))
        reset_level();
    }
}

// yellow button clicked
function right_clicked(){
    if (color1 > color2) {
        level_up(counter);
    } else {
        alert("Leider falsch\nPUNKTE: " + (counter-2))
        reset_level();
    }
}

// initialize game
function init(){
    style_grid_container(2);
    make_grid_items(2);
    color_items(2, 1, 3)
}

init();

