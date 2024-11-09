const API_URL = "https://api.themoviedb.org/3/movie/361743/similar?&language=en-US&page=6&api_key=2a7d4498c790ee971ae3369d0327d57c";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


const main = document.getElementById("main");
console.log(main);


async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showMovies(data.results);
}

getMovies(API_URL);

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { id, overview, title, release_date, poster_path, vote_average } = movie;

        const singleMovie = document.createElement("div");
        singleMovie.innerHTML =
        `
<div class="py-3 sm:max-w-md sm:mx-auto">
    <div class="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-2xl border-gray-200 max-h-72 border sm:rounded-3xl p-6 flex space-x-6">
        <div class="h-40 overflow-visible w-1/2">
            <img class="rounded-3xl shadow-xl" src="${IMG_PATH + poster_path}" alt="">
        </div>
        <div class="flex flex-col w-1/2 space-y-2">
            <div class="justify-between items-start">
                <h2 class="text-lg font-semibold text-white">${title}</h2>
                <p class="text-white text-sm">IMDb: ${Math.round(vote_average)}.0</p>
            </div>
            <div>
                <div class="text-xs text-gray-200">${release_date}</div>
            </div>
            <p class="text-gray-300 max-h-32 overflow-y-hidden text-xs">${overview.slice(0, 95)}...</p>
            <div class="flex justify-between items-center text-xs font-semibold text-teal-400">
                <span>Price:</span>
                <span>$10</span>
            </div>
            <div class="flex justify-between items-center">
                <button class="bg-gradient-to-r from-teal-600 to-teal-800 text-white px-3 py-1.5 rounded-xl text-xs font-medium hover:from-teal-500 hover:to-teal-700 transition-all">
                    Learn More
                </button>
            </div>
        </div>
    </div>
</div>





        `

        main.appendChild(singleMovie);

        singleMovie.addEventListener("click", () => {
            window.location.href = `singleMovie.html?id=${id}`
        })


    });

}




rateFun = (rating) => {
    if (rating >= 8) {
        return "bg-green-400"
    } else if (rating >= 6) {
        return "bg-yellow-400"
    } else {
        return "bg-red-400"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    getMovies(SEARCH_API + searchTerm);
})


