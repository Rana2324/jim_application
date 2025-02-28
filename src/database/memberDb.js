// import dbUtils from "./dbUtils";
import dbUtils from "./dbUtils.js";
import CustomError from "../utils/customError.js";


// member DB

const memberDb = {
  getAll: async () => {
    try {
      return await dbUtils.read("members");
    } catch (error) {
      throw new CustomError("Failed to retrieve members", error.status || 500);
    }
  },
  getOne: async (id) => {
    try {

      const members = await dbUtils.read("members");
      const member = members.find((member) => member.id === id);

      if (!member) {
        throw new CustomError(`Member with id ${id} not found`, 404);
      }
      return member;
    } catch (error) {
      throw new CustomError("Failed to retrieve member", error.status || 500);
    }
  },

  create: async (data) => {
    try {
      const members = await dbUtils.read("members");
      const newMember = {
        ...data,
        id: dbUtils.createId(),
        createdAt: dbUtils.timestamp()
      };
      members.push(newMember);
      await dbUtils.save("members", members);
      return newMember;
    } catch (error) {
      throw new CustomError("Error creating member in DB", error.status || 500);
    }
  },

  update: async (memberId, data) => {
    try {
      const members = await dbUtils.read("members");
      const index = members.findIndex((member) => member.id === memberId);
      if (index === -1) {
        throw new CustomError(`Member with id ${memberId} not found`, 404);
      }
      members[index] = {
        ...members[index],
        ...data,
        updatedAt: dbUtils.timestamp()
      };
      await dbUtils.save("members", members);
      return members[index];
    } catch (error) {
      throw new CustomError("Error updating member in DB", error.status || 500);
    }
  },
  delete: async (memberId) => {
    try {
      const members = await dbUtils.read("members");
      const index = members.findIndex((member) => member.id === memberId);
      if (index === -1) {
        throw new CustomError(`Member with ID ${memberId} not found`, 404);
      }
      members.splice(index, 1);
      await dbUtils.save("members", members);
      return true;
    } catch (error) {
      throw new CustomError("Error deleting member from DB", 500);
    }
  },

};

export default memberDb;
