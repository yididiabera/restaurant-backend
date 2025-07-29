import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'manager' | 'admin',
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['customer', 'manager', 'admin'],
        default: 'customer'
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (this: IUser, next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }

})

const User = mongoose.model<IUser>('User', userSchema);

export default User;