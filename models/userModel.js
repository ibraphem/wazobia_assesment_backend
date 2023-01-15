import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        emailVerificationStatus: {type: Boolean, required: false, default: false},
        emailVerificationDate: {type: Date, required: false},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User