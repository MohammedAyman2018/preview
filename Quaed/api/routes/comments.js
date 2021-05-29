const { Router } = require('express')
const router = Router()

const controller = require('../controllers/comments-controller');

/** Add comment */
router.post('/comments', controller.add_comment);

/** Delete comment */
router.post('/delete-comment', controller.delete_comment);

/** Reply to comment */
router.post('/reply', controller.add_reply);

/** Delete a Reply */
router.post('/delete-reply', controller.delete_reply);

module.exports = router;