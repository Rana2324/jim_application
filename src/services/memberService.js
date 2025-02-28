import memberDb from "../database/memberDb.js";
import CustomError from "../utils/customError.js";

//member Service

const memberService = {
  getAll: async () => {
    try {
      const members = await memberDb.getAll();
      return members;
    } catch (error) {
      throw new CustomError("Failed to retrieve members", error.status || 500);
    }
  },
  getOne: async (memberId) => {
    try {
      const member = await memberDb.getOne(memberId);
      return member;
    } catch (error) {
      throw new CustomError(
        `Failed to retrieve member with id ${memberId}`,
        error.status || 500
      );
    }
  },
  create: async (data) => {
    try {
      const workout = await memberDb.create(data);
    } catch (error) {
      throw new CustomError("Failed to create member", error.status || 500);
    }
  },
  update: async (memberId, data) => {
    try {
      return await memberDb.update(memberId, data);

    } catch (error) {
      throw new CustomError("Failed to update member", error.status || 500);
    }

  },
  delete: async (memberId) => {
    try {
      return await memberDb.delete(memberId);
    } catch (error) {
      throw new CustomError(`Failed to delete member with id ${memberId}`, error.status || 500);
    }
  },
};
export default memberService;
