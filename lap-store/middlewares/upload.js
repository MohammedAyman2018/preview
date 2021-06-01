
const multer = require("multer");
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {     
        callback(null, `${__dirname}/../public/uploads`)
    },
    filename: function (req, file, callback) {
        callback(null, req.body.title + '-' + Date.now()+'.jpg')
    }
});

var upload = multer({ storage: storage });


module.exports = upload;