import API_KEY from "./config.js";

export async function Top5Movies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok" + response.statusText);
  }
  const data = await response.json();

  return data.results.slice(0, 5);
}

export async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&language=ko-KR`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok" + response.statusText);
  }
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok" + response.statusText);
  }
  const data = await response.json();
  return data;
}
