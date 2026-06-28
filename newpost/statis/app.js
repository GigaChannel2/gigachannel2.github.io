const thumbnail = document.getElementById("upload");
const upBox = document.getElementById("uploadBox");
const title = document.getElementById("title");
const content = document.getElementById("input");
const submit = document.getElementById("create");
const publish = document.getElementById("create_plus");
const preview = document.getElementById("preview");
const converter = new showdown.Converter();
const text = document.getElementById("uploadText");

thumbnail.addEventListener("change", () => {

    const file = upload.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);

    upBox.classList.remove("empty");
    preview.hidden = false;
    text.hidden = true;

});

content.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const start = content.selectionStart;
        const end = content.selectionEnd;

        const value = content.value;

        content.value =
            value.substring(0, start) +
            "  \n" +   // 2 spasi + newline markdown
            value.substring(end);

        content.selectionStart = content.selectionEnd = start + 3;

        e.preventDefault();
    }
});

// supaya browser tidak membuka file saat di-drop
["dragenter", "dragover", "dragleave", "drop"].forEach(event => {
    upBox.addEventListener(event, e => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// efek saat drag di atas box
upBox.addEventListener("dragover", () => {
    upBox.classList.add("dragging");
});

upBox.addEventListener("dragleave", () => {
    upBox.classList.remove("dragging");
});

// saat file di-drop
upBox.addEventListener("drop", e => {
    upBox.classList.remove("dragging");

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please drop an image.");
        return;
    }

    // Masukkan file ke input
    const dt = new DataTransfer();
    dt.items.add(file);
    thumbnail.files = dt.files;

    // Preview
    preview.src = URL.createObjectURL(file);
    upBox.classList.remove("empty");
    preview.hidden = false;
    text.hidden = true;
});

// thumbnail.addEventListener("change", () => {
//     const file = upload.files[0];

//     if (!file) return;

//     // validasi tipe file
//     if (!file.type.startsWith("image/")) {
//         alert("Please upload an image!");
//         upload.value = "";
//         preview.style.display = "none";
//         return;
//     }

//     const reader = new FileReader();

//     reader.onload = function (e) {
//         preview.src = e.target.result;
//         preview.style.display = "block";
//     };

//     reader.readAsDataURL(file);
// });

submit.addEventListener("click", () => {
    make("false");
});

publish.addEventListener("click", () => {
    make("true");
});

async function make(send) {
    console.log("CLICK");

    const form = new FormData();

    form.append("thumbnail", thumbnail.files[0] || null);
    form.append("title", title.value);
    form.append("content", content.value);
    form.append("send", send);

    const res = await fetch("/publish", {
        method: "POST",
        body: form
    });

    alert(await res.text());
}

function convertMarkdown() {
    try {
        const markdownText = content.value;
        const html = converter.makeHtml(markdownText);
        output.innerHTML = html;
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

function autoResize() {
    content.style.height = "auto";
    content.style.height = content.scrollHeight + "px";
}


content.addEventListener("input", () => {
    autoResize();
    convertMarkdown();
});

autoResize();
convertMarkdown();
