setLoginForm();

function setLoginForm() {
    let loginForm = document.querySelector("#input__form-login");

    if (localStorage.getItem("user") !== null) {
        /* Style changes */
        registerForm.style.display = "none";
        loginForm.style.display = "block";

        let infoTitle = document.querySelector(".info__title");
        infoTitle.classList.add("info__title--margin");
        infoTitle.innerText = "Sign in";

        document.querySelector(".window__info").classList.add("window__info--padding");
    }
}

function login() {
    /* Validation */
    let usernameInput = loginForm.usernameInput;
    let passwordInput = loginForm.passwordInput;

    let user = JSON.parse(localStorage.getItem("user"))
    if (user.username === usernameInput.value && user.password === passwordInput.value) {
        getUsers();
        document.querySelector(".main__window").style.display = "none";
        document.querySelector("main").classList.add("main--users");
    }
    else {
        usernameInput.classList.add("form__field--bb-red");
        passwordInput.classList.add("form__field--bb-red");
        loginForm.querySelectorAll(".field__error-message").forEach(msg => msg.innerText = "Username and password don't match");
    }
}