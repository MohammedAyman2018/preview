var { validate, Lap } = require('../models/Laps');
require('dotenv');

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

const fs = require('fs');

function deleteImages(images_Array) {
    images_Array.more_images.forEach(img => {
        fs.unlink(`${__dirname}/../public/uploads/${img}`, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        });
    });
}

/** get Laps */
exports.lap_list = async (req, res) => {
    let laps = await Lap.find({}).limit(9);

    res.send({ data: laps })
};

/** get Laps */
exports.all_lap_list = async (req, res) => {
    let laps = await Lap.find({});

    res.send({ data: laps })
};

/** get one */
exports.get_one_lap = async (req, res) => {
    try {

        await Lap.findOne({ title: req.params.title.split('-').join(' ') }, (err, res) => {
            if (!res) return res.status(400);
            return res.render("pages/product.pug", { lap: the_lap })
        });
    } catch (error) {
        return res.status(400).send(error)
    }
};

/** Render actions page */
exports.render_action = async (req, res) => {
    let lap = await Lap.findOne({ title: req.params.title.split('-').join(' ') });
    res.render('AdminPanel/Lap/actions.pug', { lap: lap });
}

/** Post Lap */
exports.add_lap = async (req, res) => {
    const { error } = validate(req.body);
    /** TODO: Add ERROR PAGE */
    if (error) return res.status(400).send(`خطأ في البيانات المعطاة ${error.details[0].message}`)

    const { brand, model, color, title, GPU, warranty, ram, cpu, hardDisk, screen, moreInfo, amount, price, tags } = req.body;

    let existed = await Lap.find({ title: title });
    /** TODO: Add ERROR PAGE */
    if (existed.length != 0) return res.status(400).send('موجود بالفعل');

    let upldoadedImages = req.files["more_images"];
    let images = [];

    for (let index = 0; index < upldoadedImages.length; index++) {
        const image = upldoadedImages[index];

        await cloudinary.uploader.upload(image.path,
            {  resource_type: "auto", folder: "lap-store" },
            function (error, result) {
                console.log("in")
                images.push(result.url)
            });
    };

    console.log("out");
    
    /** Assign new lap */
    let new_lap = new Lap({
        brand, model, color, title: title.replace(/-/, ' '), warranty, more_images: images, ram, cpu, hardDisk, GPU, screen, moreInfo, amount, price, tags: (tags).split(',')
    })

    try {
        await new_lap.save();
        res.redirect(`/laps/${new_lap.title.split(' ').join('-')}`)
    } catch (err) {
        /** TODO: Add ERROR PAGE */
        res.send(err);
    }
}

/** Update Lap */
exports.update_lap = async (req, res) => {
    /** Validate the request */
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`خطأ في البيانات المعطاة ${error.details[0].message}`)

    /** Get Data out of the requset */
    const { _id, title, brand, model, color, warranty, ram, cpu, hardDisk, GPU, screen, moreInfo, amount, price, tags } = req.body;

    let new_lap;

    /** If there is images */
    if (req.files['more_images']) {
        let old = await Lap.findById(_id).select('more_images');
        if (old) deleteImages(old);

        /** Get All images */
        let images = [];
        req.files['more_images'].forEach(image => {
            images.push(image.filename)
        });

        /** Assign new lap */
        new_lap = { title, brand, model, color, warranty, ram, more_images: images, cpu, hardDisk, screen, moreInfo, amount, price, tags: tags.split(',') };
    }
    else
        new_lap = { title, brand, model, color, warranty, ram, cpu, hardDisk, GPU, screen, moreInfo, amount, price, tags: tags.split(',') };

    try {
        await Lap.findByIdAndUpdate(_id, new_lap, (err, result) => {
            res.redirect(`/`)
        });
    } catch (err) {
        res.send(err);
    }
}

/** Delete All Laps */
exports.delete_all_laps = async (req, res) => {
    await Lap.deleteMany({});
    res.send({ data: { message: "deleted succssfully" } });
};

/** Delete one */
exports.delete_one_lap = async (req, res) => {
    const { id } = req.body;
    try {
        await Lap.findByIdAndDelete(id);
    } catch (err) {
        res.send({ data: { message: err } });
    }

    return res.status(200);
};