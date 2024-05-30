import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    //userId = payload (digital signature - how a token get assigned & recognized - gets embedded into the token)
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    //set this token as a cookie named "jwt"
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,       //30d in ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    console.log(token);
}

    export default generateTokenAndSetCookie;
