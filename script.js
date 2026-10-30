const searchForm = document.querySelector("#food-search");
const searchInput = searchForm.querySelector('input[type="search"]');
const foodCategories = [...document.querySelectorAll(".food-category")];
const searchFeedback = document.querySelector("#search-feedback");
const categoryTrack = document.querySelector(".food-categories");

function resetFoodSearch() {
  foodCategories.forEach((category) => {
    category.hidden = false;
  });
  searchFeedback.textContent = "";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase();

  if (!query) {
    searchFeedback.textContent = "Enter a dish or food category to search.";
    searchInput.focus();
    return;
  }

  let matchCount = 0;
  foodCategories.forEach((category) => {
    const categoryText = `${category.textContent} ${category.querySelector("img").alt}`
      .toLocaleLowerCase();
    const matches = categoryText.includes(query);
    category.hidden = !matches;
    if (matches) matchCount += 1;
  });

  searchFeedback.textContent = matchCount
    ? `Showing ${matchCount} food ${matchCount === 1 ? "category" : "categories"} for "${searchInput.value.trim()}".`
    : `No food categories matched "${searchInput.value.trim()}". Try pizza, burger, biryani or desserts.`;
  document.querySelector("#food").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) resetFoodSearch();
});

document.querySelectorAll("[data-category-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.categoryDirection);
    categoryTrack.scrollBy({
      left: direction * categoryTrack.clientWidth * 0.75,
      behavior: "smooth",
    });
  });
});
