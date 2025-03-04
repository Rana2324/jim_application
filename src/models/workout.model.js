import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    equipment: [{
        type: String
    }],
    exercises: [{
        type: String
    }],
    trainerTips: [{
        type: String
    }]
}, {
    timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
