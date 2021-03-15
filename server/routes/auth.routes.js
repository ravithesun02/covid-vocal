import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router=express.Router();

router.route('/login/:phone')
.get(authCtrl.generateOTP);

router.route('/login/verify')
.post(authCtrl.verifyOTP,userCtrl.checkUser);

export default router;