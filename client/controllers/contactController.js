const utils = require("../utils");

const ContactUs = async (req, res) => {
    const {subject, fullName, email, phone, message} = req.body;
    
    await utils.sendContactUsEmail({subject, fullName, email, phone, message});

    res.status(200).json({msg: "Thank you for the feedback"});
}

module.exports = ContactUs;