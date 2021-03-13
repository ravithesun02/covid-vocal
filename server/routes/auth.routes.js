import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router=express.Router();

router.route('/login/:phone')
.get(authCtrl.generateOTP);

router.route('/login/:phone/:code')
.get(authCtrl.verifyOTP,authCtrl.sigin);

export default router;