function displayHome() {
    hideAllSections(); 
    document.getElementById('home').style.display = 'block'; 
}

function displayRecommendations() {
    hideAllSections(); 
    document.getElementById('genreSelectDiv').style.display = 'block'; 
    document.getElementById('recommendations').innerHTML = ''; 
    document.getElementById('recommendations').style.display = 'block'; 
}

function displayWeeklyMovies() {
    hideAllSections(); 
    document.getElementById('weeklyMovies').style.display = 'block'; 
    getWeeklyMovies(); 
}

function displayDailyMovies() {
    hideAllSections(); 
    document.getElementById('dailyMovies').style.display = 'block'; 
    getDailyMovies(); 
}

function displaySettings() {
    hideAllSections(); 
    document.getElementById('settings').style.display = 'block'; 
}

function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('genreSelectDiv').style.display = 'none';
    document.getElementById('recommendations').style.display = 'none';
    document.getElementById('weeklyMovies').style.display = 'none';
    document.getElementById('dailyMovies').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
}

async function getWeeklyMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=seninkey`);
    const data = await response.json();
    const movies = data.results;
    const randomMovies = getRandomMovies(movies, 10);
    displayMovies(randomMovies, '', 'weeklyMoviesList');
}

async function getDailyMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=seninkey`);
    const data = await response.json();
    const movies = data.results;
    const randomMovies = getRandomMovies(movies, 10);
    displayMovies(randomMovies, '', 'dailyMoviesList');
}

function getRandomMovies(movies, count) {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayMovies(movies, title, listId) {
    const listDiv = document.getElementById(listId);
    listDiv.innerHTML = `<h3>${title}</h3>`;
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h4>${movie.title}</h4>
            <p>Yayın Tarihi: ${movie.release_date}</p>
            <p>Oylar: ${movie.vote_average}</p>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        `;
        listDiv.appendChild(movieCard);
    });
}

async function getRecommendations() {
    try {
        const genreSelect = document.getElementById('genre');
        const genre = genreSelect.value;

        const genreMap = {
            'aile': 10751,
            'aksiyon': 28,
            'romantik': 10749,
            'komedi': 35,
            'drama': 18,
            'animasyon': 16,
            'macera': 12
        };

        const genreId = genreMap[genre];
        const randomPage = Math.floor(Math.random() * 500) + 1;

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=seninkey&with_genres=${genreId}&page=${randomPage}`);
        const data = await response.json();
        const movies = data.results;

        const recommendationsDiv = document.getElementById('recommendations');
        recommendationsDiv.innerHTML = '<h2>Öneriler</h2>';

        movies.slice(0, 10).forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <h4>${movie.title}</h4>
                <p>Yayın Tarihi: ${movie.release_date}</p>
                <p>Oylar: ${movie.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            `;
            recommendationsDiv.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Hata:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const pages = document.querySelectorAll(".page");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const currentPage = document.querySelector(".page.active");
            const nextPage = document.getElementById(targetId);

            if (currentPage !== nextPage) {
                currentPage.classList.add("exiting");
                setTimeout(() => {
                    currentPage.classList.remove("active", "exiting");
                    nextPage.classList.add("active");
                }, 500);
            }
        });
    });
});
