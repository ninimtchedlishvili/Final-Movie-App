const total = document.getElementById("total");
const discount = document.getElementById("discount"); //number
const finalPrice = document.getElementById("finalPrice");
const discountCode = document.getElementById("discountCode"); //input
const applyCoupon = document.getElementById("applyCoupon"); //button
const movieDetails = document.getElementById("movieDetails");
const title = document.getElementById("title"); 
const dateEl = document.getElementById("date"); 
const seatsEl = document.getElementById("seatDetails")


const searchParams = new URLSearchParams(window.location.search);

let price = parseFloat(searchParams.get("price"));
const tickets = parseInt(searchParams.get("tickets"));
const movieTitle = searchParams.get("title");
const date = searchParams.get("date");
const time = searchParams.get("time");

const seatInfoEncoded = searchParams.get("seats");

const seatInfo = decodeURIComponent(seatInfoEncoded);
const seatInfoWithLineBreaks = seatInfo.replace(/,/g, "<br>");
seatsEl.innerHTML = seatInfoWithLineBreaks
console.log(seatInfo)

dateEl.innerText = `${date} | ${time}`;
title.innerHTML = `${movieTitle}`;
total.innerHTML = `$${price.toFixed(1)}`;

applyCoupon.addEventListener("click", () => {
    const couponCode = discountCode.value.trim();
    console.log(couponCode);
    
    if (couponCode === "damikeli") {
        discount.innerHTML = "10%";
        price *= 0.9;
    } else {
        discount.innerHTML = "0%";
    }
    updatePrices();

})


function updatePrices() {
    finalPrice.innerHTML = `$${price.toFixed(1)}`;
}

document.getElementById("payBtn").addEventListener("click", function() {
    // Get the input values
    const cardHolder = document.querySelector('input[placeholder="Name of card holder"]').value.trim();
    const postalCode = document.querySelector('input[placeholder="Postal code"]').value.trim();
    const cardNumber = document.querySelector('input[placeholder="Card number"]').value.trim();
    const expDate = document.querySelector('input[placeholder="EXP."]').value.trim();
    const cvv = document.querySelector('input[placeholder="CVV"]').value.trim();
  
    // Initialize an array to store validation error messages
    let errors = [];
  
    // Validation for card holder's name (should not be empty)
    if (!cardHolder) {
      errors.push("Card holder's name is required.");
    }
  
    // Validation for postal code (should be 4 digits)
    if (!postalCode.match(/^\d{4}$/)) {
      errors.push("Postal code must be 4 digits.");
    }
  
    // Validation for card number (should be 16 digits)
    if (!cardNumber.match(/^\d{16}$/)) {
      errors.push("Card number must be 16 digits.");
    }
  
    // Validation for expiration date (basic MM/YY format check)
    if (!expDate.match(/^(0[1-9]|1[0-2])([0-9]{2})$/)) {
        errors.push("Expiration date must be in MM-YY format."); 
    }
    
  
    // Validation for CVV (should be 3 digits)
    if (!cvv.match(/^\d{3}$/)) {
      errors.push("CVV must be 3 digits.");
    }
  
    // If there are any errors, alert them
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      alert("Congrats! You bought the tickets.");
    }
  });
  


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





