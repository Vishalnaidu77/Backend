import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username: {
             type: String, 
             required: true, 
             trim: true, 
             unique: true 
            },
        email: { 
            type: String, 
            required: true, 
            trim: true, 
            unique: true, 
            lowercase: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        verified: { 
            type: Boolean, 
            default: false 
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async (next) => {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.comparePassword = (userPassword) => {
    return bcrypt.compare(userPassword, this.password)
}

export const userModel = mongoose.model("User", userSchema);
