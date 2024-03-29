import { Router } from "express";
import {
  createItemToPay,
  getItemsToPay,
  getItemToPayById,
  updateItemToPay,
  deleteItemToPay
} from "../controllers/itemToPayController";
// import checkRole from "../middleware/checkRole";

const router = Router();

router.post("/createitem", createItemToPay);
router.get("/getitems", getItemsToPay);
router.get("/getitem/:id", getItemToPayById);
router.put("/updateitem/:id", updateItemToPay);
router.delete("/deleteitem/:id", deleteItemToPay);
export default router;
