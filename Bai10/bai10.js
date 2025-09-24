const app = document.getElementById("app")
const navLinks = document.querySelectorAll('nav a');

const route = {
    home: "<h1>Home Page</h1><p>Welcome to website!</p>",
    about: "<h1>About Page</h1><p>This is about page</p>",
    contact: "<h1>Contact Us</h1><p>Contact us: cuong@gmail.com</p>"
}

function loadPage(){
    let hash = window.location.hash.substring(1) || "home";

    const content = route[hash] ? route[hash] : route["home"];

    app.classList.remove("fade-in");
    app.classList.add("fade-out");

    setTimeout(() => {
        app.innerHTML = content;

        app.classList.remove("fade-out");
        app.classList.add("fade-in");

        updateActiveLink(hash); 
    }, 500);
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);

function updateActiveLink(hash) {
    navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${hash}`) {
            link.classList.add("active");   
        } else {
            link.classList.remove("active"); 
        }
    });
}
