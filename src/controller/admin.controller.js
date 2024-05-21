import bycrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
import generateTokenSetCookie from "../utils/generateToken.js";
import {addQuestionPaperService} from '../service/addQuestions.service.js'
import { saveAnswers } from '../service/addAnswers.service.js';
import { evaluateAndSaveResults } from '../service/evaluateResults.service.js';
import StartTime from '../models/startTime.model.js';

// ------------Admin sign up---------- ✅
export const signUpAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await Admin.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User Already Exists" });
        }

        //Hashing the password
        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        const newUser = new Admin({
            userName,
            password: hashPassword,
        })

        if (newUser) {
            //Generate JWT tokens
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();
            console.log("New Admin Created")
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Admin Login---------- ✅
export const logInAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await Admin.findOne({ userName });
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ success: false, error: "Invalid Username or Password" });
        }

        generateTokenSetCookie(user._id, res);
        
        console.log("Admin Logged In",user);
        res.status(200).json({ success: true , userName: user.userName});

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

// ------------Admin Logout---------- ✅
export const logOutAdmin = (req, res) => {
    try {
        console.log("Admin Log Out");
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

//--------------- question paper adding --------------- ✅
export const addQuestionPaper = async (req, res) => {

    try {

        const startTime = req.body.startTime
        
        const existingStartTime = await StartTime.findOne();

        if (existingStartTime) {
            // Clear the database
            await StartTime.deleteMany();
        }


        const setTime = await StartTime.create({startTime:startTime});
        

        const questionsData = req.body.questions;

        // Call the service function to add question paper
        const result = await addQuestionPaperService(questionsData);

        // Respond with success message
        res.status(201).json({setTime:setTime,results:result});
    } catch (error) {
        // Respond with error message
        res.status(500).json({ error: error.message });
    }
}

// --------------------- adding Answers to DB ----------- ✅
export const Answers = async (req, res) => {
    try {
        const { answer } = req.body;
        const result = await saveAnswers(answer);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in Answers controller:", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

//------------------------ evaluating the marks --------------------------- ✅

// Function to evaluate scores based on user answers

export const evaluationResults = async (req, res) => {
    try {
        const result = await evaluateAndSaveResults();
        res.json(result);
    } catch (error) {
        console.error('Error in evaluationResults controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const check = async (req, res) => {
    try {

        const user = req.user
        const curr = req.body.currentPage

        res.status(200).json({ success: true , userName: user.userName, currentPage:curr});


    } catch (error) {
        console.error('Error in evaluationResults controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




