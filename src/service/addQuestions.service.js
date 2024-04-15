import Question from '../models/question.model.js';

// Function to add a question paper
export const addQuestionPaperService = async (questionsData) => {
    try {
        await Question.create(questionsData);
        console.log("Saved Question");
        return { success: true, message: "Question saved successfully" };
    } catch (error) {
        console.error("Error saving question:", error.message);
        throw new Error("Failed to save question");
    }
};

