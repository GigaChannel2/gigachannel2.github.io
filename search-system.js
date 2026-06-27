const input = document.getElementById("searchbox");
const results = document.getElementById("result");
let query = " ";
let data;

async function fetchdata() {
    data = await fetch("posts/posts.json")
        .then(r => r.json());
}

input.addEventListener("input", () => {
    search();
});

function search(param) {
    query = input.value.toLowerCase();
    results.innerHTML = "";

    for (const slug in data) {
        const post = data[slug];
            
        if (slug === "404") continue;
        if (slug === "test123markdownortemplate") continue;

        if (
            post.title.toLowerCase().includes(query)
        ) {
            if (post.thumbnail) {
                results.innerHTML += `
                    <article class="results">
                        <a class="href" href="post?p=${slug}">
                            <img src="img/thumbnails/${post.thumbnail}">
                        </a>
                        <a class="href" href="post?p=${slug}">
                            <h2>${post.title}</h2>
                        </a>
                    </article>
                `;
            } else {
                results.innerHTML += `
                    <article class="results">
                        <a class="href" href="post?p=${slug}">
                            <h2>${post.title}</h2>
                        </a>
                    </article>
                `;
            }
        }
    }
}

search();
fetchdata();

