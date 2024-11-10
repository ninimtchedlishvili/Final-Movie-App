const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&quot";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


const main = document.getElementById("main");
console.log(main);


async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showMovies(data.results);
}

const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    18: "Drama",
    27: "Horror",
    35: "Comedy",
    36: "History",
    53: "Thriller",
    80: "Crime",
    878: "Science Fiction",
    9648: "Mystery",
    10749: "Romance",
    10751: "Family"
};



getMovies(API_URL);

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { id, genre_ids, overview, title, release_date, poster_path, vote_average } = movie;

        const singleMovie = document.createElement("div");
        singleMovie.innerHTML = `
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
                       
                        <div class="flex justify-between items-center">
                            <button class="learnMore bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl">
                                Buy Tickets
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        main.appendChild(singleMovie);

        // const filterBtn = document.getElementById("filterBtn");

        // filterBtn.addEventListener("click", (genreId) => {
        //     main.innerHTML = "";
        //     const key = genres.key;
        //     if(genre_ids.includes(key)){
        //         main.appendChild(singleMovie);

        //     }
        // })


        const learnMoreBtn = singleMovie.querySelector(".learnMore")

        learnMoreBtn.addEventListener("click", () => {
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



