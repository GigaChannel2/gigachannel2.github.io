const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();

const upload = multer({
    dest: " temp/"
});
console.log(__dirname);

app.use(express.static("statis"));

app.post("/publish", upload.single("thumbnail"), (req, res) => {
    console.log("Publish request received!");
    const title = req.body.title;
    const content = req.body.content;

    const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-");

        

    const date = new Date().toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    fs.writeFileSync(
        `../posts/${slug}.md`,
        content
    );

    let thumbnailName = null;

    if (req.file) {
        const ext = path.extname(req.file.originalname);
        thumbnailName = `${slug}${ext}`;

        fs.renameSync(
            req.file.path,
            `../img/thumbnails/${thumbnailName}`
        );
    }

    const json = JSON.parse(
        fs.readFileSync("../posts/posts.json")
    );

    json[slug] = {
        title,
        date,
        thumbnail: thumbnailName,
        content: `${slug}.md`
    };

    fs.writeFileSync(
        "../posts/posts.json",
        JSON.stringify(json, null, 4)
    );

    if (req.body.send) {
        exec(
            'git add . && git commit -m "New post: " && git push',
            {
                cwd: "../" // folder repository Git kamu
            },
            (err, stdout, stderr) => {
                if (err) {
                    console.error(stderr);
                    return res.status(500).send("Git push failed.");
                }
            
                console.log(stdout);
                res.send("Published and pushed to GitHub!");
            }
        );

    }

    res.send("Published!");
});



app.listen(3000, ()=>{
    console.log("Server running...");
    console.log("Port: 3000");
    // await open("http://localhost:3000");
});
