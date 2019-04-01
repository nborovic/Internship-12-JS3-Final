let body = document.body;
let mainUsers = document.querySelector(".main__users");
let usersWrapper = document.querySelector(".users__wrapper");
let arrowTop = document.querySelector(".users__scroll-top");

let userDetails = document.querySelector(".users__details");

function getUsers() {
    body.style.overflowY = "auto";

    usersWrapper.style.display = "flex";
    mainUsers.style.display = "block";

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => users.forEach(user => importUsers(user)))
        .then(() => {
            let firstUser = usersWrapper.querySelector(".wrapper__user");

            window.onscroll = () => {

                if (window.scrollY > firstUser.offsetHeight) {
                    arrowTop.style.display = "block";
                } else
                    arrowTop.style.display = "none";
            };

            usersOverlay = document.querySelector(".users__overlay");
        });
}

function openDetails(icon) {
    let selectedUserId = parseInt(icon.id);

    userDetails.style.display = "block";
    usersOverlay.style.display = "block";
    body.style.overflowY = "hidden";

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(ref => ref.json())
        .then(users => users.forEach(user => {
            if (user.id == selectedUserId)
                importUserDetails(user);
        }));
}

function closeDetails() {
    userDetails.style.display = "none";
    usersOverlay.style.display = "none";
    body.style.overflowY = "auto";
}

function scrollToTop() {
    window.scroll(0, 0);
}

/*
    HTML import functions
*/

function importUserDetails(user) {
    userDetails.innerHTML = `
    <img onclick="closeDetails()" src="./assets/images/crossmark-black.png" alt="Crossmark" class="window__close">

    <h1 class="details__name">Name: ${user.name}</h1>
    <p class="details__username">Username: ${user.username}</p>
    <p class="details__email">Email: ${user.email}</p>
    <p class="details__phone">Phone: ${user.phone}</p>
    <p class="details__web">Web: ${user.website}</p>

    <h2 class="details__sub-title">Address:</h2>
    <p class="details__suite">Suite: ${user.address.suite}</p>
    <p class="details__city">City: ${user.address.city}</p>
    <p class="details__zip-code">Zip code: ${user.address.zipcode}</p>
    <p class="details__lat">Lat: ${user.address.geo.lat}</p>
    <p class="details__lng">Lng: ${user.address.geo.lng}</p>

    <h2 class="details__sub-title">Company:</h2>
    <p class="details__company-name">Name: ${user.company.name}</p>
    <p class="details__company-phrase">Phrase: ${user.company.catchPhrase}</p>
    <p class="details__company-bs">Bs: ${user.name}</p> `
}

function importUsers(user) {
    usersWrapper.innerHTML += `
            <figure class="wrapper__user">
                <img onclick="openDetails(this)" src="./assets/images/user.png" alt="User icon" class="user__img" id="${user.id}">
                <figcaption>
                    <h2 class="user__firstname">${user.username}</h2>
                    <p class="user__id">ID: ${user.id}</p>
                    <p class="user__fullname">Name: ${user.name}</p>
                    <p class="user__email">Email: ${user.email}</p>

                    <div class="user__buttons"> 
                        <button onclick="openPosts(this)" class="user__button-posts bg-lightskyblue--hover" id="${user.id}">Posts</button>
                        <button onclick="openCreatePost(this)" class="user__button-posts bg-lightskyblue--hover" id="${user.id}">Create post</button>
                    </div>
                </figcaption>
            </figure>
        `
}