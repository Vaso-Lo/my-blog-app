import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // Temporary storage for posts

// Home Route - Display all posts
app.get("/", (req, res) => {
    res.render("home", { posts });
});

// New Post Route - Show form
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Post Route - Handle form submission
app.post("/new", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    res.redirect("/");
});

// Edit Post Route - Show edit form
app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    res.render("edit", { post });
});

// Update Post Route - Handle edit submission
app.post("/edit/:id", (req, res) => {
    let post = posts.find(p => p.id === Number(req.params.id));
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
});

// Delete Post Route - Handle deletion
app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id !== Number(req.params.id));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});