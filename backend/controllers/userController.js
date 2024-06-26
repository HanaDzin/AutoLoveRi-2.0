import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateTokenAndSetCookie from "../utils/generateToken.js";


// @desc user authentication & token production
// @route POST /api/users/auth
// @acces public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    //check if user with that email already exists:
    const user = await User.findOne({  email });

    if (user && (await user.matchPassword(password))) { 
        generateTokenAndSetCookie(user._id, res);


        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }

});

// @desc user registration
// @route POST /api/users
// @acces public
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Korisnik već postoji');
    } 
    //create a new user using data sent in from input form
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Neispravni korisnički podaci')
    }
});

// @desc logs out the user & deletes the cookie
// @route POST /api/users/logout
// @acces private
const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {             //clear the cookie
            maxAge: 0
        });

        res.status(500).json({ message: "Uspješna odjava"})

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error!"});
    }
}

// @desc gets users profile by id
// @route GET /api/users/profile
// @acces private
const getUserProfile = asyncHandler (async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
   } else {
    res.status(404);
    throw new Error('User not found');
   }
});

// @desc updates user profile
// @route PUT /api/users/profile 
// @acces private
const updateUserProfile = asyncHandler (async (req, res) => {
    const { _id } = req.body
    const user = await User.findById( { _id} );

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found - cannot be updated');
    }
    
});

// @desc get all user (only admin sees)
// @route GET /api/users
// @acces private/admin
const getUsers = asyncHandler (async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc get all users for sidebar in admin chat
// @route GET /api/users/sidebar/:id
// @acces private/admin
const getUsersForSidebar = asyncHandler (async (req, res) => {
    //obtain the admin id from request:
    const adminId = req.params.id;

     //get users from database (besides the one currently logged in):
    const allUsers = await User.find({ _id: { $ne: adminId }}).select("-password");

    res.status(200).json(allUsers);
});

// @desc get user by id
// @route GET /api/users/:id
// @acces private/admin
const getUserById = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

// @desc delete a user (only admin)
// @route DELETE /api/users/:id
// @acces private/admin
const deleteUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        //make sure admin cannot be deleted
        if (user.isAdmin) {
            res.status(400);
            throw new Error ('Cannot delete admin user')
        }

        await User.deleteOne({ _id: user._id })
        res.status(200).json( {message: 'Successfully delete user'} )
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc update user (admin)
// @route PUT /api/users/:id
// @acces private/admin
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save();

    res.status(200).json({ 
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
    } else {
        res.statuds(404);
        throw new Error('User not found')
    }
});

export { authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    getUserById, 
    updateUserProfile, 
    getUsers,
    getUsersForSidebar, 
    deleteUser, 
    updateUser} 


