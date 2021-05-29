
var { validate, User } = require('../model/User');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

require('dotenv').config();
const myJWTSecretKey = process.env.JWT_secret;

/** Count user */
exports.count_users = async (req,res , next) => res.json(await User.countDocuments())

/** List users */
exports.list_users = async (req, res, next) => {
    let users = await User.find({}).select({ name: 1, email: 1, token: 1 });
    return res.json(users);
}

/** REGISTER USER
 * @param name String
 * @param email String Email
 * @param password String password
 */
exports.rigester_normal_user = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.json(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.json('This email already have an account');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: null
    });

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        return res.json(user);
    }
    catch (err) {
        res.json(err);
    }
}

/** REGISTER ADMIN USER 
 * @param name String
 * @param email String Email
 * @param password String password
*/
exports.rigester_admin_user = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ "err": error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ "message": "This email already have an account" });

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: null
    });

    try {
        const token = jsonWebToken.sign(user.toJSON(), myJWTSecretKey);
        user.token = token;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        return res.status(200).json(user);
    }
    catch (err) {
        res.json({ "err": err });
    }
}

/** LOGIN 
  * @param email String Email
  * @param password String password
*/
exports.login = async (req, res) => {
    try {
        /** Check if User existed */
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ "msg": "Email or passowrd is invalid" });

        /** Check passowrd  */
        let matched = await bcrypt.compare(req.body.password, user.password);
        if (!matched) return res.status(400).json({ "msg": "Invalid email or password" });

        if (user.token) {
            try {
                jsonWebToken.verify(user.token, myJWTSecretKey);
                return res.json(user);
            } catch (err) { return res.json(user) }
        }
        return res.json(user)
    }
    catch (err) { return res.json(err) }
}

/** Edit user 
  * @param email String Email
  * @requires name String text
  * @requires password String password
  * @requires admin boolean
*/
exports.edit_user = async (req, res) => {
    try {

        /** Check if User existed */
        let user = await User.findOneAndUpdate({ email: req.params.email }, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            token: null
        });

        /** Check if wanted to be admin */
        if (!req.body.admin) return res.json(user);

        /** if wanted to be admin give him token*/
        const token = jsonWebToken.sign(user.toJSON(), myJWTSecretKey);
        user.token = token;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        return res.json(user);
    } catch (err) { return res.json({ "error": err.message }) }
}

/** Delete users 
 * @param email String Email
 */
exports.delete_user = async (req, res) => {
    /** Check if User existed */
    let user = await User.findOne({ email: req.params.email });
    if (!user) return res.json({ "msg": 'User not found' });

    await User.deleteOne(user);
    return res.json({ "msg": 'deleted successfully' });
}

/** Delete All users */
exports.delete_all = async (req, res) => {
    await User.deleteMany({});
    return res.json({ "msg": 'deleted successfully' });
}

/** Add/delete Word to bookmark
 * @param {String} email
 * @param {String} word word_id
*/
exports.mark_word = async (req, res) => { 
    let user = await User.findOne({ email: req.body.email }),
        words = user.bookmark.words,
        existed_before = words.includes(req.body.word);

    if (!existed_before) {
        words.push(req.body.word);
        await user.save();
        return res.json(user)
    } else {
        let index = words.indexOf(req.body.word);
        if (index > -1) words.splice(index, 1)

        await user.save();
        return res.json(user)
    }
}
