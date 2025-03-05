import mongoose from "mongoose";

// Workout Schema
const workoutSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    workoutType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

// indexing for perfomance
workoutSchema.index({ member: 1, date: 1 });

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;