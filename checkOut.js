const total = document.getElementById("total");
const discount = document.getElementById("discount"); //number
const finalPrice = document.getElementById("finalPrice");
const discountCode = document.getElementById("discountCode"); //input
const applyCoupon = document.getElementById("applyCoupon"); //button



const searchParams = new URLSearchParams(window.location.search);
let price = parseFloat(searchParams.get("price"));
const tickets = parseInt(searchParams.get("tickets"));

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
    // total.innerHTML = `$${price.toFixed(1)}`;
    finalPrice.innerHTML = `$${price.toFixed(1)}`;
}




