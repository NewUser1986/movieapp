"use strict";

const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const pics = "https://image.tmdb.org/t/p/w1280";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

showMovies(apiUrl);
function showMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      data.results.forEach((element) => {
        const el = document.createElement("div");
        const image = document.createElement("img");
        const text = document.createElement("h2");

        text.innerHTML = `${
          truncateString(element.title, 30) +
          " | Rating ⭐" +
          element.vote_average
        }`;
        image.src = pics + element.poster_path;

        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchTerm = search.value;

  if (searchTerm) {
    showMovies(searchApi + searchTerm);
    search.value = "";
  } else {
    alert("Please add a search term");
  }
});

function truncateString(myString, limit) {
  const shortened = myString.indexOf(" ", limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}
