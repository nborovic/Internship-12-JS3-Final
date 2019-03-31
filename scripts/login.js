let loginForm = document.querySelector("#input__form-login");
let loginButton = loginForm.querySelector(".form__submit");

if (localStorage.getItem("user") !== null) {
    /* Style changes */
    registerForm.style.display = "none";    
    loginForm.style.display = "block";

    let infoTitle = document.querySelector(".info__title");
    infoTitle.classList.add("info__title--margin");
    infoTitle.innerText = "Sign in";

    document.querySelector(".window__info").classList.add("window__info--padding");

    /* Validation */
    let usernameInput = loginForm.usernameInput;
    let passwordInput = loginForm.passwordInput;

    loginButton.addEventListener("click", () => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user.username === usernameInput.value && user.password === passwordInput.value) {
            getUsers();
            loginForm.querySelectorAll(".field__error-message").forEach(errorMessage => errorMessage.innerText = "");
            document.querySelector(".main__window").style.display = "none";
            document.querySelector("main").classList.add("main--users");
        }
        else 
            loginForm.querySelectorAll(".field__error-message").forEach(msg => msg.innerText = "Username and password don't match")
    })
}