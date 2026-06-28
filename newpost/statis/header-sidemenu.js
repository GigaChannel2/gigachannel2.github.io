
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

function href(param) {
    window.location.href = param;
}