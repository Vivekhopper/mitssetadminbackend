import Subject from '../models/finalAnswer.model.js';
import Question from '../models/question.model.js';

export const saveAnswers = async (answerData) => {
    console.log(answerData);
    let physicsData, chemistryData, mathematicsData;
    let physicsDataDB, chemistryDataDB, mathematicsDataDB;

    try {
        answerData.forEach(element => {
            if (element.subject == 'physics') {
                physicsData = element.data;
            } else if (element.subject == 'chemistry') {
                chemistryData = element.data;
            } else if (element.subject == 'mathematics') {
                mathematicsData = element.data;
            }
        });

        const questionsDB = await Question.find({});
        questionsDB.forEach(element => {
            if (element.subject == 'physics') {
                physicsDataDB = element.data;
            } else if (element.subject == 'chemistry') {
                chemistryDataDB = element.data;
            } else if (element.subject == 'mathematics') {
                mathematicsDataDB = element.data;
            }
        });

        const physicsAnswers = await saveAnswersForSubject(physicsData, physicsDataDB);
        const chemistryAnswers = await saveAnswersForSubject(chemistryData, chemistryDataDB);
        const mathematicsAnswers = await saveAnswersForSubject(mathematicsData, mathematicsDataDB);

        const finalAnswers = new Subject({
            questions: [
                { subject: 'physics', data: physicsAnswers },
                { subject: 'chemistry', data: chemistryAnswers },
                { subject: 'mathematics', data: mathematicsAnswers },
            ],
        });

        // Save the new UserAnswer to the database  
        await finalAnswers.save();

        return { message: "Answers Saved Successfully", success: true };
    } catch (error) {
        console.error("Error in saveAnswers controller:", error);
        throw new Error("Internal Server Error");
    }
};


async function saveAnswersForSubject(data, dataDB) {
    const answers = [];

    for (const item of data) {
        const storedQuestion = dataDB.find(q => q.question === item.question);

        if (storedQuestion) {
            const selectedOption = storedQuestion.options.find(option => option.text === item.options);

            if (selectedOption) {
                answers.push({
                    questionId: storedQuestion._id,
                    answerId: selectedOption._id
                });
            }
        }
    }

    return answers;
}
