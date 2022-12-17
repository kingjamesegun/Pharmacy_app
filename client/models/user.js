const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please provide your first name"]
    },
    lastName:{
        type: String,
        required: [true, "Please provide your last name"]
    },
    email:{
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password:{
        type: String
    },
    picture: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    loyaltyCode: {
        type: String,
    },
    fiscalCode: {
        type: String,
    },
    interests : {
        type: [String],
    },
    role: {
        type: String,
        default: "user"
    },
    verificationToken: {
        type: String
    },
    tokenExpirationDate: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verified:{
        type: Date
    },
}, {timestamps: true})

UserSchema.pre("save", async function(){
    //check for modified password
    if(!this.isModified("password")) return;
    //hash password before saving
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.ComparePassword = async function(enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword, this.password)
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema)