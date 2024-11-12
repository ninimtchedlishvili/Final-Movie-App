document.getElementById("allMovies").addEventListener("click", () => {
    window.location.href = `movies.html`
    
});

document.getElementById("homePage").addEventListener("click", () => {
    window.location.href = `index.html`
    
});

document.getElementById("logIn").addEventListener("click", () => {
    window.location.href = `logIn.html`
});

document.getElementById("logIn1").addEventListener("click", () => {
    window.location.href = `logIn.html`
});


document.getElementById("signUp").addEventListener("click", () => {
    window.location.href = `signUp.html`
});


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const termsAccepted = document.getElementById("terms").checked;
    
    let errors = [];

    if (email === "") {
        errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    if (password === "") {
        errors.push("Password is required.");
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    if (confirmPassword === "") {
        errors.push("Confirm password is required.");
    } else if (confirmPassword !== password) {
        errors.push("Passwords do not match.");
    }

    if (!termsAccepted) {
        errors.push("You must accept the terms and conditions.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        alert("Account successfully created!");
    }
});
