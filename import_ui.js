async function load(id, file) {
    document.getElementById(id).innerHTML =
        await fetch(file).then(r => r.text());
}

async function init() {
    await load("basic_ui", "components/header.html");
    await load("footer", "components/footer.html");

    document.dispatchEvent(new Event("headerLoaded"));
}

init();