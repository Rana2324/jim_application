import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { v4 as uuid } from "uuid";
import CustomError from "../utils/customError.js";

// Get database file path
const dbPath = join(dirname(fileURLToPath(import.meta.url)), "db.json");

// Core database utilities
const dbUtils = {
  // Generate unique ID
  createId: () => uuid(),

  // Read database file
  read: async (dataType) => {
    try {
      const data = await fs.readFile(dbPath, "utf-8");

      // Handle empty or invalid data
      if (!data.trim()) {
        console.warn("Database file is empty");
        return [];
      }

      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData[dataType])) {
        throw new CustomError(
          `Invalid database format: "${dataType}" must be an array`,
          500
        );
      }

      return parsedData[dataType];
    } catch (error) {
      throw new CustomError(
        "Failed to read database. Please try again later.",
        500
      );
    }
  },

  // Save to database file
  save: async (dataType, data) => {
    try {
      const currentData = await dbUtils.read(dataType);
      const newData = { ...currentData, [dataType]: data };
      await fs.writeFile(dbPath, JSON.stringify(newData, null, 2));

      return true;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
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
