const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const MOVIE_ID = "76600";
const BASE_URL = `https://api.themoviedb.org/3/movie/76600`;
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function getMovieData() {
  try {
    const url = `${BASE_URL}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    renderMovie(data);
  } catch (error) {
    console.error("Erro ao carregar dados do TMDB:", error);
  }
}

function renderMovie(movie) {
  document.getElementById("movie-overview").innerText = movie.overview;
  document.getElementById("movie-poster").src =
    `${IMG_URL}${movie.poster_path}`;

const backdropElement = document.getElementById("bg-backdrop");

if (movie.backdrop_path) {
      // Montamos o link da imagem grande e aplicamos no estilo inline do CSS
      const formatoImagem = `url('${BACKDROP_BASE_URL}${movie.backdrop_path}')`;
      backdropElement.style.backgroundImage = formatoImagem;
  }

const dataISO = movie.release_date;
const [ano, mes, dia] = dataISO.split("-");
const dataFormatada = `${dia}/${mes}/${ano}`;

document.getElementById("release-date").innerText = `Lançamento: ${dataFormatada} (BR)`;
  // document.getElementById('rating').innerText = `⭐ ${movie.vote_average.toFixed(1)}`;

  const castGrid = document.getElementById('casting');
    movie.credits.cast.slice(0, 10).forEach(actor => {
        const actorDiv = document.createElement('div');
        actorDiv.className = 'cast-list';
        actorDiv.innerHTML = `
            <img src="${IMG_URL + actor.profile_path}" alt="${actor.name}">
            <p><strong>${actor.name}</strong></p>
            <p><small>como ${actor.character}</small></p>
        `;
        castGrid.appendChild(actorDiv);
    });
}

getMovieData();
