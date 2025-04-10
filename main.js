// ----- 画像読み込み ----- //
const input_selecter = document.getElementById("file_selector");
input_selecter.addEventListener("change", on_load);
document.addEventListener("DOMContentLoaded", on_load);

function on_load(){
    if (input_selecter.files[0]) {
        const url = URL.createObjectURL(input_selecter.files[0]);
        document.querySelector("svg").style.backgroundImage = `url(${url})`;
    }
}

// -----  パネル処理  ----- //
const back = document.querySelector("#back");
const go = document.querySelector("#go");
let history_of_svg = ['<polygon style="fill:#fff;fill-rule:nonzero;" points=""></polygon>'];
let history_of_svg_redone = [];
back.addEventListener("click", function() {
    if (history_of_svg[history_of_svg.length - 2]) {
        svg.innerHTML = history_of_svg[history_of_svg.length - 2];
        history_of_svg_redone.push(history_of_svg[history_of_svg.length - 1]);
        history_of_svg.pop();
        polygon = [...document.querySelectorAll("svg *")].slice(-1)[0];
    }
});
go.addEventListener("click", function() {
    if (history_of_svg_redone[history_of_svg_redone.length - 1]) {
        svg.innerHTML = history_of_svg_redone[history_of_svg_redone.length - 1];
        history_of_svg_redone.pop();
        history_of_svg.push(svg.innerHTML);

        polygon = [...document.querySelectorAll("svg *")].slice(-1)[0];
    }
});

// -----  キー処理  ----- //
document.addEventListener('keydown', function(e) {
    if (is_showing) {
        return;
    }
    if (e.code = "KeyN") {
        document.querySelector("#new").click();
    }
    if (e.metaKey || e.ctrlKey) {
        if (e.shiftKey) {
            if(e.code === "KeyZ"){
                go.click();
            }
        }else if(e.code === "KeyZ"){
            back.click();
        }else if(e.code === "KeyY"){
            go.click();
        }
    }
});

// ----- ブラシ ----- //
const shaping_button = document.querySelector("#shaping");
const showing_button = document.querySelector("#showing");
let is_shaping = true;
let is_showing = false;
shaping_button.addEventListener("click", function() {
    is_shaping = true;
    is_showing = false;
});
showing_button.addEventListener("click", function() {
    is_shaping = false;
    is_showing = true;
});

document.addEventListener("click", function(e) {
    if (is_shaping) {
        return;
    }
    if (e.target.classList.contains("polygon")) {
        toggle(e.target);
    }
});

const brush_elems = document.querySelectorAll(".brush");
brush_elems.forEach(function(e) {
    e.addEventListener("click", function() {
        brush_elems.forEach(function(elem) {
            elem.classList.remove("selected");
        });
        e.classList.add("selected");
    });
});
// ----- ポリゴン描画 ----- //
const svg = new_svg();
let polygon = new_polygon(svg);
document.querySelector("#new").addEventListener("click", function() {
    if (is_showing) {
        return;
    }
    history_of_svg_redone = [];
    if (polygon.getAttribute("points")) {
        polygon = new_polygon(svg);
    }
});
svg.addEventListener("click", function(e){
    if (is_showing) {
        return;
    }
    history_of_svg_redone = [];
    const current_points = polygon.getAttribute("points");
    const new_points = current_points + ` ${e.offsetX},${e.offsetY}`;
    polygon.setAttribute("points", new_points);

    history_of_svg.push(svg.innerHTML);
});

// ----- 関数 ----- //
function new_svg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.body.appendChild(svg);

    return svg;
}
function new_polygon(svg_elem) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("style", "fill:#fff;fill-rule:nonzero;");
    polygon.setAttribute("points", "");
    svg_elem.appendChild(polygon);
    polygon.classList.add("polygon");

    return polygon;
}
function toggle(elem) {
    if (is_shaping) {
        return;
    }
    elem.classList.toggle("none")
}