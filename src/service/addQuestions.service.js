import Question from '../models/question.model.js';

// Function to add a question paper
export const addQuestionPaperService = async (questionsData) => {
    try {
        // const startTime = questionsData;
        // console.log(startTime);
        const existingQuestion = await Question.findOne();

        if (existingQuestion) {
            // Clear the database
            await Question.deleteMany();
        }

        const res = await Question.create(questionsData);
        console.log(res);
        if(res){

            console.log("Saved Question");
            return { success: true, message: "Question saved successfully" };
        }else{
            return { success: false, message: "Error in Saving QP" };
        }
    } catch (error) {
        console.error("Error saving question:", error.message);
        throw new Error("Failed to save question");
    }
    
};

