const { Router } = require('express')
const router = Router()

const controller = require("../controllers/word-controller");

/** count words */
router.get('/words/count', controller.count_words)

/** Add word */
router.post('/words', controller.add_word);

/** Edit word */
router.put('/words/:word', controller.edit_word);

/** Get All words */
router.get('/words', controller.list_word);

/** Delete All words */
router.delete('/words', controller.delete_all_words);

/** Delete word */
router.delete('/words/:word', controller.delete_word);

module.exports = router
