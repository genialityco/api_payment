import { Router } from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponController";
import checkRole from "../middleware/checkRole";

const router = Router();

router.post("/createcoupon", checkRole(["admin"]), createCoupon);
router.get("/getcoupons", checkRole(["admin"]), getCoupons);
router.get("/getcoupon/:id", checkRole(["admin"]), getCouponById);
router.put("/updatecoupon/:id", checkRole(["admin"]), updateCoupon);
router.delete("/deletecoupon/:id", checkRole(["admin"]), deleteCoupon);

export default router;
