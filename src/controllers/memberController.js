import memberService from "../services/memberService.js";

//member controller
const memberController = {
  getAll: async (req, res, next) => {
    try {
      const members = await memberService.getAll();
      res.json({ ok: true, data: members });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res
          .status(400)
          .json({ ok: false, message: "Invalid member ID" });
      }
      const member = await memberService.getOne(memberId);
      res.json({ ok: true, data: member });
    } catch (error) {
      console.error("Error in getOne:", error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const members = await memberService.create(req.body);
      res.status(201).json({ ok: true, data: members });
    } catch (error) {
      next(error);
    }
  },
  update: (req, res) => {
    res.json("update member");
  },
  delete: (req, res) => {
    res.json("delete member");
  },
};

export default memberController;
