var { validate, Word } = require("../model/Word");

/** Count user */
exports.count_words = async (req,res , next) => res.json(await Word.countDocuments())

/** Add Words
 * @requires en_word String
 * @requires en_mean String
 * @requires ar_word String
 * @requires ar_mean String
 */
exports.add_word = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(403).json({ "error": error.details[0].message });

    let word = await Word.findOne({ en_word: req.body.en_word });
    if (word) return res.status(400).json({ "error": "This word already exists" });

    word = new Word({
        en_word: req.body.en_word,
        en_mean: req.body.en_mean,
        ar_word: req.body.ar_word,
        ar_mean: req.body.ar_mean,
    });

    try {
        word = await word.save({
            writeConcern: { w: "majority", wtimeout: 5000 }
        });
        return res.status(200).json(word);
    } catch (err) {
        return res.send({ "error": err.message });
    }
}

/** Edit word
 * @param Word The Word you wanna edit
 * @requires en_word String
 * @requires en_mean String
 * @requires ar_word String
 * @requires ar_mean String
 */
exports.edit_word = async (req, res) => {
    try {
        /** Check if User existed */
        let word = await Word.findOneAndUpdate({ en_word: req.params.word }, {
            en_word: req.body.en_word,
            en_mean: req.body.en_mean,
            ar_word: req.body.ar_word,
            ar_mean: req.body.ar_mean
        });

        return res.json(word);
    } catch (err) {
        return res.json({ "error": err.message })
    }
}

/** Get All words */
exports.list_word = async (req, res) => {
    let words = await Word.find({});
    return res.status(200).json(words);
}

/** Delete All words */
exports.delete_all_words = async (req, res) => {
    await Word.deleteMany({});
    return res.json({ "msg": 'deleted successfully' });
}

/** Delete word  
 * @param Word The Word you wanna delete
*/
exports.delete_word = async (req, res) => {
    /** Check if Word existed */    
    let word = await Word.findOne({ en_word: req.params.word });
    if (!word) return res.json({ "msg": 'Word not found' });

    await Word.deleteOne(word);
    return res.json({ "msg": 'deleted successfully' });
}