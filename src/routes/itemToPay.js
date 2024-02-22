import { Router } from "express";
import { createItemToPay, getItemsToPay } from "../controllers/itemToPayController";
// import checkRole from "../middleware/checkRole";

const router = Router();

router.post("/createitem", createItemToPay);
router.get("/getitems", getItemsToPay);
export default router;
