import mongoose from "mongoose";

// Record Schema
const recordSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: true
    },
    recordType: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Indexing for perfomance
recordSchema.index({ member: 1, workout: 1, date: 1 });
const Record = mongoose.model("Record", recordSchema);
export default Record;