import Subject from '../models/finalAnswer.model.js';
import UserAnswer from '../models/userAnswer.model.js';
import Evaluation from '../models/saveScore.model.js';

export const evaluateAndSaveResults = async () => {
    try {
        // Fetch all user answers from the database
        const users = await UserAnswer.find({});

        // Iterate through each user and evaluate scores
        for (const user of users) {
            const evaluationData = await evaluateScores(user);

            // Save the evaluation results to the database
            await saveEvaluation(evaluationData);
        }

        return { success: true };
    } catch (error) {
        console.error('Error in evaluationResults service:', error);
        throw new Error('Internal Server Error');
    }
};

const evaluateScores = async (user) => {
    let physicsData, chemistryData, mathematicsData;
    let FphysicsData, FchemistryData, FmathematicData;

    user.questions.forEach(element => {
        if (element.subject == 'physics') {
            physicsData = element.data;
        } else if (element.subject == 'chemistry') {
            chemistryData = element.data;
        } else if (element.subject == 'mathematics') {
            mathematicsData = element.data;
        }
    });

    // getting final answers - KEY
    const finalAnswer = await Subject.findOne({})

    finalAnswer.questions.forEach(element => {
        if (element.subject == 'physics') {
            FphysicsData = element.data;
        } else if (element.subject == 'chemistry') {
            FchemistryData = element.data;
        } else if (element.subject == 'mathematics') {
            FmathematicData = element.data;
        }
    });

    const physicsScore = getScore(physicsData, FphysicsData);
    const chemistryScore = getScore(chemistryData, FchemistryData);
    const mathsScore = getScore(mathematicsData, FmathematicData);

    return {
        hallTicketNo: user.hallTicketNo,
        dateOfBirth: user.dateOfBirth,
        scores: {
            mathematics: mathsScore,
            physics: physicsScore,
            chemistry: chemistryScore,
            total: mathsScore + physicsScore + chemistryScore,
        },
    };
};

// Function to compare user answers with final answers and calculate score
const getScore = (userData, adminData) => {
    let score = 0;
    const checkedQuestions = new Set(); // Use a Set to keep track of checked questions

    // Iterate through user data
    for (const userAnswer of userData) {

        // Check if the question has already been checked
        if (!checkedQuestions.has(userAnswer.question)) {

            // Find the corresponding admin question by question ID
            const adminAnswer = adminData.find(answer => answer.questionId === userAnswer.question);

            if (adminAnswer) {
                // If admin answer with the same ID exists, check if options match
                if (adminAnswer.answerId === userAnswer.options) {
                    score++;
                }

            }

            // Add the question to the set of checked questions
            checkedQuestions.add(userAnswer.questionId);
        }
    }

    return score;
};



// Function to save evaluation results to the database
const saveEvaluation = async (evaluationData) => {
    try {
        // Check if the evaluation record already exists for the user
        const existingEvaluation = await Evaluation.findOne({
            hallTicketNo: evaluationData.hallTicketNo,
            dateOfBirth: evaluationData.dateOfBirth,
        });

        if (existingEvaluation) {
            // If the evaluation record exists, update the scores
            existingEvaluation.scores = evaluationData.scores;
            await existingEvaluation.save();
        } else {
            // If the evaluation record doesn't exist, create a new one
            const newEvaluation = new Evaluation(evaluationData);
            await newEvaluation.save();
        }
    } catch (error) {
        console.error('Error saving evaluation:', error);
    }
};
