import  express from "express";
const router = express.Router();

import { authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    getUserById, 
    updateUserProfile, 
    getUsers,
    getUsersForSidebar,
    deleteUser, 
    updateUser
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/auth',  authUser);
router.get('/sidebar/:id', getUsersForSidebar);

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.route('/:id').delete(deleteUser).get( getUserById).put(updateUser);



export default router;