const { Router } = require('express')
const router = Router()
const controller = require('../controllers/post-controller');

/** count posts */
router.get('/posts/count', controller.count_articles)

/** Get All articles */
router.get("/posts", controller.list_articles);

/** Get Particular article */
router.get("/posts/:title", controller.get_article);

/** Add article */
router.post("/posts", controller.add_article);

/** Edit article */
router.put("/posts", controller.edit_article);

/** Delete All articles */
router.delete("/posts", controller.delete_all_articles);

/** Delete Particular Post */
router.delete("/posts/:title", controller.delete_article);

module.exports = router
