import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    //kreiranje jwt koji u sebi sadrži id korisnika (to je payload)
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

//postavi JWT kao HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,       
    });
}

export default generateToken;