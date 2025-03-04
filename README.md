# Jim Application - Workout Management System
## জিম অ্যাপ্লিকেশন - ওয়ার্কআউট ম্যানেজমেন্ট সিস্টেম

A RESTful API service for managing workout routines, members, and exercise records using MongoDB.
একটি MongoDB ব্যবহার করে ওয়ার্কআউট রুটিন, মেম্বার এবং এক্সারসাইজ রেকর্ড ম্যানেজ করার জন্য RESTful API সার্ভিস।

### Features | বৈশিষ্ট্যসমূহ

- Create and manage workout routines | ওয়ার্কআউট রুটিন তৈরি এবং ম্যানেজ করুন
- Track exercises and their details | এক্সারসাইজ এবং তাদের বিস্তারিত ট্র্যাক করুন
- Member management system | মেম্বার ম্যানেজমেন্ট সিস্টেম
- Record keeping of member activities | মেম্বার অ্যাক্টিভিটির রেকর্ড সংরক্ষণ
- MongoDB database integration | MongoDB ডাটাবেস ইন্টিগ্রেশন
- Error handling with custom error messages | কাস্টম এরর মেসেজ সহ এরর হ্যান্ডলিং
- Logging system for better debugging | ভালো ডিবাগিংয়ের জন্য লগিং সিস্টেম

### Technology Stack | টেকনোলজি স্ট্যাক

- Node.js
- Express.js
- MongoDB & Mongoose
- Morgan for HTTP request logging | HTTP রিকোয়েস্ট লগিংয়ের জন্য Morgan
- Dotenv for environment variables | এনভায়রনমেন্ট ভ্যারিয়েবলের জন্য Dotenv

### Prerequisites | পূর্বশর্ত

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation | ইনস্টলেশন

```bash
# Clone the repository | রিপোজিটরি ক্লোন করুন
git clone <repository-url>

# Install dependencies | ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# Set up environment variables | এনভায়রনমেন্ট ভ্যারিয়েবল সেট করুন
cp .env.example .env
# Edit .env with your MongoDB connection string | আপনার MongoDB কানেকশন স্ট্রিং দিয়ে .env এডিট করুন

# Start development server | ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# Start production server | প্রোডাকশন সার্ভার চালু করুন
npm start
```

### API Endpoints | এপিআই এন্ডপয়েন্ট

Base URL: `http://localhost:5000/api/v1`

#### Workouts | ওয়ার্কআউট
- `GET /workouts` - Get all workouts | সব ওয়ার্কআউট দেখুন
- `GET /workouts/:workoutId` - Get a specific workout | নির্দিষ্ট ওয়ার্কআউট দেখুন
- `POST /workouts` - Create a new workout | নতুন ওয়ার্কআউট তৈরি করুন
- `PUT /workouts/:workoutId` - Update a workout | ওয়ার্কআউট আপডেট করুন
- `DELETE /workouts/:workoutId` - Delete a workout | ওয়ার্কআউট ডিলিট করুন

#### Members | মেম্বার
- `GET /members` - Get all members | সব মেম্বার দেখুন
- `GET /members/:memberId` - Get a specific member | নির্দিষ্ট মেম্বার দেখুন
- `POST /members` - Register a new member | নতুন মেম্বার নিবন্ধন করুন
- `PUT /members/:memberId` - Update member information | মেম্বারের তথ্য আপডেট করুন
- `DELETE /members/:memberId` - Delete a member | মেম্বার ডিলিট করুন

#### Records | রেকর্ড
- `GET /records` - Get all records | সব রেকর্ড দেখুন
- `GET /records/:recordId` - Get a specific record | নির্দিষ্ট রেকর্ড দেখুন
- `POST /records` - Create a new record | নতুন রেকর্ড তৈরি করুন
- `DELETE /records/:recordId` - Delete a record | রেকর্ড ডিলিট করুন

### Data Models | ডাটা মডেল

#### Workout Model | ওয়ার্কআউট মডেল
```javascript
{
    name: String,
    mode: String,
    equipment: [String],
    exercises: [String],
    trainerTips: [String]
}
```

#### Member Model | মেম্বার মডেল
```javascript
{
    name: String,
    gender: String,
    dateOfBirth: Date,
    email: String,
    password: String,
    address: String,
    phone: String
}
```

#### Record Model | রেকর্ড মডেল
```javascript
{
    members: [ObjectId],
    createdAt: Date
}
```

### Project Structure | প্রজেক্ট স্ট্রাকচার

```
jim_application/
├── src/
│   ├── config/        # Configuration files | কনফিগারেশন ফাইল
│   ├── controllers/   # Request handlers | রিকোয়েস্ট হ্যান্ডলার
│   ├── middleware/    # Express middleware | এক্সপ্রেস মিডলওয়্যার
│   ├── models/        # Mongoose models | মঙ্গুজ মডেল
│   ├── routes/        # API routes | এপিআই রাউট
│   ├── services/      # Business logic | বিজনেস লজিক
│   ├── utils/         # Utility functions | ইউটিলিটি ফাংশন
│   └── server.js      # Main application file | মূল অ্যাপ্লিকেশন ফাইল
├── .env              # Environment variables | এনভায়রনমেন্ট ভ্যারিয়েবল
├── .env.example      # Environment template | এনভায়রনমেন্ট টেমপ্লেট
├── package.json
└── README.md
```

### Error Handling | এরর হ্যান্ডলিং

The application includes a custom error handling system that provides clear error messages and appropriate HTTP status codes.
অ্যাপ্লিকেশনটিতে একটি কাস্টম এরর হ্যান্ডলিং সিস্টেম রয়েছে যা স্পষ্ট এরর মেসেজ এবং উপযুক্ত HTTP স্ট্যাটাস কোড প্রদান করে।

### Environment Variables | এনভায়রনমেন্ট ভ্যারিয়েবল

Required environment variables:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/jim_application)

### Contributing | কন্ট্রিবিউশন

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
