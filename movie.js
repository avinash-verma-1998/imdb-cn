const id = window.location.search.split("=")[1];
const url = `https://www.omdbapi.com/?apikey=2c9f0b30&i=${id}`;
const poster = document.querySelector(".poster");
const movieName = document.querySelector(".movie-name");
const details = document.querySelector(".details");
const ignore = [
  "Rated",
  "Released",
  "Awards",
  "Poster",
  "Ratings",
  "Metascore",
  "imdbID",
  "Type",
  "DVD",
  "BoxOffice",
  "Production",
  "Website",
  "Response",
  "Plot",
  "Title",
];

async function get(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    const body = await response.json();

    return body;
  } catch (error) {
    console.log(error);
  }
}

get(url).then((res) => {
  console.log(res.Plot);
  const { Poster, Title, Plot } = res;
  poster.setAttribute("src", Poster);
  const entry = document.createElement("p");
  entry.innerHTML = `${Plot}`;
  details.append(entry);
  movieName.innerHTML = Title;
  Object.keys(res).forEach((key) => {
    if (ignore.includes(key)) return;
    const entry = document.createElement("p");
    entry.innerHTML = `<b>${key}</b>: ${res[key]}`;
    details.append(entry);
  });
});
