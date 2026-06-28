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
        const start = input.selectionStart;
        const end = input.selectionEnd;

        const value = input.value;

        input.value =
            value.substring(0, start) +
            "  \n" +   // 2 spasi + newline markdown
            value.substring(end);

        input.selectionStart = input.selectionEnd = start + 3;

        e.preventDefault();
    }
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
        const markdownText = input.value;
        const html = converter.makeHtml(markdownText);
        output.innerHTML = html;
    } catch (error) {
        output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

input.addEventListener('input', convertMarkdown);

// Initial conversion
convertMarkdown();
