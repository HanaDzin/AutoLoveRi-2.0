import asyncHandler from "../middleware/asyncHandler.js";

import newCar from '../models/newCarModel.js'
import usedCar from '../models/usedCarModel.js'


// @desc dohvat svih novih vozila
// @route GET /api/newcars
// @acces public
const getNewCars = asyncHandler (async (req, res) => {
    const newCars = await newCar.find({});
    res.json(newCars);
});


//@desc Dohvat vozila po id-u
//@route GET /api/newcars/:id
//@access public
const getNewCarById = asyncHandler (async (req, res) => {
    const theNewCar = await newCar.findById(req.params.id);

    if (theNewCar) {
        return res.json(theNewCar);
    } 
    res.status(404);
    throw new Error('Novo vozilo nije pronađeno');
});

//@desc     Dodaj novo vozilo (admin)
//@route    POST /api/newcars
//@access   admin
const createNewCar = asyncHandler (async (req, res) => {
    
    const newcar = new newCar ({
        brand: 'BMW',
        model: 'M2',
        price: 0,
        user: '65bebe5c95c1a057b6076715',
        image: '/src/assets/bmw2.png',
        makeYear: 2016,
        motor: 'Diesel',
        transmission: 'Manual',
        description: 'Lorem ipsum'
    })

    const createdNewCar = await newcar.save();
    res.status(201).json(createdNewCar);
});

// @desc Ažuriranje novog vozila
// @route PUT /api/newcars/:id
// @acces private/admin
const updateNewCar = asyncHandler (async (req, res) => {
    const { model, brand, price, description, image, makeYear, motor, transmission} = req.body;

    const newcar = await newCar.findById(req.params.id);

    if (newcar) {
        newcar.model = model;
        newcar.brand = brand;
        newcar.price = price;
        newcar.description = description;
        newcar.image = image;
        newcar.makeYear = makeYear;
        newcar.motor = motor;
        newcar.transmission = transmission;

        const updatedNewCar = await newcar.save();
        res.json(updatedNewCar);
    } else {
        res.status(404);
        throw new Error('Resurs nije pronađen');
    }
});
// @desc Brisanje novog vozila
// @route DELETE /api/newcars/:id
// @acces private/admin
const deleteNewCar = asyncHandler (async (req, res) => {

    const newcar = await newCar.findById(req.params.id);

    if (newcar) {
        await newCar.deleteOne({ _id: newcar._id })
        res.status(200).json({ message: 'Novo vozilo obrisano' })
    } else {
        res.status(404);
        throw new Error('Resurs nije pronađen');
    }
});









const getUsedCars = asyncHandler (async (req, res) => {
    const usedCars = await usedCar.find({});
    res.json(usedCars);
});


const getUsedCarById = asyncHandler (async (req, res) => {
    const theUsedCar = await usedCar.findById(req.params.id);

    if (theUsedCar) {
        return res.json(theUsedCar);
    } 
    res.status(404);
    throw new Error('Rabljeno vozilo nije pronađeno');
});

//@desc     Dodaj novo rabljeno vozilo (admin)
//@route    POST /api/usedcars
//@access   admin
const createUsedCar = asyncHandler (async (req, res) => {
    const usedcar = new usedCar ({
        brand: 'Sample Used Car',
        model: 'X',
        price: 0,
        numOfOwners: 0,
        mileage: 0,
        user: '65bebe5c95c1a057b6076715',
        image: '/src/assets/used-captur.png',
        makeYear: 0,
        motor: 'Diesel',
        transmission: 'Manual',
        description: 'Lorem ipsum'
    })

    const createdUsedCar = await usedcar.save();
    res.status(201).json(createdUsedCar);
});

// @desc Ažuriranje rabljenog vozila
// @route PUT /api/usedcars/:id
// @acces private/admin
const updateUsedCar = asyncHandler (async (req, res) => {
    const { model, brand, price, numOfOwners, mileage, description, image, makeYear, motor, transmission} = req.body;

    const usedcar = await usedCar.findById(req.params.id);

    if (usedcar) {
        usedcar.model = model;
        usedcar.brand = brand;
        usedcar.price = price;
        usedcar.description = description;
        usedcar.image = image;
        usedcar.makeYear = makeYear;
        usedcar.motor = motor;
        usedcar.transmission = transmission;

        usedcar.mileage = mileage,
        usedcar.numOfOwners = numOfOwners

        const updatedUsedCar = await usedcar.save();
        res.json(updatedUsedCar);
    } else {
        res.status(404);
        throw new Error('Resurs nije pronađen');
    }
});


// @desc Brisanje rabljenog vozila
// @route DELETE /api/newcars/:id
// @acces private/admin
const deleteUsedCar = asyncHandler (async (req, res) => {

    const usedcar = await usedCar.findById(req.params.id);

    if (usedcar) {
        await usedCar.deleteOne({ _id: usedcar._id })
        res.status(200).json({ message: 'Novo vozilo obrisano' })
    } else {
        res.status(404);
        throw new Error('Resurs nije pronađen');
    }
});

export {getNewCars, 
    getNewCarById,
    createNewCar,
    updateNewCar,
    deleteNewCar,

    getUsedCars, 
    getUsedCarById,
    createUsedCar,
    updateUsedCar,
    deleteUsedCar
 };