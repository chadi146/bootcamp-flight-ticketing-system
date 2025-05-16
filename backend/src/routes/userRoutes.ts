import express from 'express'
import { getUserById, getUsers, registerUser} from '../controllers/userControlllers'

const router = express.Router()

router.post('/register', registerUser)
router.get('/', getUsers);           // Get all users
router.get('/:id', getUserById); 
// router.post('/login', loginUser)

export default router
