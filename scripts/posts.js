let body = document.body;
let mainUsers = document.querySelector(".main__users");
let usersWrapper = document.querySelector(".users__wrapper");
let arrowTop = document.querySelector(".users__scroll-top");

function getUsers() {
    usersWrapper.style.display = "flex";
    mainUsers.style.display = "block";

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => users.forEach(user => usersWrapper.innerHTML += `
            <figure class="wrapper__user">
                <img onclick="openDetails(this)" src="./assets/images/user.png" alt="User icon" class="user__img">
                <figcaption>
                    <h2 class="user__firstname">${user.username}</h2>
                    <p class="user__id">ID: ${user.id}</p>
                    <p class="user__fullname">Name: ${user.name}</p>
                    <p class="user__email">Email: ${user.email}</p>
                    <button onclick="openPosts(this)" class="user__button-posts">Posts</button>
                </figcaption>

                <div class="user__details">
                    <img onclick="closeDetails(this)" src="./assets/images/crossmark-black.png" alt="Crossmark" class="window__close">

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
                    <p class="details__company-bs">Bs: ${user.name}</p>
                </div>

                <div class="user__posts-wrapper" id="${user.id}">
                    <img onclick="closePosts(this)" src="./assets/images/crossmark-black.png" alt="Crossmark" class="window__close window__close--top">
                    <p class="post__user-id">User ID: ${user.id}</p>
                </div>
            </figure>
        `))
        .then(() => {
            let firstUser = usersWrapper.querySelector(".wrapper__user");

            window.onscroll = () => {
                if(window.scrollY > firstUser.offsetHeight) {
                    arrowTop.style.display = "block";
                } else 
                    arrowTop.style.display = "none"; 
            };

            usersOverlay = document.querySelector(".users__overlay");
            let userPosts = document.querySelectorAll(".user__posts-wrapper");

            userPosts.forEach(wrapper => {
            fetch('https://jsonplaceholder.typicode.com/users/1/posts')
                .then(ref => ref.json())
                .then(posts => posts.forEach(post => {
                    if (wrapper.id === post.userId.toString())
                        wrapper.innerHTML += `
                            <div class="user__post">
                                <h2 class="post__title">Title: ${post.title}</h2>
                                <p class="post__body">${post.body}</p>
                            </div>
                `}
            ))}
        )});
}

function openDetails(element) {
    element.parentNode.querySelector(".user__details").style.display = "block";
    usersOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

function closeDetails(element) {
    element.parentNode.style.display = "none";
    usersOverlay.style.display = "none";
    body.style.overflowY = "auto";
}

function openPosts(element) {
    element.parentNode.parentNode.querySelector(".user__posts-wrapper").style.display = "block";
    usersOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

function closePosts(element) {
    element.parentNode.style.display = "none";
    usersOverlay.style.display = "none";
    body.style.overflowY = "auto";
}

function scrollToTop() {
    window.scroll(0, 0);
}