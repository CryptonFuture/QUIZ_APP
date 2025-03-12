document.addEventListener('DOMContentLoaded', function () {
    checkAuthState();
})

let isLogin = true

function toggleAuth() {
    isLogin = !isLogin
    document.getElementById('auth-title').innerText = isLogin ? "Login" : "Sign Up";
    document.getElementById('auth-button').innerText = isLogin ? "Login" : "Sign Up";
    document.getElementById('toggle-auth').innerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
    document.getElementById("role").style.display = isLogin ? "none" : "block";
    document.getElementById("error-message").innerText = "";
    clearInputFields()
}

function handleAuth() {
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    const role = document.getElementById("role").value;


    if (!username || !password) {
        document.getElementById("error-message").innerText = "Please enter both username and password.";
            return;
    }

    if(password.length < 6) {
        document.getElementById("error-message").innerText = "Password must be at least 6 characters long.";
        return;
    }

    if (isLogin) {
        login(username, password);
    } else {
        signup(username, password, role);
    }
}

function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

function signup(username, password, role) {
    if (localStorage.getItem(username)) {
        document.getElementById("error-message").innerText = "Username already exists! Choose another.";
        return;
    }

    const encryptedPassword = encryptPassword(password);

    localStorage.setItem(username, JSON.stringify({ password: encryptedPassword, role }))
    alert("Signup successful! you can now login")
    toggleAuth()
}

function login(username, password) {
    const userData = JSON.parse(localStorage.getItem(username))

    if (userData && userData.password === encryptPassword(password)) {
        localStorage.setItem('loggedInUser', JSON.stringify({ username, role: userData.role }))
        checkAuthState()
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password!";

    }
}

function checkAuthState() {
    const loggedInData = localStorage.getItem("loggedInUser")
    if (loggedInData) {
        const { username, role } = JSON.parse(loggedInData);

        document.getElementById("auth-container").style.display = "none";
        document.getElementById("navbar").style.display = "flex";
        document.getElementById("nav-username").innerText = username;
        document.getElementById("nav-role").innerText = role;
        if (role === "admin") {
            document.getElementById("admin-panel").style.display = "block";
            document.getElementById("quiz-container").style.display = "none";
        } else {
            document.getElementById("quiz-container").style.display = "block";
            document.getElementById("admin-panel").style.display = "none";
        }

    } else {
        document.getElementById("auth-container").style.display = "block";
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("navbar").style.display = "none";
        document.getElementById("admin-panel").style.display = "none";

    }
}

function logout() {
    localStorage.removeItem("loggedInUser")
    checkAuthState()
}

function clearInputFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function togglePassword() {
    const passField = document.getElementById("password");
    passField.type = passField.type === "password" ? "text" : "password";
}