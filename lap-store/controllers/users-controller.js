var { validate, User } = require('../models/User');
var { Lap } = require('../models/Laps');

exports.count_users = async (req, res, next) => {
    return await User.count();
};

exports.add_user_phone = async (req, res, next) => {
    const { phone, lapTitle } = req.body;
    
    /** Get the lap */
    let lap = await Lap.find({ title: lapTitle });

    /** Get User */
    await User.findById(req.user._id)
        .then(async user => {
            if(!user) return res.redirect('/login');
            user.phone_number = phone;

            /** Add the lap to user oredres */
            user.orders.push(lapTitle);

            await user.save();
            console.log(user)
            return res.send("add")
        })
        .catch(err => console.log(err));

};