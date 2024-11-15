const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&quot";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';



document.getElementById("allMovies").addEventListener("click", () => {
    window.location.href = `movies.html`
    
});

document.getElementById("allMovies1").addEventListener("click", () => {
    window.location.href = `movies.html`
    
});

document.getElementById("homePage").addEventListener("click", () => {
    window.location.href = `index.html`
    
});

document.getElementById("logIn").addEventListener("click", () => {
    window.location.href = `logIn.html`
});

document.getElementById("signUp").addEventListener("click", () => {
    window.location.href = `signUp.html`
});

document.getElementById("policy").addEventListener("click", () => {
    window.location.href = `policy.html`
});

document.getElementById("contact").addEventListener("click", () => {
    window.location.href = `contact.html`
});





getMovies(API_URL);

async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showTrendingMovies(data.results);
}

const trendingContainer = document.getElementById("trendingContainer");




function showTrendingMovies(movies) {
    trendingContainer.innerHTML = ""; // Clear previous content
    movies.forEach((movie, index) => {
        const { id, title, poster_path, vote_average } = movie;

        if (vote_average >= 6) {
            const singleMovie = document.createElement("div");
            singleMovie.classList.add("flex", "overflow-visible"); // Set up flex container for each movie
            singleMovie.style.animationDelay = `${index * 0.1}s`; // Staggered delay for the drop effect

            singleMovie.innerHTML = `
                <div class="flex overflow-visible">
                    <img class="w-[132px] rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="${title}">
                </div>
            `;

            trendingContainer.appendChild(singleMovie);

            // Wait for the movie to be appended to DOM, then trigger the animation by adding the 'drop' class
            setTimeout(() => {
                singleMovie.classList.add("drop");
            }, 0); // Apply animation class after appending

            singleMovie.addEventListener("click", () => {
                window.location.href = `singleMovie.html?id=${id}`;
            });
        }
    });
}

const venom = document.getElementById("venom");
const wildRobot = document.getElementById("wildRobot");
const deadpool = document.getElementById("deadpool");

venom.addEventListener("click", () => {
    window.location.href = `singleMovie.html?id=912649`
})

wildRobot.addEventListener("click", () => {
    window.location.href = `singleMovie.html?id=1184918`
})

deadpool.addEventListener("click", () => {
    window.location.href = `singleMovie.html?id=533535`
})

rateFun = (rating) => {
    if (rating >= 8) {
        return "bg-green-400";
    } else if (rating >= 6) {
        return "bg-yellow-400";
    } else {
        return "bg-red-400";
    }
};




