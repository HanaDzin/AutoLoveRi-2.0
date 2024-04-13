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

//unos podataka
const importData = async () => {
    try {
        //pobriši sve prije unosa novih podataka:
        /*await Order.deleteMany();
        await newCar.deleteMany();
        await usedCar.deleteMany();
        await User.deleteMany();

        //kreirati korisnika od podataka iz users.js
        const createdUsers = await User.insertMany(users);

        //samo admin može dodavati nove aute:
        const adminUser = createdUsers[0]._id;      //dohvat njegovog id-a

        //svako auto ima dodatnu stavku user:admin (id admina)
        const sampleNewCars = newcars.map((car) => {
            return { ...car, user: adminUser};
        });

        const sampleUsedCars = usedcars.map((car) => {
            return { ...car, user: adminUser};
        });

        const sampleOrder = orders.map((order) => {
            return { ...order, user: adminUser};
        });

        //unos auta u bazu
        await newCar.insertMany(sampleNewCars);
        await usedCar.insertMany(sampleUsedCars);
        await Order.insertMany(sampleOrder);*/

        await Review.deleteMany();
        await Review.insertMany(reviews);

        console.log('Data imported'.green.inverse);

        process.exit();

    } catch(error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

//brisanje podataka
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await newCar.deleteMany();
        await usedCar.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

//ako se pozove sa '-d' --> brisanje podataka, u suprotnom dodavanje u bazu
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}