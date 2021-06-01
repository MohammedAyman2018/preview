var { Router } = require('express');
var router = Router();
const controller = require('../controllers/orders-controller');

/** Add order */
router.post('/add', controller.add_order);

/** Get All Orders */
router.get('/all', controller.list_orders);

/** Reply to Order */
router.post('/replied', controller.replied);

/** delivred Order */
router.post('/delivred', controller.delivred);

module.exports = router;