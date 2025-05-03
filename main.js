import { Top5Movies, searchMovies, getMovieDetails } from "./api/tmdbApi.js";

async function getPopularMovies() {
  const top5Movies = await Top5Movies();

  const searchTitle = document.getElementById("searchTitle");
  searchTitle.innerHTML = "인기 Top 5 영화";
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";
  top5Movies.forEach((movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movieCard";
    movieCard.id = movie.id;
    movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>평점: ${movie.vote_average}</p>
        <p>${movie.overview}</p>
      `;

    searchResults.appendChild(movieCard);
  });
}

getPopularMovies();
const popularMovie = document.getElementById("popularMovie");
popularMovie.addEventListener("click", async () => {
  await getPopularMovies();
});

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value;
  const data = await searchMovies(query);

  const searchError = document.getElementById("searchError");
  searchError.innerHTML = "";
  const searchTitle = document.getElementById("searchTitle");
  searchTitle.innerHTML = "검색 결과";
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = ""; // 이전 검색 결과 초기화

  if (data.length === 0) {
    searchTitle.innerHTML = "";
    const searchError = document.getElementById("searchError");
    searchError.innerHTML = "검색 결과가 없습니다.";
    return;
  }
  data.forEach((movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movieCard";
    movieCard.id = movie.id;
    movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>평점: ${movie.vote_average}</p>
          <p>${movie.overview}</p>
        `;

    searchResults.appendChild(movieCard);
  });
});

const searchResults = document.getElementById("searchResults");
searchResults.addEventListener("click", async (event) => {
  const movieCard = event.target.closest(".movieCard");
  if (movieCard) {
    const movieId = movieCard.id;
    const data = await getMovieDetails(movieId);
    showModal(data);
  }
});

function showModal(movie) {
  const oldModal = document.getElementById("movieModal");
  if (oldModal) oldModal.remove();

  // 모달 요소 생성
  const modal = document.createElement("div");
  modal.id = "modal";

  // 모달 내용
  modal.innerHTML = `
    <div id="movieModal">
      <button id="closeModalButton">&times;</button>
      <div>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" id="modalImage"">
      </div>
      <div class="modalText">
        <h2 style="margin: 10px 0;">${movie.title}</h2>
        <p><strong>장르:</strong> ${movie.genres.map((genre) => genre.name).join(", ")}</p>
        <p><strong>개봉일:</strong> ${movie.release_date}</p>
        <p><strong>상영시간:</strong> ${movie.runtime}분</p>
        <p><strong>평점:</strong> ${movie.vote_average}</p>
        <p style="margin-top: 16px;"><strong>줄거리: </strong>${movie.overview}</p>
      </div>
    </div>
  `;

  // 모달 닫기 버튼 이벤트
  modal.querySelector("#closeModalButton").addEventListener("click", () => {
    modal.remove();
  });

  // 모달 바깥 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  document.body.appendChild(modal);
}
