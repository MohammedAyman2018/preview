const mongoose = require('mongoose');
var { Post } = require("../model/Post");

/** Add Comment
 * @requires article_id Article Id
 * @requires id The Comment ID
 */
exports.add_comment = async (req, res) => {
    let post = await Post.findOne({ _id: req.body.article_id });
    if (!post) return res.status(400);
    
    req.body.comment._id = mongoose.Types.ObjectId();
    req.body.comment.replies = [];
    
    post.comments.push(req.body.comment);
    await post.save();

    return res.json(post)
};

/** Delete Comment
 * @requires article_id Article Id
 * @requires comment_id The Comment ID
 */
exports.delete_comment = async (req, res) => {
    await Post.findOne({ _id: req.body.article_id })
        .then(async post => {
            let comments = post.comments,
                index = comments.findIndex(c => c._id == req.body.comment_id);
                
            comments.splice(index, 1);
            await post.updateOne({ comments: comments }, { new: true });
            return res.json(post)
        })
        .catch(err => res.status(400));
};

/** Add Reply
 * @requires article_id Article Title
 * @requires comment_id The Comment ID
 * @requires reply Reply body
 */
exports.add_reply = async (req, res) => {

    await Post.findOne({ _id: req.body.article_id })
    .then(async post => {
        let all_comments = post.comments,
        comment_position = all_comments.findIndex(c => c._id == req.body.comment_id);
        all_comments[comment_position].replies.push(req.body.reply);
        
        await post.updateOne({ comments: all_comments }, { new: true });
            return res.json(post)
        }) 
        .catch(err => res.status(400))
}

/** Delete Reply
 * @requires article_id Article Title
 * @requires comment_id The Comment ID
 * @requires reply_no Reply position
 */
exports.delete_reply = async (req, res) => {
    await Post.findOne({ _id: req.body.article_id })
        .then(async post => {
            let all_comments = post.comments,
            comment_position = all_comments.findIndex(c => c._id == req.body.comment_id);
            all_comments[comment_position].replies.splice(req.body.reply_no, 1);

            await post.updateOne({ comments: all_comments }, { new: true })
            return res.json(post)
        })
        .catch(err => res.status(400));
}