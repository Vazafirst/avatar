const movieposter = document.getElementById("movie-poster");
const posterexpanded = document.getElementById("poster-expanded");

movieposter.addEventListener("click", () => {
    posterexpanded.style.display = "flex";
});