// import dbUtils from "./dbUtils";
import CustomError from "../utils/customError.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// Get database file path
const dbPath = join(dirname(fileURLToPath(import.meta.url)), "db.json");
// member DB

const memberDb = {
  getAll: async () => {
    try {
      const members = await fs.readFile(dbPath, "utf-8");
      if (!members) {
        throw new CustomError("members not found", 404);
      }
      const memberData = JSON.parse(members);
      return memberData.members;
    } catch (error) {
      throw {
        status: error.status,
        message: error.message,
      };
    }
  },
  getOne: async (id) => {
    try {
      const members = await fs.readFile(dbPath, "utf-8");
      if (!members) {
        throw new CustomError("members not found", 404);
      }

      const memberData = JSON.parse(members);
      const member = memberData.members.find((member) => member.id === id);

      if (!member) {
        throw new CustomError(`member with id ${id} not found`, 404);
      }

      return member;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Member get failed",
      };
    }
  },

  create: async (data) => {
    try {
      const members = await fs.readFile(dbPath, "utf-8");
      const memberData = members ? JSON.parse(members) : { members: [] };

      memberData.members.push(data);

      await fs.writeFile(dbPath, JSON.stringify(memberData, null, 2));

      return data;
    } catch (error) {
      throw new CustomError(
        error.message || "Error creating member in DB",
        500
      );
    }
  },

  update: () => {
    res.json("get all member");
  },
  delete: () => {
    res.json("get all member");
  },
};

export default memberDb;
