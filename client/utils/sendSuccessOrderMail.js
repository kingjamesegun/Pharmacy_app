const User = require("../models/user");
const SendEmail = require("./sendGrid");

const sendSuccessfulOrdersEmail = async ({subject, fullName, email, orderId, userId, ref, transactionId}) => {
    const emails = await getAdminEmails();

    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_ORDER,
        personalizations: [{
            to: emails,
            dynamic_template_data: {
                subject: "RC Prints Orders",
                email,
                username: fullName,
                orderId,
                userId,
                ref,
                transactionId
            }
        }]
    };
    return SendEmail.send(msg);
};

const getAdminEmails = async () => {
    const users = await User.find({role: "admin"});
    let emails = [];
    for (const user of users){
        let email = {
            email: user.email
        }
        emails = [...emails, email]
    }
    return emails;
}

module.exports = sendSuccessfulOrdersEmail;