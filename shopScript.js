const items = getElementById("itemsContainer");
const categories = getElementById("categories");

categories.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        const category = event.target.dataset.category;
        filterItems(category);
    }
});