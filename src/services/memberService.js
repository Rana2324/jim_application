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
      return workout;
    } catch (error) {
      throw new CustomError("Failed to create workout", error.status || 500);
    }
  },
  update: () => {
    res.json("get all member");
  },
  delete: () => {
    res.json("get all member");
  },
};
export default memberService;
