var navLinks = document.getElementById("navLinks");
var hideButton = document.getElementById("hideButton");
var menuBG = document.getElementById("menuBG");

function showMenu() {
  hideButton.style.visibility = "hidden";
  menuBG.style.filter = "blur(3px)";
  // navLinks.style.display = "block";
  navLinks.style.right = "0";
}
function hideMenu() {
  hideButton.style.visibility = "visible";
  menuBG.style.filter = "blur(0px)";
  // navLinks.style.display = "none";
  navLinks.style.right = "-200px";
}

////// submit product /////////

let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let ingredientList = document.querySelector(".ingredientList");
let ingredeintDiv = document.querySelectorAll(".ingredeintDiv")[0];

addIngredientsBtn.addEventListener("click", function () {
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName("input")[0];
  input.value = "";
  ingredientList.appendChild(newIngredients);
});
