import memberService from "../services/memberService.js";

//member controller
const memberController = {
  getAll: async (req, res, next) => {
    try {
      const members = await memberService.getAll();
      res.json({ ok: true, message: "Members fetched successfully", data: members });
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
      res.json({ ok: true, message: "Member fetched successfully", data: member });
    } catch (error) {
      console.error("Error in getOne:", error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const members = await memberService.create(req.body);
      res.status(201).json({ ok: true, message: "Member created successfully", data: members });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res) => {
    try {
      const member = await memberService.update(req.params.memberId, req.body);
      res.json({ ok: true, data: member })
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      await memberService.delete(req.params.memberId);
      res.json({ ok: true, message: "Member deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default memberController;
