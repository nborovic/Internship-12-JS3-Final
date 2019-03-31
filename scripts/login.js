let loginForm = document.querySelector("#input__form-login");
let loginButton = loginForm.querySelector(".form__submit");

if (localStorage.getItem("user") !== null) {
    registerForm.style.display = "none";    
    loginForm.style.display = "block";
    document.querySelector(".info__title").classList.add("info__title--margin");
    document.querySelector(".window__info").classList.add("window__info--padding");

    let usernameInput = loginForm.usernameInput;
    let passwordInput = loginForm.passwordInput;

    loginButton.addEventListener("click", () => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user.username === usernameInput.value && user.password === passwordInput.value) {
            console.log("je");
            loginForm.querySelectorAll(".field__error-message").forEach(errorMessage => errorMessage.innerText = "");
        }
        else 
            loginForm.querySelectorAll(".field__error-message").forEach(msg => msg.innerText = "Username and password don't match")
    })
}