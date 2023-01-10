const SendEmail = require("./sendGrid");

const sendNotificationEmail = async ({name, email}) => {
    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_NOTIFY,
        personalizations: [{
            to: {email},
            dynamic_template_data: {
                subject: "Congratulations",
                username: name,
            }
        }],
    };
    return SendEmail.send(msg);
}

module.exports = sendNotificationEmail;