
var { validate, Post } = require("../model/Post");

exports.count_articles = async (req,res , next) => res.json(await Post.countDocuments())

/** Get All Posts */
exports.list_articles = async (req, res, next) =>  res.json(await Post.find({})).status(200);

/** Get post */
exports.get_article = async (req, res) => res.json(await Post.findOne({ title: req.params.title.split("-").join(" ") }));

/** Add New Post 
 * @requires text {String}
 * @requires title {String}
 * @requires author {String}
*/
exports.add_article = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    let post = new Post({
        comments: [],
        text: req.body.text,
        title: req.body.title,
        author: req.body.author,
        date: Date.now()
    });

    try {
        post = await post.save({
            writeConcern: { w: "majority", wtimeout: 5000 }
        });
        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ "message": err.message });
    }
}

/** Add New Post 
 * @requires text {String}
 * @requires title {String}
 * @requires author {String}
 * @requires Oldtitle {String}
*/
exports.edit_article = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let title = req.body.Oldtitle.split("-").join(" ");
    const post = await Post.findOneAndUpdate(
        { title: title },
        {
            text: req.body.text,
            title: req.body.title,
            author: req.body.author,
            date: Date.now(),
        },
        { new: true }
    );
    if (!post) return res.status(404).json({ "msg": "لا يوجد مقال!" });

    return res.json(post);
}

/** Delete All Artcicls */
exports.delete_all_articles = async (req, res) => {
    await Post.deleteMany({});
    return res.json({ "message": "Deleted!" });
}

/** Delete Particular Post */
exports.delete_article = async (req, res) => {
    let title = req.params.title.split("-").join(" ");

    await Post.findOneAndDelete({ title: title });
    return res.json({ "message": "Deleted!" });
}