import express from 'express';
import adminCtrl from '../controllers/admin.controller';
import authCtrl from '../controllers/auth.controller';

const router=express.Router();

router.route('/signup')
.post(adminCtrl.signup)

router.route('/signin')
.post(authCtrl.signinAdmin);

router.route('/getAllUsers')
.get(authCtrl.requireSignin,authCtrl.hasAuthrization,adminCtrl.getAllUsers);

router.route('/sendMail')
.post(authCtrl.requireSignin,authCtrl.hasAuthrization,adminCtrl.sendEmail)

export default router;