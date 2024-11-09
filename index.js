const API_URL = "https://api.themoviedb.org/3/movie/361743/similar?&language=en-US&page=6&api_key=2a7d4498c790ee971ae3369d0327d57c";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


document.getElementById("trending-movies").addEventListener("click", () => {
    window.location.href = `movies.html`
});


getMovies(API_URL);

async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showTrendingMovies(data.results);
}

const trendingContainer = document.getElementById("trendingContainer");

function showTrendingMovies(movies) {
    trendingContainer.innerHTML = "";
    movies.forEach((movie) => {
        const { id, overview, title, release_date, poster_path, vote_average } = movie;

        if (vote_average >= 7) {
            const singleMovie = document.createElement("div");
            singleMovie.innerHTML = `
            
            <div class="flex  overflow-visible ">
                <img class="w-[132px] rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="${title}"> 
            </div>`

            trendingContainer.appendChild(singleMovie);

            singleMovie.addEventListener("click", () => {
                window.location.href = `singleMovie.html?id=${id}`
                
            });



        }
    });
}




rateFun = (rating) => {
    if (rating >= 8) {
        return "bg-green-400";
    } else if (rating >= 6) {
        return "bg-yellow-400";
    } else {
        return "bg-red-400";
    }
};
