const API_URL = "https://api.themoviedb.org/3/movie/361743/similar?&language=en-US&page=6&api_key=2a7d4498c790ee971ae3369d0327d57c";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const movieCointainer = document.getElementById("movie-container");
const totalTickets = document.getElementById("total-tickets");
const totalPrice = document.getElementById("total-price");
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
    const { id, overview, title, release_date, poster_path, vote_average } = movie;

    const singleMovie = document.createElement("div");
    singleMovie.innerHTML = `
        <div class="py-3 sm:max-w-xl sm:mx-auto">
            <div class="overflow-visible">
                <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
            </div>
            
        </div>`

    document.getElementById("title").innerHTML = title;
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

        for (let j = 0; j < seatPerRow; j++) {

            const seatIndex = i * seatPerRow + j + 1;
            const seatEl = document.createElement("div");
            seatEl.classList.add("seat");

            if (occupiedSeats.includes(seatIndex)) {
                seatEl.classList.add("occupied");
            }

            seatEl.addEventListener("click", () => seatSelect(rowNum, seatEl, seatIndex));
            rowEl.appendChild(seatEl);
        }
        seatMap.appendChild(rowEl);
    }
}


// function seatSelect(rowNum, seatEl, seatIndex) {

//     if (!seatEl.classList.contains("occupied")) {
//         seatEl.classList.add("selected");
//         let price;


//         if (seatEl.classList.contains("selected")) {
//             selectedSeats.push(seatIndex);
//             count ++;
//             console.log(count);

//             const rows = document.getElementById("row");
//             const row = document.createElement("span");
//             row.innerHTML = `<span  class="text-blue-600">${rowNum}</span><br>`
//             rows.appendChild(row);

//             const seatId = document.getElementById("seat");
//             const seatNum = document.createElement("span");
//             seatNum.innerHTML = `<span  class="text-blue-600">${seatIndex}</span><br>`
//             seatId.appendChild(seatNum);



//             if (rowNum === 1 || rowNum === 5) {
//                 price = 15;
//             } else if (rowNum === 2 || rowNum === 4) {
//                 price = 20;
//             } else if (rowNum === 3) {
//                 price = 25;
//             }


//             const priceId = document.getElementById("price");
//             const priceSeat = document.createElement("span");
//             priceSeat.innerHTML = `<span  class="text-blue-600">$${price}</span><br>`
//             priceId.appendChild(priceSeat);

//             updateSummary(price);

//         }
//         // });

//     }
// }

function seatSelect(rowNum, seatEl, seatIndex) {

    if (!seatEl.classList.contains("occupied")) {

        if (seatEl.classList.contains("selected")) {
            let price;
            seatEl.classList.remove("selected");
            console.log(selectedSeats);
            rows.removeChild(row);


            // selectedSeats.push(seatIndex);
            

        } else if (!seatEl.classList.contains("selected")) {
            seatEl.classList.add("selected");
            selectedSeats.push(seatIndex);

            const rows = document.getElementById("row");
            const row = document.createElement("span");
            row.innerHTML = `<span  class="text-blue-600">${rowNum}</span><br>`
            rows.appendChild(row);

            const seatId = document.getElementById("seat");
            const seatNum = document.createElement("span");
            seatNum.innerHTML = `<span  class="text-blue-600">${seatIndex}</span><br>`
            seatId.appendChild(seatNum);





            if (rowNum === 1 || rowNum === 5) {
                price = 15;
            } else if (rowNum === 2 || rowNum === 4) {
                price = 20;
            } else if (rowNum === 3) {
                price = 25;
            }


            const priceId = document.getElementById("price");
            const priceSeat = document.createElement("span");
            priceSeat.innerHTML = `<span  class="text-blue-600">$${price}</span><br>`
            priceId.appendChild(priceSeat);

            updateSummary(price);
        }
    }
}
seatSetting();



function updateSummary(price) {
    totalTickets.innerText = selectedSeats.length;
    // totalPrice.innerText = selectedSeats.length * price;
}
buyButton.addEventListener("click", () => {
    if (selectedSeats.length > 0) {
        alert(`you have booked ${selectedSeats.join(", ")} seats`);
    } else {
        alert("Please select a seat");
    }
});


