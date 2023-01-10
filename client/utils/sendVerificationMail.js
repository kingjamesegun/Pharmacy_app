const SendEmail = require("./sendGrid");

const sendVerificationCode = async ({name, email, verificationToken, origin}) => {
    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_VERIF_ID,
        personalizations: [{
            to: {email},
            dynamic_template_data: {
                subject: "Verification Code",
                username: name,
                verify_email: verificationToken
            }
        }]
    };
    return SendEmail.send(msg);
}

module.exports = sendVerificationCode;