const express = require('express');
const multer = require('multer');

const app = module.exports = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

var upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(file);
});

app.post('/multiupload', upload.array('files', 12), (req, res, next) => {
    const files = req.files;
    if (!files || !files.length) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(files);
});

// app.listen(3000, () => console.log('Server started on port 3000'));
