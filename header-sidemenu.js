
// document.addEventListener("headerLoaded", ()=>{

    let header = document.getElementById("main-header");
    let header_logo = document.getElementById("logo");

    let sidemenu = document.getElementById("sidemenu");
    let sidemenu_btn = sidemenu.querySelectorAll("a");

    let backmenu = document.getElementById("backmenu");
    let backshadow = document.getElementById("backshadow");

    let ayam = document.getElementById("ayam");
    let ayam2 = document.getElementById("ayam2");

    let isMenu = false;

    let egg = 0;

    console.log(sidemenu);


    ayam.addEventListener("click", (e)=>{
        e.preventDefault();
        new Audio("sfx/ayam.mp3").play();
    });

    ayam2.addEventListener("click", (e)=>{
        e.preventDefault();
        new Audio("sfx/ayam.mp3").play();
    });

    function open_menu() {
        if (!isMenu) {
            isMenu = true;
            backshadow.style.visibility = "visible";
            sidemenu.style.left = 0;
            backshadow.style.opacity = 0.4;
        }
    }

    function close_menu() {
        if (isMenu) {
            isMenu = false;
            sidemenu.style.left = "-700px";
            backshadow.style.opacity = 0;
            setTimeout(()=>{
                backshadow.style.visibility = "hidden";
            }, 500)
        }
    }


    sidemenu_btn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
        })
        // btn.addEventListener("mouseenter", (e) => {

        // })
    });

    // sidebar_btn.forEach(btn => {
    //     btn.addEventListener("click", (e) => {
    //         e.preventDefault();

    //         // history.pushState({}, "", "/profile");

    //     });
    // });


// });

function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function eggy() {
    egg = Math.floor(Math.random() * 50);
    // egg = 1;

    let eggframe = document.getElementById("eggframe");
    let eggdiv = document.getElementById("eggdiv");
    if (egg == 1) {
        code = randomString();
        // let fethc = await fetch("egg.html").then(r => r.text());

        // let blob = new Blob([fethc], { type: 'text/html' });
        // let url = URL.createObjectURL(blob);

        // eggframe.src = url;
        // eggframe.style.visibility = "visible";
        eggdiv.innerHTML = `
        <img src="img/tree-deltarune.gif">
        <audio id="audio" autoplay loop>
            <source src="sfx/man.m4a" type="audio/mpeg">
        </audio>
        `;
        eggdiv.style.display = "block";

        let nav = document.getElementById("basic_ui");
        let content = document.getElementById("content");
        nav.style.display = "none";
        content.style.display = "none";
        // console.log(code);
    } else {
        href("https://gigachannel2.github.io/");
        // console.log(egg);
    }
}

function href(param) {
    window.location.href = param;
}