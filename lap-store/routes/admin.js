const { Router } = require('express');
const router = Router();

/** middlewares */
const { ensureAuthenticated } = require('../middlewares/auth');
const upload = require("../middlewares/upload");
const cpUpload = upload.fields([{ name: 'more_images', maxCount: 4 }]);

/** controllers */
const Laps_controller = require('../controllers/laps-controller'),
    Orders_controller = require('../controllers/orders-controller'),

    /** Classes */
    { User } = require('../models/User'),
    { Order } = require('../models/Order'),
    { Lap } = require('../models/Laps');
/** main page */
router.get('/', ensureAuthenticated, async (req, res) => {
    res.render('AdminPanel/index.pug', { users: await User.count(), orders: await Order.count(), laps: await Lap.count() })
});

// =======================================  RENDERS ======================================= //
/** Render get data page */
router.get("/laps", ensureAuthenticated, async (req, res) => res.render('AdminPanel/Lap/listLaps.pug'));

/** Render edit lap page */
router.get('/laps/edit-lap/:title', ensureAuthenticated, Laps_controller.render_action);

/** Render add lap page */
router.get('/laps/add-lap', ensureAuthenticated, (req, res) => res.render('AdminPanel/Lap/addLap.pug', { lap: {} }));

/** Render Orders Page */
router.get('/orders', ensureAuthenticated, Orders_controller.list_orders);
// =======================================  ACTIONS ======================================= //
/** Get data list */
router.get('/all-laps', ensureAuthenticated, Laps_controller.all_lap_list);

/** Edit lap */
router.post('/laps/edit-lap', ensureAuthenticated, cpUpload, Laps_controller.update_lap);

/** Add new lap */
router.post('/laps/', cpUpload, ensureAuthenticated, Laps_controller.add_lap);

/** Delete lap */
router.delete('/laps/', ensureAuthenticated, Laps_controller.delete_one_lap);

module.exports = router;
