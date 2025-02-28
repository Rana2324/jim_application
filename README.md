# Jim Application - Workout Management System
## জিম অ্যাপ্লিকেশন - ওয়ার্কআউট ম্যানেজমেন্ট সিস্টেম

A RESTful API service for managing workout routines and exercises.
একটি ওয়ার্কআউট রুটিন এবং এক্সারসাইজ ম্যানেজ করার জন্য RESTful API সার্ভিস।

### Features | বৈশিষ্ট্যসমূহ

- Create and manage workout routines | ওয়ার্কআউট রুটিন তৈরি এবং ম্যানেজ করুন
- Track exercises and their details | এক্সারসাইজ এবং তাদের বিস্তারিত ট্র্যাক করুন
- Error handling with custom error messages | কাস্টম এরর মেসেজ সহ এরর হ্যান্ডলিং
- Logging system for better debugging | ভালো ডিবাগিংয়ের জন্য লগিং সিস্টেম

### Technology Stack | টেকনোলজি স্ট্যাক

- Node.js
- Express.js
- UUID for unique identifiers | ইউনিক আইডেন্টিফায়ারের জন্য UUID
- Morgan for HTTP request logging | HTTP রিকোয়েস্ট লগিংয়ের জন্য Morgan
- Chalk for colorful console output | কালারফুল কনসোল আউটপুটের জন্য Chalk

### Installation | ইনস্টলেশন

```bash
# Clone the repository | রিপোজিটরি ক্লোন করুন
git clone <repository-url>

# Install dependencies | ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# Start development server | ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev

# Start production server | প্রোডাকশন সার্ভার চালু করুন
npm start
```

### API Endpoints | এপিআই এন্ডপয়েন্ট

Base URL: `http://localhost:4000/api/v1`

#### Workouts | ওয়ার্কআউট
- `GET /workouts` - Get all workouts | সব ওয়ার্কআউট দেখুন
- `POST /workouts` - Create a new workout | নতুন ওয়ার্কআউট তৈরি করুন
- `GET /workouts/:workoutId` - Get a specific workout | নির্দিষ্ট ওয়ার্কআউট দেখুন
- `PATCH /workouts/:workoutId` - Update a workout | ওয়ার্কআউট আপডেট করুন
- `DELETE /workouts/:workoutId` - Delete a workout | ওয়ার্কআউট ডিলিট করুন

#### Members | মেম্বার
- `GET /members` - Get all members | সব মেম্বার দেখুন
- `POST /members` - Register a new member | নতুন মেম্বার নিবন্ধন করুন
- `GET /members/:memberId` - Get a specific member | নির্দিষ্ট মেম্বার দেখুন
- `PATCH /members/:memberId` - Update member information | মেম্বারের তথ্য আপডেট করুন
- `DELETE /members/:memberId` - Delete a member | মেম্বার ডিলিট করুন
- `GET /members/:memberId/workouts` - Get member's workout history | মেম্বারের ওয়ার্কআউট ইতিহাস দেখুন
- `POST /members/:memberId/workouts` - Assign workout to member | মেম্বারকে ওয়ার্কআউট বরাদ্দ করুন

### Project Structure | প্রজেক্ট স্ট্রাকচার

```
jim_application/
├── src/
│   ├── database/      # Database operations | ডাটাবেস অপারেশন
│   ├── middleware/    # Express middleware | এক্সপ্রেস মিডলওয়্যার
│   ├── routes/        # API routes | এপিআই রাউট
│   ├── services/      # Business logic | বিজনেস লজিক
│   ├── utils/         # Utility functions | ইউটিলিটি ফাংশন
│   └── server.js      # Main application file | মূল অ্যাপ্লিকেশন ফাইল
├── logs/              # Application logs | অ্যাপ্লিকেশন লগ
├── package.json
└── README.md
```

### Error Handling | এরর হ্যান্ডলিং

The application includes a custom error handling system that provides clear error messages and appropriate HTTP status codes.
অ্যাপ্লিকেশনটিতে একটি কাস্টম এরর হ্যান্ডলিং সিস্টেম রয়েছে যা স্পষ্ট এরর মেসেজ এবং উপযুক্ত HTTP স্ট্যাটাস কোড প্রদান করে।

### Logging | লগিং

Morgan is used for HTTP request logging, and custom logging is implemented for debugging purposes.
HTTP রিকোয়েস্ট লগিংয়ের জন্য Morgan ব্যবহৃত হয়, এবং ডিবাগিংয়ের জন্য কাস্টম লগিং বাস্তবায়িত করা হয়েছে।
