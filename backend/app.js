const express  = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app= express();
//mongoose.connect('mongodb://127.0.0.1:27017/test')
// mongoose.connect("mongodb+srv://sonam:A2RpJtkc48Gm2z9t@cluster0.wk3fjal.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
.then(() => {
    console.log("Connected to Database");
})
.catch(() => {
    console.log("Connection Failed!")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
        );

    next();
});

app.post("/api/posts", (req, res, next) => {
    //const post = req.body;
    const post = new Post({
        title : req.body.title,
        content : req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added Successfully'
    });
});

app.get("/api/posts",(req, res, next) => {
    const posts = [
        {
            id:'fssdfsd756',
            title: 'First Server-side post',
            content: 'This is coming from server'
        },
        {
            id:'sftert454',
            title: 'Second Server-side post',
            content: 'This is coming from server!'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched Successfully!',
        posts:posts
    });
});

module.exports = app;