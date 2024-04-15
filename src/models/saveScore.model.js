import mongoose from 'mongoose';

const EvaluationSchema = new mongoose.Schema({
    hallTicketNo: {
        type: Number,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    scores: {
        mathematics: {
            type: Number,
            default: 0,
        },
        physics: {
            type: Number,
            default: 0,
        },
        chemistry: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
});

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);

export default Evaluation;
