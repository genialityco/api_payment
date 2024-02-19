import { Router } from "express";
import { createMembership, getMemberships } from "../controllers/membershipController";
import checkRole from "../middleware/checkRole";

const router = Router();

router.post("/createmembership", checkRole(["admin"]), createMembership);
router.get("/getmemberships", getMemberships);
export default router;
