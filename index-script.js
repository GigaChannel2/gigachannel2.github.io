const debug = true;

let page = document.getElementById("page");
let page_txt = page.querySelector("h1");
// let sidebar = document.getElementById("sidebar");
// let sidebar_btn = sidebar.querySelectorAll("a");

let isNotFound = Boolean;

const container = document.getElementById("page");

async function loadContent() {
    const res = await fetch("posts/posts.json");
    const data = await res.json();



    for (const slug in data) {

        // Skip 404
        if (slug === "404") continue;
        if (slug === "test123markdownortemplate") continue;


        const post = data[slug];
        const md = await fetch(`posts/${post.content}`)
        .then(r => r.text());
        const preview = md
            .trim()
            .split(/\s+/)
            .slice(0, 6)
            .join(" ") + "...";
            // .trim()
            // .split(/\n\s*\n/)
            // .slice(0, 2)

        if (!post) {
            container.innerHTML = `
                <h1 id="empty" style="align-self: center;">
                    It's empty right now...<br>
                    wait for new post from me!
                </h1>
            `;
            return;
        }

        if (!post.thumbnail) {
            container.innerHTML += `
                <article class="card">
                
                    <a class="href post" href="post?p=${slug}">
                        <h2>${post.title}</h2>
                    </a>

                    <small>${post.date}</small>

                    <p>
                        <a class="href post" href="post?p=${slug}">
                            ${preview}
                        </a>
                    </p>

                </article>
            `;
        } else {
            container.innerHTML += `
                <article class="card">

                    <a class="href post" href="post?p=${slug}">
                        <img src="img/thumbnails/${post.thumbnail}">
                    </a>

                    <a class="href post" href="post?p=${slug}">
                        <h2>${post.title}</h2>
                    </a>

                    <small>${post.date}</small>

                    <p>
                        <a class="href post" href="post?p=${slug}">
                            ${preview}
                        </a>
                    </p>

                </article>
            `;
        }
        
    }
    
}
loadContent();


// if (isNotFound) {
//     try {
//         const path = window.location.pathname;
//         if (path === routes[path]) {
//             window.location.path = "/TestWeb";
//         }
//     } catch (error) {
//         console.error();
        
//     }
// }

// const routes = {
//     "/TestWeb": "NULL",
//     "/TestWeb/bio": "This is a bio<br> yes, its a bio<br> yes, it is a bio."
// }


// // // Handle browser navigation (back/forward buttons)
// // window.onpopstate = updateContent;

// // // Load the correct content when the page loads
// // window.onload = updateContent;

// function loadPage(url) {
//     // fetch konten atau ganti isi halaman
//     console.log("Loading", url);
// }

// if (debug) {
//     setInterval(()=>{
//         console.log(isMenu);
        
//     }, 600)
// }

// function pagech(path) {
//     // history.pushState(
//     //     {},
//     //     "",
//     //     "/page" + sect
//     // );
//     // loadPage("/profile");
    
//     window.history.pushState({}, path, window.location.origin + "/TestWeb" + path);
//     updateContent();
// }

// function updateContent() {
//     const path = window.location.pathname;
//     console.log(path);
    
//     // const appDiv = document.getElementById("app");
//     page_txt.innerHTML = routes[path] || "<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>";
// }