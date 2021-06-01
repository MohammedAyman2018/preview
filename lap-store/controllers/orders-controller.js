var { Order } = require('../models/Order');
var { User } = require('../models/User');

exports.add_order = async (req, res) => {
    try {
        let order = new Order({
            username: req.user.name,
            user_phone: req.user.phone_number,
            user_email: req.user.email,
            lap_title: req.body.lapTitle
        });

        await User.findById(req.user._id)
            .then(async user => {
                /** Check if user have more than 10 orders */
                if (user.orders.length > 10) {
                    return res.send("لديك بالفعل 10 طلبات في القائمة برجاء الانتظار");
                }
                else {
                    /** Check if no orders before */
                    if (user.orders.length == 0) {
                        user.orders.push(req.body.lapTitle);
                        await user.save();
                        await order.save();
                        return res.send(order);
                    }
                    else {
                        user.orders.forEach(async userOrder => {
                            /** Check if the user ordered this before */
                            if (userOrder == req.body.lapTitle)
                                return res.send("تم الطلب بالفعل");
                        });
                        user.orders.push(order.lap_title);
                        await user.save();
                        await order.save();
                        return res.send(order);
                    }

                }

            });
    } catch (err) {
        console.log(err);
    }

};

exports.count_orders = async (req, res) => {
    return await Order.count(); 
} 

exports.list_orders = async (req, res) => {
    try {        
        let orders = await Order.find({}).sort({ username: 1, delivred: 1  , sent: 1 });
        return res.render('AdminPanel/orders.pug', { orders: orders })
    } catch (error) {
        console.log(error)
    }
}

exports.replied = async (req, res) => {
    try {
        let order = await Order.findById(req.body.id);
        
        order.sent = true;
        await order.save();

        let orders = await Order.find({}).sort({ username: 1, delivred: 1  , sent: 1 });
        return res.status(200).render('AdminPanel/orders.pug', { orders: orders })
        
    } catch (error) {
        res.status(400)
    }
} 

exports.delivred = async (req, res) => {
    try {
        let order = await Order.findById(req.body.id);  
        
        order.sent = true;
        order.delivred = true;
        
        await order.save();
        let orders = await Order.find({}).sort({ username: 1, delivred: 1  , sent: 1 });
        return res.status(200).render('AdminPanel/orders.pug', { orders: orders })
        
    } catch (error) {
        res.status(400)
    }
} 