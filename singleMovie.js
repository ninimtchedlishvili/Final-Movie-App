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
    const { id, overview, title, release_date, poster_path, vote_average } = movie;
    const movieTitle = document.getElementById("movieTitle");

    const singleMovie = document.createElement("div");
    singleMovie.innerHTML = `
        <div class=" sm:max-w-xl sm:mx-auto">
            <div class="overflow-visible">
                <img class="rounded-3xl shadow-lg" src="${IMG_PATH + poster_path}" alt="">
            </div>
            <div class="flex flex-col space-y-2 mt-2">
                <div class="relative group">
                    <p class="text-black-300 max-h-32 overflow-y-hidden text-m ">
                        ${overview}
                    </p>
                    <div
                        class="absolute left-0 top-full  w-full bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                        ${overview}
                    </div>
                </div>
            </div>
        </div>`

    const imdb = document.getElementById("imdb");
    imdb.innerHTML = `
        <div class="flex justify-between items-start">
            <p class="text-black text-m">IMDb: ${Math.round(vote_average)}.0</p>
        </div>`

    document.getElementById("title").innerHTML = title;
    document.getElementById("movieTitle").innerHTML = title;

    movieCointainer.appendChild(singleMovie);
}

const SingleTicketPrice = 10;
let selectedSeats = [];

const rows = 5;
const seatPerRow = 10;

function seatSetting() {
    seatMap.style.display = "none";
    bookedInfo.style.display = "none";


    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement("div");
        rowEl.className = "flex justify-center";
        const rowNum = i + 1;

        const rowNumStart = document.createElement("div");
        rowNumStart.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-4";
        rowNumStart.textContent = rowNum;
        rowEl.appendChild(rowNumStart);


        for (let j = 0; j < seatPerRow; j++) {

            const seatIndex = i * seatPerRow + j + 1;
            const seatEl = document.createElement("div");
            seatEl.classList.add("seat");



            if (seatIndex === 44 || seatIndex === 45 || seatIndex === 46 || seatIndex === 47) {
                seatEl.classList.add("bg-[url('./src/img/accessibity.svg')]");
            }

            seatEl.innerHTML = seatIndex;

            seatEl.addEventListener("click", () => seatSelect(rowNum, seatEl, seatIndex));
            rowEl.appendChild(seatEl);
        }

        const rowNumEnd = document.createElement("div");
        rowNumEnd.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-4";
        rowNumEnd.textContent = rowNum;
        rowEl.appendChild(rowNumEnd);
        seatMap.appendChild(rowEl);
    }
}

let bookedElements = {};
let sum = 0;

function seatSelect(rowNum, seatEl, seatIndex) {
    const price = calculatePrice(seatIndex);
    if (selectedSeats.length <= 5) {

        if (!seatEl.classList.contains("occupied")) {

            if (seatEl.classList.contains("selected")) {
                seatEl.classList.remove("selected");

                const bookedSeats = document.getElementById("bookedSeats");
                let booked = bookedElements[seatIndex];
                if (booked) {
                    bookedSeats.removeChild(booked);
                    delete bookedElements[seatIndex];
                    sum -= price;
                    const indexInArray = selectedSeats.indexOf(seatIndex);
                    if (indexInArray !== -1) {
                        selectedSeats.splice(indexInArray, 1);
                    }
                    // console.log(selectedSeats);
                }

            } else if (!seatEl.classList.contains("selected")) {
                seatEl.classList.add("selected");
                selectedSeats.push(seatIndex);
                sum += price;
                const booked = document.createElement("div");

                booked.innerHTML = `<p class="text-lg font-semibold">Row: ${rowNum} Seat: ${seatIndex} Price: $${price}</p>`;

                bookedSeats.appendChild(booked);
                bookedElements[seatIndex] = booked;

                updateSummary(sum);
            }
        }

    } else {
        alert("You can only buy 6 tickets at a time");
    }
}



seatSetting();
const totalTickets = document.getElementById("total-tickets");
const totalPrice = document.getElementById("total-price");

