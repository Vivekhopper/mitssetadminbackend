import mongoose from 'mongoose';

const EvaluationSchema = new mongoose.Schema({
    hallTicketNo: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender:{
        type: String,
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
