const onlineCollection = require("../db").db().collection("imtta_online");
const paypal = require('@paypal/checkout-server-sdk')
const Environment =
process.env.NODE_ENV === "production"
? paypal.core.LiveEnvironment
: paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
    )
    )
    
const storeItems = new Map([
  [1, {price: 10, name: "1 year directory registration"}]
])

exports.createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest()
  const total = req.body.items.reduce((sum, item) => {
    return sum + storeItems.get(item.id).price * item.quantity
  }, 0)
  request.prefer("return=representation")
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: "USD",
              value: storeItem.price,
            },
            quantity: item.quantity,
          }
        }),
      },
    ],
  })

  try {
    const order = await paypalClient.execute(request)
    res.json({ id: order.result.id })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

exports.addOnline = async (req, res) => {
try{
//run this after paypal has sent back confirmation of payment?

//check image and convert to base64

//Should check for existing college entry to avoid duplicates?

// console.log(req.body)
req.body.joined = new Date();
req.body.validated = false;
req.body.paid = 0.0;

await onlineCollection.insertOne(req.body)
// const online = await onlineCollection.find({}).toArray()
res.redirect('/')


} catch(e) {
  console.log(e)
}
}