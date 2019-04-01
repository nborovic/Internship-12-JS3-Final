let registerForm = document.querySelector("#input__form-register");

let usernameInput = registerForm.usernameInput;
let emailInput = registerForm.emailInput;
let passwordInput = registerForm.passwordInput;
let repeatPasswordInput = registerForm.repeatPasswordInput;

let submitButton = registerForm.querySelector(".form__submit");
let checkmarkArray = document.querySelectorAll(".field__img--checkmark");
let crossmarkArray = document.querySelectorAll(".field__img--crossmark");

setValidationEventListener(passwordInput);
setValidationEventListener(repeatPasswordInput);

function registerUser() {
    let passwordErrorMessage = passwordInput.parentNode.querySelector(".field__error-message");
    let repeatPasswordErrorMessage = repeatPasswordInput.parentNode.querySelector(".field__error-message");
    let emailErrorMessage = emailInput.parentNode.querySelector(".field__error-message");

    if (registerForm.checkValidity() && passwordsMatch()) {
        registerForm.querySelectorAll(".field__error-message").forEach(errorMessage => errorMessage.innerText = "");
        registerForm.querySelectorAll(".field__img").forEach(img => img.style.display = "none");

        let user = {
            "username": usernameInput.value,
            "email": emailInput.value,
            "password": passwordInput.value
        };

        localStorage.setItem("user", JSON.stringify(user));

        registerForm.querySelectorAll("input").forEach(field => field.value = "");

        alert("User registered!")
        setLoginForm();

    } else {
        validateInput(usernameInput, 5, 10);
        validateInput(emailInput, 5, 40)
        validateInput(passwordInput, 5, 10);
        validateInput(repeatPasswordInput, 5, 10);

        if (!validateEmail(emailInput))
            emailErrorMessage.innerText = "Invalid email";

        if (!passwordsMatch())
            passwordErrorMessage.innerText = repeatPasswordErrorMessage.innerText = "Passwords don't match";
    }
}

function validateInput(input, min, max) {
    let inputErrorMessage = input.parentNode.querySelector(".field__error-message");

    if (input.validity.valueMissing)
        inputErrorMessage.innerText = "Value missing";
    else if (input.validity.tooShort)
        inputErrorMessage.innerText = `Not enough characters (min ${min})`;
    else if (input.validity.tooLong)
        inputErrorMessage.innerText = `Too many characters (max ${max})`;
    else {
        input.classList.remove("form__field--bb-red");
        inputErrorMessage.innerText = "";
        return;
    }

    input.classList.add("form__field--bb-red");
}

function passwordsMatch() {
    return passwordInput.value === repeatPasswordInput.value;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase);
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