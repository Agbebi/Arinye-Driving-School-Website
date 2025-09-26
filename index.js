const menu = document.querySelector(".menu");
const bars = document.querySelector(".fa-bars");
const closingCaret = document.querySelector(".fa-caret-left");
const menuItems = document.querySelectorAll(".menu>ul>li")


bars.addEventListener("click", () => {
    menu.classList.add("show");    
});

// remove menu on clicks...

function removeMenu() {
    menu.classList.remove("show");
};


closingCaret.addEventListener("click", removeMenu);


menuItems.forEach(items => {
    items.addEventListener("click", removeMenu)
});