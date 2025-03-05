import recordService from "../services/recordService.js";

// member controller
const recordController = {
    getAll: async (req, res, next) => {
        try {
            const records = await recordService.getAll();
            if (!records || records.length === 0) {
                return res.status(404).json({
                    ok: false,
                    message: "No records found",
                });
            }
            res.json({
                ok: true,
                message: "Records fetched successfully",
                data: members,
            });
        } catch (error) {
            console.error("Error in getAll:", error);
            res.status(500).json({
                ok: false,
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    },

    getOne: async (req, res, next) => {
        try {
            const { recordId } = req.params;
            if (!recordId) {
                return res.status(400).json({
                    ok: false,
                    message: "Record ID is required",
                });
            }

            const record = await recordService.getOne(recordId);
            if (!record) {
                return res.status(404).json({
                    ok: false,
                    message: "Record not found",
                });
            }

            res.json({
                ok: true,
                message: "Record fetched successfully",
                data: member,
            });
        } catch (error) {
            console.error("Error in getOne:", error);
            res.status(500).json({
                ok: false,
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    },

    create: async (req, res, next) => {
        try {
          if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
              ok: false,
              message: "Request body cannot be empty",
            });
          }
    
          const newRecord = await recordService.create(req.body);
          res.status(201).json({
            ok: true,
            message: "Record created successfully",
            data: newRecord,
          });
        } catch (error) {
          console.error("Error in create:", error);
          res.status(500).json({
            ok: false,
            message: "An unexpected error occurred",
            error: error.message,
          });
        }
      },
    update: async (req, res, next) => {
        try {
            const { recordId } = req.params;
            if (!recordId) {
                return res.status(400).json({
                    ok: false,
                    message: "Record ID is required",
                });
            }

            const updatedRecord = await recordService.update(recordId, req.body);
            if (!updatedRecord) {
                return res.status(404).json({
                    ok: false,
                    message: "Record not found",
                });
            }

            res.json({
                ok: true,
                message: "Record updated successfully",
                data: updatedMember,
            });
        } catch (error) {
            console.error("Error in update:", error);
            res.status(500).json({
                ok: false,
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    },

    delete: async (req, res, next) => {
        try {
            const { recordId } = req.params;
            if (!recordId) {
                return res.status(400).json({
                    ok: false,
                    message: "Record ID is required",
                });
            }

            const deletedRecord = await recordService.delete(recordId);
            if (!deletedRecord) {
                return res.status(404).json({
                    ok: false,
                    message: "Record not found",
                });
            }

            res.json({
                ok: true,
                message: "Record deleted successfully",
            });
        } catch (error) {
            console.error("Error in delete:", error);
            res.status(500).json({
                ok: false,
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    },
};

export default recordController;
