import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //procitaj JWT iz cookie-a:
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //pomocu ovoga u svim rutama mozemo dohvatiti korisnika iz req parametra
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        } catch (error) {
            console.log(error);
            res.status(401);
        throw new Error ('Niste ovlašteni, neispravan token');
        }
        
    } else {
        res.status(401);
        throw new Error ('Niste ovlašteni, nema traženog tokena');
    }
});


//admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error ('Niste ovlašteni - niste admin!');
    }
};

export { protect, admin };