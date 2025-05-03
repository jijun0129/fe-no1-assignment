import API_KEY from "./config.js";

export default function Top5Movies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const top5 = data.results.slice(0, 5);
      return top5;
    });
}

export default function searchMovies(query) {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value; // 검색어
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&language=ko-KR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
}

export default function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
