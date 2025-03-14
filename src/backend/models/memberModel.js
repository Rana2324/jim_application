import mongoose from 'mongoose';

// Member Schema
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please write valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    membershipType: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^(?:\+?\d{1,3}[-.\s]?)?\(?(?:\d{2,3})\)?[-.\s]?(?:\d{3,4})[-.\s]?(?:\d{4})$/, 'Please write valid phone number'],
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model('Member', memberSchema);
export default Member;
