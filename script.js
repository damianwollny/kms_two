const grid = document.getElementById("grid");

function style_grid_container(dim){
    grid.style.gridTemplateColumns = "repeat("+dim+", 1fr)";
    grid.style.gridTemplateRows = "repeat("+dim+", 1fr)";
}

function make_grid_items(div_item_number){
    var item = document.createElement("div");
    item.setAttribute("class", "grid-item");
    item.setAttribute("id", div_item_number);
    grid.appendChild(item);
    console.log(item)
}

// To do: put in "function next_level(){}" and connnect to key/click
style_grid_container(3)
for(let i = 0; i < 9; i++)
{
    make_grid_items(i)
}