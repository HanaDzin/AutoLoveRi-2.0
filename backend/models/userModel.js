import mongoose from "mongoose";
import bcrypt from 'bcryptjs'    //dodajemo da lozinka iz requesta odgovara onoj u bazi (jer je hashirana)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

//za usporedbu unesene lozinke sa onom iz baze podataka (pomocu bycrpt)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//izvršava se prije spremanja u bazu podataka (hashiranje lozinke)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

const User = mongoose.model("User", userSchema);

export default User;