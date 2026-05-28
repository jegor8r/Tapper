const items = document.getElementById("itemsContainer");
const categories = document.getElementById("categories");
const powerUps = document.getElementById("PowerUpsBox");
const skins = document.getElementById("SkinsBox");
const fish = document.getElementById("FishBox");

let currentCategory = "Skins";

function showCategory(categoryName) {
    
    // Удаляем активный класс со всех категорий
    document.querySelectorAll(".categories > div").forEach(cat => {
        cat.classList.remove("active");
    });
    if (categoryName === "Skins") {
        skins.classList.add("active");
    } else if (categoryName === "PowerUps") {
        powerUps.classList.add("active");
    } else if (categoryName === "Fish") {
        fish.classList.add("active");
    }
    
    document.querySelectorAll(".item").forEach(item => {
        item.style.display = "none";
    });
    
    document.querySelectorAll(`.item[data-category="${categoryName}"]`).forEach(item => {
        item.style.display = "block";
    });
}
skins.addEventListener("click", () => showCategory("Skins"));
powerUps.addEventListener("click", () => showCategory("PowerUps"));
fish.addEventListener("click", () => showCategory("Fish"));
