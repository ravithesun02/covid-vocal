import express from 'express';
import authCtrl from '../controllers/auth.controller';
import predictCtrl from '../controllers/predict.controller';

//req.auth contains { _id: '60310bcf73f4dd075b81c9c2', iat: 1613827024 }

var router=express.Router();

router.route('/v1/predict')
.get(authCtrl.requireSignin,authCtrl.hasAuthrization, predictCtrl.predictById);

router.route('/v1/predict/ai')
.get(authCtrl.requireSignin,authCtrl.hasAuthrization,predictCtrl.predictCovid);

router.route('/v1/predict/verify')
.post(authCtrl.requireSignin,authCtrl.hasAuthrization,predictCtrl.verifyAudio,predictCtrl.uploadToDb);

export default router;