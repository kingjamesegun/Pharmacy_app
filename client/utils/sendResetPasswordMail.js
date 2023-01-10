const SendEmail = require("./sendGrid");

const sendResetPasswordEmail = async ({name, email, passwordToken, origin}) => {
    const resetLink = `${origin}/reset-password?email=${email}&token=${passwordToken}`;
    const msg = {
        from: "gbemilekeogundipe@gmail.com",
        template_id: process.env.SENDGRID_RESET_ID,
        personalizations: [{
            to: {email},
            dynamic_template_data: {
                subject: "Reset password",
                username: name,
                reset_password: resetLink
            }
        }],
    };
    return SendEmail.send(msg);
}

module.exports = sendResetPasswordEmail;