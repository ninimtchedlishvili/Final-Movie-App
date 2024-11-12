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

document.getElementById("signUp1").addEventListener("click", () => {
    window.location.href = `signUp.html`
});

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    alert("Login successful!");
});
