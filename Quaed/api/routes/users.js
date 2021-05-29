const { Router } = require('express')
const router = Router()

const controller = require('../controllers/user-controller');

/** count users */
router.get('/users/count', controller.count_users)

/** Get All users */
router.get('/users', controller.list_users);

/** Register normal user */
router.post('/register', controller.rigester_normal_user);

/** Register admins */
router.post('/register/admin', controller.rigester_admin_user);

/** Login */
router.post('/login', controller.login);

/** Edit user */
router.put('/users/:email', controller.edit_user);

/** Add/delete Word to/from bookmark */
router.post('/users/addFavWord', controller.mark_word);

/** Delete All users */
router.delete('/users', controller.delete_all);

/** Delete users  */
router.delete('/users/:email', controller.delete_user);

module.exports = router;