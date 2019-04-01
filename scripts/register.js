let registerForm = document.querySelector("#input__form-register");

let usernameInput = registerForm.usernameInput;
let passwordInput = registerForm.passwordInput;
let repeatPasswordInput = registerForm.repeatPasswordInput;
let submitButton = registerForm.querySelector(".form__submit");
let checkmarkArray = document.querySelectorAll(".field__img--checkmark");
let crossmarkArray = document.querySelectorAll(".field__img--crossmark");

setValidationEventListener(passwordInput);
setValidationEventListener(repeatPasswordInput);

submitButton.addEventListener("click", () => { registerUser() })

function registerUser() {
    let passwordErrorMessage = passwordInput.parentNode.querySelector(".field__error-message");
    let repeatPasswordErrorMessage = repeatPasswordInput.parentNode.querySelector(".field__error-message");

    if (registerForm.checkValidity() && passwordsMatch()) {
        registerForm.querySelectorAll(".field__error-message").forEach(errorMessage => errorMessage.innerText = "");
        registerForm.querySelectorAll(".field__img").forEach(img => img.style.display = "none");

        let user = {
            "username": usernameInput.value,
            "password": passwordInput.value
        };

        localStorage.setItem("user", JSON.stringify(user));

        registerForm.querySelectorAll("input").forEach(field => field.value = "");

        alert("User registered!")

    } else {
        validateInput(usernameInput, 5, 10);
        validateInput(passwordInput, 5, 10);
        validateInput(repeatPasswordInput, 5, 10);

        if (!passwordsMatch()) {
            passwordErrorMessage.innerText = repeatPasswordErrorMessage.innerText ="Passwords don't match";
        }
    }
}

function validateInput(element, min, max) {
    let inputErrorMessage = element.parentNode.querySelector(".field__error-message");

    if (element.validity.valueMissing)
        inputErrorMessage.innerText = "Value missing";
    else if (element.validity.tooShort)
        inputErrorMessage.innerText = `Not enough characters (min ${min})`;
    else if (element.validity.tooLong)
        inputErrorMessage.innerText = `Too many characters (max ${max})`;
    else 
        inputErrorMessage.innerText = "";
}

function passwordsMatch() {
    return passwordInput.value === repeatPasswordInput.value;
}

function setValidationEventListener(element) {
    element.addEventListener("keyup", () => {
        if(passwordsMatch() && passwordInput.validity.valid && repeatPasswordInput.validity.valid) {
            checkmarkArray.forEach(element => element.style.display = "inline-block");
            crossmarkArray.forEach(element => element.style.display = "none");
        }
        else {
            checkmarkArray.forEach(element => element.style.display = "none");
            crossmarkArray.forEach(element => element.style.display = "inline-block");
        }
    })
}