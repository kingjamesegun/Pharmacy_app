const Transaction = require("../models/transaction")
const Order = require("../models/order")
const CustomError = require("../errors")
const utils = require("../utils")
const Flutterwave = require("flutterwave-node-v3")
// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY)

// redirect url:  https://ecomgig.herokuapp.com/api/v1/payment

//return cancelled or successful, transaction_id query
//verify transaction

const response =  async (req, res) => {
//get status and tx_ref from query
    // const {status, tx_ref, transaction_id} = req.query;

    // if(status === "successful"){
    //     const transactionDetails = await Transaction.find({ref: tx_ref});
    //     if(!transactionDetails){
    //         throw new CustomError.BadRequestError("Invalid transaction");
    //     }
    //     const response = await flw.Transaction.verify({id: transaction_id});

    //     if (response.data.status === "successful"){
    //         //confirm customer's payment by updating the orders chk user, status(pending), and amount or
    //         //get orderId from response.data.customer.orderId
    //         const order = await Order.findOne({_id: response.data.meta.order_id, user: req.user.userId})
    //         order.status = "paid";
    //         await order.save();
    //         //add orderId, email in transaction
    //         const transaction = await Transaction.create({ref: response.data.tx_ref, user: req.user.userId, orderId: response.data.meta.order_id, 
    //             amount: response.data.amount, currency: response.data.currency, email: req.user.email
    //         });
    //         // send successful orders email
    //         //send subject, fullname, ref:, transactionId, status: successful
    //         await utils.sendSuccessfulOrdersEmail({
    //             orderId: response.data.meta.order_id, userId: req.user.userId, email: req.user.email, 
    //             fullName: req.user.username, ref: response.data.tx_ref,
    //             transactionId: transaction._id, status: "successful"
    //         });

    //         res.status(200).redirect("http://localhost:3000/cart/success");
    //     }else{
    //         throw new CustomError.BadRequestError("Invalid transaction")
    //     }
    // }else{
    //     throw new CustomError.BadRequestError("Invalid transaction") 
    // }
}

module.exports = response;