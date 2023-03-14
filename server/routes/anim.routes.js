import { Router } from "express";

import {
  getAnims,
  getAnim,
  createAnim,
  updateAnim,
  deleteAnim,
} from "../controllers/anims.controllers.js";

const router = Router();

router.get("/anims", getAnims);

router.get("/anims/:id", getAnim);

router.post("/anims", createAnim);

router.put("/anims/:id", updateAnim);

router.delete("/anims/:id", deleteAnim);

export default router;
