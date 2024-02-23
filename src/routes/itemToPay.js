import { Router } from "express";
import {
  createItemToPay,
  getItemsToPay,
  getItemToPayById,
} from "../controllers/itemToPayController";
// import checkRole from "../middleware/checkRole";

const router = Router();

router.post("/createitem", createItemToPay);
router.get("/getitems", getItemsToPay);
router.get("/getitem/:id", getItemToPayById);
export default router;
