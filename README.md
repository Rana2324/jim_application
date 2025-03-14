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
- Code quality enforcement with ESLint and Prettier | ESLint এবং Prettier দিয়ে কোড কোয়ালিটি নিশ্চিতকরণ

### Technology Stack | টেকনোলজি স্ট্যাক

- Node.js
- Express.js
- MongoDB & Mongoose
- Morgan for HTTP request logging | HTTP রিকোয়েস্ট লগিংয়ের জন্য Morgan
- Dotenv for environment variables | এনভায়রনমেন্ট ভ্যারিয়েবলের জন্য Dotenv
- ESLint for code linting | কোড লিন্টিং এর জন্য ESLint
- Prettier for code formatting | কোড ফরম্যাটিং এর জন্য Prettier

### Prerequisites | পূর্বশর্ত

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- VSCode (recommended editor)

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
├── .vscode/          # VSCode settings | VSCode সেটিংস
├── public/           # Static files | স্ট্যাটিক ফাইল
├── views/            # EJS templates | EJS টেমপ্লেট
├── .env              # Environment variables | এনভায়রনমেন্ট ভ্যারিয়েবল
├── .env.example      # Environment template | এনভায়রনমেন্ট টেমপ্লেট
├── .prettierrc       # Prettier configuration | Prettier কনফিগারেশন
├── .prettierignore   # Prettier ignore patterns | Prettier ইগনোর প্যাটার্ন
├── eslint.config.js  # ESLint configuration | ESLint কনফিগারেশন
├── package.json
└── README.md
```

### ESLint and Prettier Setup | ESLint এবং Prettier সেটআপ

This project uses ESLint and Prettier to enforce code quality and consistent formatting. Here's how it's set up:

#### ESLint Configuration | ESLint কনফিগারেশন

The project uses ESLint v9 with the new flat config format in `eslint.config.js`:

```javascript
// Main ESLint rules
{
  'no-console': 'warn',        // console স্টেটমেন্ট ব্যবহার হলে সতর্ক করবে
  'no-unused-vars': 'warn',    // অব্যবহৃত ভেরিয়েবলগুলোর জন্য সতর্ক করবে
  'prefer-const': 'error',     // যদি কোনো ভেরিয়েবল কখনো পুনঃআবৃত্তি না হয় তবে const ব্যবহার করার জন্য চাপ দেবে
  'no-var': 'error',           // var ব্যবহার নিষিদ্ধ করবে
  'eqeqeq': ['error', 'always'], // সর্বদা কঠোর সমতা (=== এবং !==) ব্যবহার করতে বলবে
  'quotes': ['error', 'single'], // একক কোটস ব্যবহার করতে বলবে
  'semi': ['error', 'always'],   // সব স্টেটমেন্টে সেমিকোলন প্রয়োজন
}
```

#### Prettier Configuration | Prettier কনফিগারেশন

The `.prettierrc` file defines the code formatting rules:

```json
{
  "semi": true,           // সেমিকোলন প্রয়োজন
  "singleQuote": true,    // একক কোটস ব্যবহার করবে
  "tabWidth": 2,          // ট্যাব সাইজ ২ স্পেস
  "trailingComma": "es5", // ES5 স্টাইলে ট্রেইলিং কমা
  "printWidth": 100,      // লাইন প্রতি সর্বোচ্চ ১০০ অক্ষর
  "bracketSpacing": true  // ব্র্যাকেটের মধ্যে স্পেসিং
}
```

#### VSCode Integration | VSCode ইন্টিগ্রেশন

The `.vscode/settings.json` file configures VSCode to work seamlessly with ESLint and Prettier:

```json
{
  "editor.formatOnSave": true,  // সেভ করার সময় ফরম্যাট করবে
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"  // সেভ করার সময় ESLint ফিক্স করবে
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"  // ডিফল্ট ফরম্যাটার হিসেবে Prettier ব্যবহার করবে
}
```

#### Required VSCode Extensions | প্রয়োজনীয় VSCode এক্সটেনশন

For the best development experience, install these VSCode extensions:

1. **ESLint** by Microsoft
2. **Prettier - Code formatter** by Prettier

#### NPM Scripts | NPM স্ক্রিপ্ট

The following npm scripts are available for linting and formatting:

```bash
# Run ESLint on the entire project
npm run lint

# Run ESLint and fix auto-fixable issues
npm run lint:fix

# Format all files with Prettier
npm run format
```

### Morgan & Streams | মর্গন স্ট্রিম docs

https://www.notion.so/Morgan-1737b9a159e78065b1f1f2602b394a3c?pvs=25

### winston || ওয়াইসনার docs

https://www.notion.so/Winston-1b67b9a159e7806b8748e3779511d7b2?pvs=25

### ESLint এবং Prettier কনফিগারেশন সংরক্ষণ

https://www.notion.so/ESLint-Prettier-1b67b9a159e780ca8862f9dee449f3b6?pvs=25
