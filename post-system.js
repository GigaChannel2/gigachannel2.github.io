
const converter = new showdown.Converter();

let titlehtml = document.getElementById("title");
let doctitle = document.querySelector("title");
let datehtml = document.getElementById("date");
let thumbnailimg = document.getElementById("image");
let post = document.getElementById("content");

const slug = new URL(location)
.searchParams
.get("p");

// if(slug){
mdConvert();
// }


async function mdConvert() {

    let metafet = await fetch("posts/posts.json");
    let data = await metafet.json();
    
    let meta = data[slug];

    if (!meta) {
        meta = data["404"];
        console.log(meta);
    }
    
    let title = meta.title;
    let date = meta.date;
    let thumbnail = meta.thumbnail;
    
    let res = await fetch(`posts/${meta.content}`);

    if (!res.ok) {
        res = await fetch("posts/notfound.md");
    }
    
    const md = await res.text();

    if (thumbnail) {
        thumbnailimg.innerHTML = `<img src="img/thumbnails/${thumbnail}">`;
    }
    titlehtml.textContent = title;
    doctitle.textContent = title
    datehtml.textContent = date;
    post.innerHTML = converter.makeHtml(md);

}

// async function mdConvert() {
//     try {
//         let fetcher = await fetch(`posts/${slug}.md`);

//         if (!fetcher.ok) {
//             throw new Error("Post not found");
//         }

//         let md = await fetcher.text();
//         let html = converter.makeHtml(md);

//         post.innerHTML = html;
//     } catch (error) {
//         console.log(error);

//         let notFoundfetch = await fetch(`posts/notfound.md`);
//         let notFoundmd = notFoundfetch.text();

//         post.textContent = converter.makeHtml(notFoundmd);
//         // post.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
//     }
    
//     // console.log(md);
// }

// console.log(slug);
