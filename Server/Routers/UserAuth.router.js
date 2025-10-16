import express from 'express';
import { Login, LogOut, Profile, Registration } from '../Controller/UserAuth.controller.js';
import { Protect_router } from '../Middleware/Middleware.js';

const router=express.Router()


router.post('/registration',Registration)
router.post('/login',Login)
router.post('/logout',LogOut)
router.get('/profile',Protect_router,Profile)


export default router