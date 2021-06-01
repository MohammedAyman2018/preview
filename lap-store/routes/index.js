
const { Router } = require('express');
const router = Router();
var { Lap } = require('../models/Laps');

router.get('/', async (req, res) => {
    res.render('pages/index.pug', { title: 'الرئيسية', laps: await Lap.find({}).limit(9), user: req.user })
});

/** Get one lap */
router.get('/laps/:title', async (req, res) => {
    try {
        let the_lap = await Lap.findOne({ title: req.params.title.split('-').join(' ') });
        if (!the_lap) return res.status(400); /** return Error if np lap */

        
        let orderd = false;

        /** Check if user Ordered this lap before */
        if(req.user && req.user.orders.length > 0) {
            req.user.orders.forEach(order => {
                if (the_lap.title == order) {
                    orderd = true;
                }
            })
        };

        /** Get similar laps */
        let similar = await Lap.find(
            {
                brand: the_lap.brand,
                price: {
                    $gte: the_lap.price
                }
            })
            .limit(9)
            .sort({ price: 1 });
        

        res.render("pages/product.pug", { lap: the_lap, user: req.user, similar: similar, orderd: orderd })
    } catch (error) {
        res.status(400)
    }
})

router.get('/profile', async (req, res) => {
    res.render('user/profile.pug', { user: req.user });
});

router.get('/login', async (req, res) => {
    res.render('user/login', { user: req.user });
});

router.get('/sign-up', async (req, res) => {
    res.render('user/signUp', { user: req.user });
});

router.get('/laps', async (req, res) => {
    let laps = await Lap.aggregate([
        {
            $limit: 9
        },
        {
            $unset: ["model", "amount", "moreInfo", "warranty",]
        },
        {
            $project: {
                _id: 0, title: 1, brand: 1, screen: 1, color: 1, ram: 1, cpu: 1, hardDisk: 1, price: 1, tags: 1, GPU: 1,
                more_images: {
                    $slice: ["$more_images", 0, 1]
                },
            }
        }
    ]);

    let filters = await Lap.aggregate([
        {
            $match: {}
        },
        {
            $facet: {
                GPUs: [{ $group: { _id: '$GPU', no: { $sum: 1 } } }],
                cpus: [{ $group: { _id: '$cpu', no: { $sum: 1 } } }],
                rams: [{ $group: { _id: '$ram', no: { $sum: 1 } } }],
                brands: [{ $group: { _id: '$brand', no: { $sum: 1 } } }],
                colors: [{ $group: { _id: '$color', no: { $sum: 1 } } }],
                hardDisks: [{ $group: { _id: '$hardDisk', no: { $sum: 1 } } }],
                screens: [{ $group: { _id: '$screen', no: { $sum: 1 } } }],
            }
        }
    ]);

    return res.render("pages/products.pug", { user: req.user, laps: laps, filters: filters })
});

router.post('/ajaxdemo', async (req, res) => {
    let expression = { $exists: 1 },
        reqIsEmpty = (Object.keys(req.body).length == 2) && req.body.price_from == '' && req.body.price_to == '';

    /** If no filter */
    if (reqIsEmpty) {
        try {
            let laps = await Lap.find({})
                .limit(9)
                .select({ _id: 0, title: 1, price: 1, tags: 1, more_images: 1 });

            return res.send(laps);
        } catch (error) { res.send(error) }
    } else {
        try {
            let filter = {
                ram: (req.body["ram[]"]) ? { $in: req.body["ram[]"] } : expression,
                cpu: (req.body["cpu[]"]) ? { $in: req.body["cpu[]"] } : expression,
                brand: (req.body["brand[]"]) ? { $in: req.body["brand[]"] } : expression,
                color: (req.body["color[]"]) ? { $in: req.body["color[]"] } : expression,
                hardDisk: (req.body["hard_Desk[]"]) ? { $in: req.body["hard_Desk[]"] } : expression,
                // GPU: (req.body["GPU[]"]) ?  { $in: .body["GPU[]"] } : expression,
                screen: (req.body["screen[]"]) ? { $in: req.body["screen[]"] } : expression,

                "price": {
                    $lte: Number(req.body.price_to) || 999999,
                    $gte: Number(req.body.price_from) || 0,
                }

            };

            let laps = await Lap.find(filter)
                .limit(100)
                .select({ _id: 0, title: 1, price: 1, tags: 1, more_images: 1 })
                .sort({ price: 1 });

            return res.send(laps)

        } catch (error) {
            res.send(error)
        }
    }
});


module.exports = router;