function updateSummary(price) {
    totalTickets.innerHTML = selectedSeats.length;
    totalPrice.innerHTML = price;

    console.log();
    cart();

    function cart() {
        const checkoutUrl = new URL(window.location.href);
        const selectedDay = dayDropdown.value;
        const selectedSessionTime = sessionDropdown.value;

        const seatInfo = selectedSeats.map(seatIndex => {
            const rowNum = Math.floor((seatIndex - 1) / seatPerRow) + 1;
            const seatNumber = seatIndex % seatPerRow || seatPerRow;
            const seatPrice = calculatePrice(seatIndex);
            return `Row: ${rowNum} Seat: ${seatNumber} Price: $${seatPrice}`;
        }).join("|");

        console.log(seatInfo);
        checkoutUrl.searchParams.delete("id");
        checkoutUrl.searchParams.set("price", price);
        checkoutUrl.searchParams.set("tickets", selectedSeats.length);
        checkoutUrl.searchParams.set("title", title.textContent);
        checkoutUrl.searchParams.set("date", selectedDay);
        checkoutUrl.searchParams.set("time", selectedSessionTime);
        checkoutUrl.searchParams.set("seats", encodeURIComponent(seatInfo));


        const newURL = checkoutUrl.search;
        console.log(`checkout.html${newURL}`);

        buyButton.addEventListener("click", () => {
            if (selectedSeats.length > 0) {
                window.location.href = `checkout.html${newURL}`
            } else {
                alert("Please select a seat");
            }
        });
    }
}




function calculatePrice(seatIndex) {
    if (seatIndex > 30) {
        return 25;
    } else if (seatIndex > 10) {
        return 20;
    } else {
        return 15;
    }
}

//calendar
let occupiedSeats = [];

fetch('./src/json/calendar.json')
    .then(response => response.json())
    .then(data => {
        const calendarData = data.calendar;
        const dayDropdown = document.getElementById("dayDropdown");
        const sessionDropdown = document.getElementById("sessionDropdown");

        calendarData.forEach(day => {
            const option = document.createElement("option");
            option.value = day.date;
            option.textContent = `${day.day} (${day.date})`;
            option.className = `weekday ${day.day.toLowerCase()}`;
            dayDropdown.appendChild(option);
        });


        dayDropdown.addEventListener("change", function () {
            const selectedDay = this.value;

            while (selectedSeats.length > 0) {
                selectedSeats.pop();
            }
            bookedSeats.innerHTML = '';
            sessionDropdown.innerHTML = "<option value=''>Select a Session</option>";
            const selectedDayData = calendarData.find(day => day.date === selectedDay);

            if (selectedDayData) {
                selectedDayData.sessions.forEach(session => {
                    const option = document.createElement("option");
                    option.value = session.time;
                    option.textContent = `${session.time}`;
                    sessionDropdown.appendChild(option);
                });
            }
            updateSeatMap();

        });

        sessionDropdown.addEventListener("change", function () {
            const selectedSessionTime = this.value;
            const selectedDay = dayDropdown.value;

            const selectedDayData = calendarData.find(day => day.date === selectedDay);
            const selectedSession = selectedDayData?.sessions.find(session => session.time === selectedSessionTime);

            // seatMap.style.display = "flex ";

            while (selectedSeats.length > 0) {
                selectedSeats.pop();
            }
            bookedSeats.innerHTML = '';

            if (selectedSession) {
                occupiedSeats = selectedSession.occupiedSeats || [];
                // console.log("Occupied Seats for this session:", occupiedSeats);

                const seatMap = document.getElementById("seat-map");
                seatMap.style.display = "block";

                const bookedInfo = document.getElementById("bookedInfo");
                bookedInfo.style.display = "block";
                updateSeatMap();
            }
        });



        if (calendarData.length > 0) {
            dayDropdown.dispatchEvent(new Event('change'));
        }
    })



function updateSeatMap() {
    const seatMap = document.getElementById("seat-map");
    seatMap.innerHTML = "";


    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement("div");
        rowEl.className = "flex justify-center";
        const rowNum = i + 1;

        const rowNumStart = document.createElement("div");
        rowNumStart.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-4";
        rowNumStart.textContent = rowNum;
        rowEl.appendChild(rowNumStart);

        for (let j = 0; j < seatPerRow; j++) {
            const seatIndex = i * seatPerRow + j + 1;
            const seatEl = document.createElement("div");
            seatEl.classList.add("seat");

            if (occupiedSeats.includes(seatIndex)) {
                seatEl.classList.add("occupied");
            }

            if (seatIndex === 44 || seatIndex === 45 || seatIndex === 46 || seatIndex === 47) {
                seatEl.classList.add("bg-[url('./src/img/accessibity.svg')]");
            }

            seatEl.innerHTML = seatIndex;

            seatEl.addEventListener("click", () => seatSelect(rowNum, seatEl, seatIndex));
            rowEl.appendChild(seatEl);
        }

        const rowNumEnd = document.createElement("div");
        rowNumEnd.className = "text-center font-semibold text-xl text-gray-700 w-12 mt-4";
        rowNumEnd.textContent = rowNum;
        rowEl.appendChild(rowNumEnd);

        seatMap.appendChild(rowEl);
    }
}


const price = document.getElementById("total-price");

document.getElementById("allMovies").addEventListener("click", () => {
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
