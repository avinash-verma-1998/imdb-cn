let movies = JSON.parse(localStorage.getItem("movies"));

console.log(movies);
const container = document.querySelector(".search-result");
Object.keys(movies).forEach((key) => {
  const movieElement = document.createElement("li");
  const link = document.createElement("a");
  link.setAttribute("href", `./movie.html?id=${key}`);
  movieElement.append(link);
  link.innerHTML = movies[key];
  container.append(movieElement);
});
