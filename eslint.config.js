import eslint from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.js'], // এই কনফিগারেশনটি শুধুমাত্র JavaScript ফাইলের জন্য প্রযোজ্য
    ignores: [
      'node_modules/**', // node_modules ফোল্ডারটিকে উপেক্ষা করবে
      'dist/**', // dist ফোল্ডারটিকে উপেক্ষা করবে
      'build/**', // build ফোল্ডারটিকে উপেক্ষা করবে
      'public/**', // public ফোল্ডারটিকে উপেক্ষা করবে
      'coverage/**', // coverage ফোল্ডারটিকে উপেক্ষা করবে
      '.env', // .env ফাইলটিকে উপেক্ষা করবে
      '.env.*', // .env.local, .env.production ইত্যাদি ফাইলগুলো উপেক্ষা করবে
      '*.log', // log ফাইলগুলো উপেক্ষা করবে
    ],
    languageOptions: {
      ecmaVersion: 'latest', // সর্বশেষ ECMAScript সংস্করণ ব্যবহার করবে
      sourceType: 'module', // ES মডিউল ব্যবহারের অনুমতি দেবে
    },
    plugins: {
      prettier: prettierPlugin, // Prettier কে ESLint এর সাথে ইন্টিগ্রেট করবে
    },
    rules: {
      'no-console': 'warn', // console স্টেটমেন্ট ব্যবহার হলে সতর্ক করবে
      'no-unused-vars': 'warn', // অব্যবহৃত ভেরিয়েবলগুলোর জন্য সতর্ক করবে
      'prettier/prettier': 'error', // যদি Prettier এর নিয়ম লঙ্ঘন হয় তবে ত্রুটি দেখাবে
      'prefer-const': 'error', // যদি কোনো ভেরিয়েবল কখনো পুনঃআবৃত্তি না হয় তবে const ব্যবহার করার জন্য চাপ দেবে
      'no-var': 'error', // var ব্যবহার নিষিদ্ধ করবে
      eqeqeq: ['error', 'always'], // সর্বদা কঠোর সমতা (=== এবং !==) ব্যবহার করতে বলবে
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // একাধিক খালি লাইন ব্যবহার নিষিদ্ধ করবে
      quotes: ['error', 'single', { avoidEscape: true }], // একক কোটস ব্যবহার করতে বলবে
      semi: ['error', 'always'], // সব স্টেটমেন্টে সেমিকোলন প্রয়োজন
    },
  },
];
