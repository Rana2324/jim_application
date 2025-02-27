import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { v4 as uuid } from "uuid";
import CustomError from "../utils/customError.js"; // Importing the CustomError class

// Get database file path
const dbPath = join(dirname(fileURLToPath(import.meta.url)), "db.json");

// Core database utilities
const dbUtils = {
  // Generate unique ID
  createId: () => uuid(),

  // Read database file
  read: async () => {
    try {
      const data = await fs.readFile(dbPath, "utf-8");

      // Handle empty or invalid data
      if (!data.trim()) {
        console.warn("Database file is empty");
        return [];
      }

      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData.workouts)) {
        throw new CustomError(
          'Invalid database format: "workouts" must be an array',
          500
        );
      }

      return parsedData.workouts;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // If it's already a CustomError, rethrow it
      }

      console.error("Error reading database:", error.message);
      throw new CustomError(
        "Failed to read database. Please try again later.",
        500
      );
    }
  },

  // Save to database file
  save: async (workouts) => {
    try {
      // if (!Array.isArray(workouts)) {
      //     throw new CustomError('Invalid data: Workouts must be an array', 400);
      // }

      const data = { workouts };
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2));

      return true;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error; // If it's already a CustomError, rethrow it
      }

      console.error("Error saving database:", error.message);
      throw new CustomError(
        "Failed to save database. Please try again later.",
        500
      );
    }
  },

  // Get current timestamp
  timestamp: () =>
    new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
};

export default dbUtils;
