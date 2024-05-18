//script to run to seed our data
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js"
import newcars from "./data/CarData.js"
import usedcars from './data/usedCarsData.js'
import orders from './data/order.js'
import reviews from './data/reviewsData.js'

import User from './models/userModel.js';
import newCar from './models/newCarModel.js';
import usedCar from "./models/usedCarModel.js";
import Order from './models/orderModel.js';
import Review from "./models/reviewModel.js";

import connectDB from './config/db.js';

dotenv.config();

await connectDB();

//to import data into db:
const importData = async () => {
    try {
        //before importing, delete all existing data:
        await Order.deleteMany();
        await newCar.deleteMany();
        await usedCar.deleteMany();
        await User.deleteMany();

        //create users in db from data/users.js:
        const createdUsers = await User.insertMany(users);

        //only admin can add new cars:
        const adminUser = createdUsers[0]._id;      //dohvat njegovog id-a

        //every car has a 'user' property with adminId
        const sampleNewCars = newcars.map((car) => {
            return { ...car, user: adminUser};
        });

        const sampleUsedCars = usedcars.map((car) => {
            return { ...car, user: adminUser};
        });

        const sampleOrder = orders.map((order) => {
            return { ...order, user: adminUser};
        });

        //adding items into db:
        await newCar.insertMany(sampleNewCars);
        await usedCar.insertMany(sampleUsedCars);
        await Order.insertMany(sampleOrder);

        await Review.deleteMany();
        await Review.insertMany(reviews);

        console.log('Data imported'.green.inverse);

        process.exit();

    } catch(error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

//to delete data from db
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await newCar.deleteMany();
        await usedCar.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

//if called with'-d' --> destroys data, otherwise - adds data into db
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}