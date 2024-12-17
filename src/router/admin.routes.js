import express from 'express';
import { logInAdmin,check, logOutAdmin, signUpAdmin, addQuestionPaper,Answers,evaluationResults } from '../controller/admin.controller.js';
import adminProtectingRouter from '../middleware/adminProtectingRouter.js';

const router = express.Router();

router.post('/signupAdmin', signUpAdmin);  // ✅

router.post('/loginAdmin', logInAdmin);  // ✅

router.get('/logoutAdmin', logOutAdmin);  // ✅

// Protect the route for adding question paper
router.post('/addQuestionPaper', adminProtectingRouter,addQuestionPaper);  // ✅

// adding the answers for evaluation
router.post('/Answers',adminProtectingRouter, Answers); //  ✅

// evaluating and getting results 
router.get('/evaluationResults',adminProtectingRouter, evaluationResults); // ✅ 

router.post('/check',adminProtectingRouter, check); // ✅

export default router;