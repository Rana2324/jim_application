import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuid } from 'uuid';

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate a unique id for each workout
export function generateId() {
    return uuid();
}

// Function to read JSON data from a file
export async function readDbData() {
    try {
        const dbPath = join(__dirname, 'db.json');
        const DbData = await fs.readFile(dbPath, 'utf-8');
        const parseDbData = JSON.parse(DbData);
        return parseDbData.workouts;
    } catch (error) {
        console.error("Error reading database:", error);
        throw error;
    }
}

// Function to write JSON data to the file
export async function writeDbData(data) {
    try {
        const dbPath = join(__dirname, 'db.json');
        const existingData = await fs.readFile(dbPath, 'utf-8');
        const parseData = JSON.parse(existingData);
        parseData.workouts = data;

        await fs.writeFile(dbPath, JSON.stringify(parseData, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing to database:", error);
        throw error;
    }
}

// Validate workout data
export const validateWorkoutData = ({ name, mode, equipment, exercises, trainerTips }) => {
    if (!name?.trim()) throw new Error('Please provide a valid workout name.');
    if (!mode?.trim()) throw new Error('Please provide a valid workout mode.');
    if (!Array.isArray(equipment) || equipment.some(item => !item.trim())) throw new Error('Please provide a valid list of equipment.');
    if (!Array.isArray(exercises) || exercises.some(item => !item.trim())) throw new Error('Please provide a valid list of exercises.');
    if (!Array.isArray(trainerTips) || trainerTips.some(item => !item.trim())) throw new Error('Please provide valid trainer tips.');
}



