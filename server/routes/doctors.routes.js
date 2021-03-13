import express from 'express';
import authCtrl from '../controllers/auth.controller';
import docCtrl from '../controllers/doctor.controller';

var router=express.Router();

router.route('/signup')
.post(docCtrl.create);

router.route('/signin')
.post(authCtrl.siginDoctor);

router.route('/getUsers')
.get(authCtrl.requireSignin,authCtrl.hasAuthrization,docCtrl.getUsers);

router.route('/updateUser')
.put(authCtrl.requireSignin,authCtrl.hasAuthrization,docCtrl.updateUser);

export default router;
