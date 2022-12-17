const User = require("../models/user");
const SendEmail = require('./sendGrid');

const sendContactUsEmail = async ({subject, fullName, email, phone, message}) => {
    const emails = await getAdminEmails();

    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_CONTACT,
        personalizations: [{
            to: emails,
            dynamic_template_data: {
                subject,
                email,
                username: fullName,
                message,
                phone_number: phone,
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

module.exports = sendContactUsEmail;