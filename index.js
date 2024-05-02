//api url
const url = `http://www.omdbapi.com/?apikey=2c9f0b30&s=`;
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
  searchResult.innerHTML = "";
  result.forEach((movie) => {
    const title = movie.Title;
    const link = document.createElement("a");
    link.setAttribute("href", `./movie.html?id=${movie.imdbID}`);
    const movieItem = document.createElement("li");
    link.append(movieItem);
    movieItem.innerHTML = title;
    searchResult.append(link);
  });
  console.log(result);
}

function handleChange(e) {
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

input.addEventListener("change", handleChange);
