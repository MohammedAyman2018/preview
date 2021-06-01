var { Router } = require('express');
var router = Router();
const controller = require('../controllers/users-controller');

router.post('/phone', controller.add_user_phone)
module.exports = router;