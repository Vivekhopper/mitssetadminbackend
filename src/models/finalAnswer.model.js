import mongoose from 'mongoose';

// Define schema for questions
const QuestionSchema = new mongoose.Schema({
    questionId: String,
    answerId: String
});

// Define schema for subjects
const SubjectSchema = new mongoose.Schema({
    subject: String,
    data: [QuestionSchema]
});

const finalAnswerSchema = new mongoose.Schema({
    questions: [SubjectSchema]
});

const Subject = mongoose.model('finalAnswer', finalAnswerSchema);

export default Subject;
