let postsWrapper = document.querySelector(".user__posts-wrapper");
let usersCreate = document.querySelector(".users__create");

let createForm = document.querySelector(".create__form");
let inputPostTitle = createForm.querySelector('input[name="postTitle"]');
let inputPostBody =  createForm.querySelector('textarea[name="postBody"]');
let errorMessages = createForm.querySelectorAll(".field__error-message");

function openPosts(button) {
    let selectedUserId = parseInt(button.id);

    postsWrapper.innerHTML = `
    <img onclick="closePosts()" src="./assets/images/crossmark-black.png" alt="Crossmark" class="window__close window__close--top">
    <p class="post__user-id">User ID: ${selectedUserId}</p>`;

    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
        .then(ref => ref.json())
        .then(posts => posts.forEach(post => {
            if (selectedUserId === post.userId)
                importPosts(post);
        }));

    postsWrapper.style.display = "block";
    usersOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

function closePosts() {
    postsWrapper.style.display = "none";
    usersOverlay.style.display = "none";
    body.style.overflowY = "auto";
}

function openCreatePost(button) {
    let selectedUserId = button.id;
    usersCreate.id = selectedUserId;

    usersCreate.style.display = "block";
    usersOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

function closeCreatePost() {
    usersCreate.style.display = "none";
    usersOverlay.style.display = "none";
    body.style.overflowY = "auto";
}

function createPost(submit) {
    selectedUserId = submit.parentNode.parentNode.id;

    if(createForm.checkValidity()) {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                title: inputPostTitle.value,
                body: inputPostBody.value,
                userId: selectedUserId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => alert("Success! => " + JSON.stringify(json)))
            .catch(error => {console.log(error); alert("User create failure")});

        inputPostTitle.classList.remove("form__field--bb-red");
        inputPostBody.classList.remove("form__field--bb-red");
        errorMessages.forEach(msg => msg.innerHTML = "");
        inputPostTitle.value = inputPostBody.value = "";
    } else {
        validateInput(inputPostTitle, 5, 50);
        validateInput(inputPostBody, 10, 250);
    }
}

/*
    HTML import functions
*/

function importPosts(post) {
    postsWrapper.innerHTML += `
    <div class="user__post">
        <h2 class="post__title">Title: ${post.title}</h2>
        <p class="post__id">Post ID: ${post.id}</p>
        <p class="post__body">Post: ${post.body}</p>
    </div>`;
}