import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuid } from 'uuid';

// Get database file path
const dbPath = join(dirname(fileURLToPath(import.meta.url)), 'db.json');

// Core database utilities
const DbUtils = {
    // Generate unique ID
    createId: () => uuid(),

    // Read database file
    read: async () => {
        try {
            const data = await fs.readFile(dbPath, 'utf-8');
            return JSON.parse(data).workouts || [];
        } catch (error) {
            console.log(' Read error:', error.message);
            return [];
        }
    },

    // Save to database file
    save: async (workouts) => {
        try {
            const data = { workouts: workouts || [] };
            await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.log(' Save error:', error.message);
            return false;
        }
    },

    // Get current timestamp
    timestamp: () => new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
};

export default DbUtils;



