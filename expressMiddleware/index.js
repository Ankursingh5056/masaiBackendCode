const express = require('express');
const fs = require('fs');
const app = express();
const multer = require('multer');
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage})

app.get('/', function(req, res) {
    res.status(200).render('profile', { message: "Welcome to the app" });
});

app.get('/profile', (_, res)=> {
    res.render('profile');
});

app.post('/upload', upload.single('profileImage'), function(req, res) {
    res.status(200).json({ message: "Uploaded successfully" });
});

let port = 6080;

app.listen(port, function() {
    console.log("app running at", port);
});