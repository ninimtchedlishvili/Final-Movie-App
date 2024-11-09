const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&quot";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const movieCointainer = document.getElementById("movie-container");

const buyButton = document.getElementById("buy-now");
const seatMap = document.getElementById("seat-map");
const row = document.getElementById("row");
const seat = document.getElementById("seat");

const url = window.location.href;
const urlParam = new URLSearchParams(window.location.search);
const movieId = urlParam.get("id");

getSingleMovie(API_URL);

async function getSingleMovie(url) {
    const result = await fetch(url);
    const data = await result.json();
    const singleMovieId = data.results.find((movie) => movie.id === parseInt(movieId));
    showSingleMovie(singleMovieId);
}


function showSingleMovie(movie) {
    const {id, overview, title, release_date, poster_path, vote_average } = movie;
    const movieTitle = document.getElementById("movieTitle");

    const singleMovie = document.createElement("div");
    singleMovie.innerHTML = `
        <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div class="overflow-visible">
                <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
            </div>
            
        </div>`

    document.getElementById("title").innerHTML = title;
    document.getElementById("movieTitle").innerHTML = title;
    
    movieCointainer.appendChild(singleMovie);
}



const SingleTicketPrice = 10;
const occupiedSeats = [1, 8, 15, 16, 17, 20, 22, 25, 34, 35, 36, 41, 42];
const selectedSeats = [];

const rows = 5;
const seatPerRow = 10;

function seatSetting() {

    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement("div");
        rowEl.className = "flex justify-center";
        const rowNum = i + 1;
        const rowNumStart = document.createElement("div");
        rowNumStart.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-5";
        rowNumStart.textContent = i + 1;
        rowEl.appendChild(rowNumStart);


        for (let j = 0; j < seatPerRow; j++) {

            const seatIndex = i * seatPerRow + j + 1;
            const seatEl = document.createElement("div");
            seatEl.classList.add("seat");
            seatEl.innerHTML = seatIndex;

            if (occupiedSeats.includes(seatIndex)) {
                seatEl.classList.add("occupied");
            }

            seatEl.addEventListener("click", () => seatSelect(rowNum, seatEl, seatIndex));
            rowEl.appendChild(seatEl);
        }
        const rowNumEnd = document.createElement("div");
        rowNumEnd.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-5";
        rowNumEnd.textContent = i + 1;
        rowEl.appendChild(rowNumEnd);
        seatMap.appendChild(rowEl);
    }
}


let bookedElements = {}; 

function seatSelect(rowNum, seatEl, seatIndex) {

    if (!seatEl.classList.contains("occupied")) {

        if (seatEl.classList.contains("selected")) {
            seatEl.classList.remove("selected");

            const bookedSeats = document.getElementById("bookedSeats");
            let booked = bookedElements[seatIndex]; 
            if (booked) {
                bookedSeats.removeChild(booked); 
                delete bookedElements[seatIndex];
            }

        } else if (!seatEl.classList.contains("selected")) {

            if (rowNum === 1 || rowNum === 5) {
                price = 15;
            } else if (rowNum === 2 || rowNum === 4) {
                price = 20;
            } else if (rowNum === 3) {
                price = 25;
            }

            seatEl.classList.add("selected");
            selectedSeats.push(seatIndex);

            const booked = document.createElement("div");

            booked.innerHTML = `<p class="text-lg font-semibold">Row: ${rowNum} Seat: ${seatIndex} Price: $${price}</p>`;

            bookedSeats.appendChild(booked);
            bookedElements[seatIndex] = booked;
            

        }
        updateSummary();

    }
}


seatSetting();
const totalTickets = document.getElementById("total-tickets");
const totalPrice = document.getElementById("total-price");


function updateSummary() {
    totalTickets.innerHTML = selectedSeats.length;
    totalPrice.innerHTML = selectedSeats.length * 10;
}
buyButton.addEventListener("click", () => {
    if (selectedSeats.length > 0) {
        window.location.href = `checkout.html`
    } else {
        alert("Please select a seat");
    }
});

