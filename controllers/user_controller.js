const onlineCollection = require("../db").db().collection("imtta_online");

exports.home = async (req, res) => {
    try{
    const online = await onlineCollection.find({}).toArray()
     res.render('home', {online: online, paypalClientId: process.env.PAYPAL_CLIENT_ID})
    } catch(e) {
      console.log(e)
    }
}