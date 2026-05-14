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

userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

export const userModel = mongoose.model("User", userSchema);
