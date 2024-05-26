//api url
const url = `https://www.omdbapi.com/?apikey=2c9f0b30&s=`;
const input = document.querySelector(".search");
const searchResult = document.querySelector(".search-result");
let controller;

async function get(url) {
  controller = new AbortController();
  const signal = controller.signal;
  try {
    const response = await fetch(url, { method: "GET", signal });
    const body = await response.json();

    return body;
  } catch (error) {
    console.log(error);
  }
}

function addToFav(id, name) {
  return (e) => {
    let list = JSON.parse(localStorage.getItem("movies"));
    if (!list) list = {};
    if (list[id] !== undefined) {
      delete list[id];
      e.target.classList.remove("fav");
      e.target.innerHTML = "add to fav";
    } else {
      list[id] = name;
      e.target.classList.add("fav");
      e.target.innerHTML = "Fav";
    }
    localStorage.setItem("movies", JSON.stringify(list));
    console.log(localStorage.getItem("movies"), list);
  };
}

function setLoading(state) {
  if (state) {
    searchResult.innerHTML = "<h3 class='loading'>...loading</h4>";
  } else {
    searchResult.innerHTML = "";
  }
}
function renderError() {
  searchResult.innerHTML = "<h1 class='loading'> No results found!</h1>";
}
function renderResults(result) {
  const favMovies = JSON.parse(localStorage.getItem("movies"));

  searchResult.innerHTML = "";
  result.forEach((movie) => {
    const title = movie.Title;
    const button = document.createElement("button");
    const link = document.createElement("a");
    const movieItem = document.createElement("li");
    const { imdbID } = movie;
    link.setAttribute("href", `./movie.html?id=${imdbID}`);
    link.innerHTML = title;
    button.innerHTML = "add to fav";
    button.addEventListener("click", addToFav(imdbID, title));
    if (favMovies && favMovies[imdbID]) {
      button.innerHTML = "fav";
      button.classList.add("fav");
    }
    movieItem.append(link);
    movieItem.append(button);
    searchResult.append(movieItem);
  });
  console.log(result);
}

function handleKeyDown(e) {
  if (controller) {
    controller.abort();
  }
  const query = e.target.value;
  if (!query.length) return;
  setLoading(true);
  get(url + query)
    .then((result) => {
      setLoading(false);
      if (result.Error) {
        renderError();
      } else {
        renderResults(result.Search);
      }
    })
    .catch(() => {
      setLoading(false);
    });
}

input.addEventListener("keydown", handleChange);
