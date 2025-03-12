document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});

function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const role = document.getElementById("signup-role").value;


    if (!username || !password) {
        document.getElementById("signup-error").innerText = "Please fill out all fields";
        return;
    }

    if (password.length < 6) {
        document.getElementById("signup-error").innerText = "Password must be at least 6 characters.";
        return;
    }

    if (localStorage.getItem(username)) {
        document.getElementById("signup-error").innerText = "Username already exists!";
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password: encryptPassword(password), role }));
    alert("User registered successfully!");
}

function setDefaultAdmin() {
    const adminUsername = "admin";
    const adminPassword = "Admin@123";
    const encryptedPassword = encryptPassword(adminPassword);

    if (!localStorage.getItem(adminUsername)) {
        localStorage.setItem(adminUsername, JSON.stringify({ password: encryptedPassword, role: "admin" }));
    }
}

setDefaultAdmin();

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        document.getElementById("login-error").innerText = "Please fill out all fields";
        return;
    }

    if (password.length < 6) {
        document.getElementById("login-error").innerText = "Password must be at least 6 characters.";
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === encryptPassword(password)) {
        localStorage.setItem("loggedInUser", JSON.stringify({ username, role: userData.role }));
        checkAuthStatus();
    } else {
        document.getElementById("login-error").innerText = "Invalid username or password!";
    }
}

function checkAuthStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("navbar").style.display = "flex";
        document.getElementById("nav-username").innerText = loggedInUser.username;
        document.getElementById("nav-role").innerText = loggedInUser.role;

        document.getElementById("quiz-container").style.display = loggedInUser.role === "user" ? "block" : "none";
        document.getElementById("admin-dashboard").style.display = loggedInUser.role === "admin" ? "block" : "none";
        document.getElementById("login-container").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function showAdminPanel() {
    document.getElementById("admin-panel").style.display = "block";
}

function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}