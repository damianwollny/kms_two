const grid = document.getElementById("grid");

for(let i = 1; i < 5; i++)
{
    make_divs(i)
}

function make_divs(div_item_number){
    var item = document.createElement("div");
    item.setAttribute("class", "grid-item");
    item.setAttribute("id", div_item_number);
    grid.appendChild(item);
    console.log(item)
}