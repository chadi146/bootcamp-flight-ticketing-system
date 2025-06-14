import express from 'express'
import { getUserById, getUsers, getUsersCount} from '../controllers/userControlllers'
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth.middleware';
const router = express.Router()


router.get('/', getUsers);    
router.get('/count',authenticateJWT,authorizeAdmin, getUsersCount);       // Get all users
router.get('/:id', getUserById);  


export default router
