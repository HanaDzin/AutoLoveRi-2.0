import mongoose from "mongoose";

const newCarsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    makeYear: {
        type: Number
    },
    motor: {
        type: String
    },
    transmission: {
        type: String
    },
    description: {
        type: String
    },
}, {
    timestamps: true
});

const newCar = mongoose.model("NewCar", newCarsSchema);

export default newCar;