const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const MOVIE_ID = "76600";
const BASE_URL = `https://api.themoviedb.org/3/movie/76600`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function getMovieData() {
  try {
    // 2. Agora montamos a URL com os parâmetros corretos
    // O primeiro é ?, os outros são &
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

// Função para preencher o HTML
function renderMovie(movie) {
  document.getElementById("movie-overview").innerText = movie.overview;
  document.getElementById("movie-poster").src =
    `${IMG_URL}${movie.poster_path}`;

const dataISO = movie.release_date;
const [ano, mes, dia] = dataISO.split("-");
const dataFormatada = `${dia}/${mes}/${ano}`;

document.getElementById("release-date").innerText = `Lançamento: ${dataFormatada} (BR)`;
  // document.getElementById('rating').innerText = `⭐ ${movie.vote_average.toFixed(1)}`;

  /* const castGrid = document.getElementById('main-crew');
    // Pegamos apenas os 4 primeiros atores para o exemplo
    movie.credits.cast.slice(0, 4).forEach(actor => {
        const actorDiv = document.createElement('div');
        actorDiv.className = 'actor-card';
        actorDiv.innerHTML = `
            <img src="${IMG_URL + actor.profile_path}" alt="${actor.name}" style="width:100px; border-radius:50%">
            <p><strong>${actor.name}</strong></p>
            <p><small>${actor.character}</small></p>
        `;
        castGrid.appendChild(actorDiv);
    }); */
}

// Iniciar a busca
getMovieData();
