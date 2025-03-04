import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Record = mongoose.model('Record', recordSchema);
export default Record;
