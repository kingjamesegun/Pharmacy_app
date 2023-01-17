const stripe = require('stripe')(process.env.STRIPESECRETKEY);

const createPaymentIntent =  async (req, res) => {
    const {amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
    })
    res.status(201).json({clientSecret: paymentIntent.client_secret})
}

module.exports = createPaymentIntent;