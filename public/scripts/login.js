window.onload = init();

function init(){
    console.log("Page OK");

    /*let login_div = document.getElementById("login");
    let signin_div = document.getElementById("signin");

    if(localStorage.getItem("loggedIn")){
        signin_div.style.display = "none";
    }else{
        login_div.style.display = "none";
    }*/

    setListeners();
}

function login(username, password) {

    const testUser = localStorage.getItem("username")

    if(testUser){
        const testPassword = JSON.parse(testUser).get("password")
        if(testPassword == password) {
            localStorage.setItem("loggedIn", username);
            // Password is wrong
        }   
        // Username doesn't exist 
    }

}


function signin(username, password, email) {

    // Si le pseudo existe déjà
    if(localStorage.getItem(username)) {
        //ERREUR
        return;
    }

    const user = {
        "username" : username,
        "password" : password,
        "email" : email,
        "createdAt" : Date.now(),
    }

    localStorage.setItem(username, JSON.stringify(user)); 
    localStorage.setItem("loggedIn", username);
}

function logout(){
    localStorage.removeItem("loggedIn");
}

function setListeners() {
    let login_form = document.querySelector(".login-form");
    let signin_form = document.querySelector(".signin-form");

    if(login_form){
        login_form.addEventListener("submit", (e) => {
            var formData = new FormData(login_form)

            const username = sanitize(formData.get("username"))
            const password = hash(formData.get("password"))

            login(username, password)     
            e.preventDefault();
        })
    }

    if(signin_form){
        signin_form.addEventListener("submit", (e) => {
            var formData = new FormData(signin_form)

            const username = sanitize(formData.get("username"))
            const email = sanitize(formData.get("email"))
            const password = hash(formData.get("password"))

            signin(username, password, email)     
            e.preventDefault();
        })
    }
}

function sanitize(str) {
    return str.replace(/[<>&"'`]/g, "");
}

function hash(password) {
    //fait rien pour le moment
    return password
}

