const express = require("express");
const businessController = require("../controllers/business.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const { isBusinessOwner, isAdmin } = require("../middlewares/role.middleware");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  isBusinessOwner,
  businessController.createBusiness
);

router.get("/", businessController.getAllBusinesses);

router.get("/:id", businessController.getBusinessById);

router.put(
  "/:id",
  authenticateToken,
  async (req, res, next) => {
    if (req.userRole === "businessOwner" || req.userRole === "admin") {
      next();
    } else {
      res
        .status(403)
        .send({ message: "Requires business owner or admin role" });
    }
  },
  businessController.updateBusiness
);


router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  businessController.deleteBusiness
);

module.exports = router;
