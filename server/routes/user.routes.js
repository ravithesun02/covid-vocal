import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router=express.Router();

router.route('/register')
.post(userCtrl.addUserDetails);

router.route('/checkJwt')
.get(authCtrl.requireSignin,authCtrl.hasAuthrization,userCtrl.checkAuth);

export default router;
