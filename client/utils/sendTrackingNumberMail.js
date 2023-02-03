const SendEmail = require("./sendGrid");

const SendTrackingNumberMail = async ({email, username, trackingNo}) => {
    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_TRACKING_NO,
        personalizations: [{
            to: {email},
            dynamic_template_data: {
                subject: "New Order",
                username,
                trackingNo
            }
        }]
    };
    return SendEmail.send(msg);
}

module.exports = SendTrackingNumberMail