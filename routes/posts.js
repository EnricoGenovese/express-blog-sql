import express from "express";
const router = express.Router();

import { index, show, store, update, modify, destroy } from "../controllers/postController.js";

router.get("/", index);

router.get("/:id", show);

router.post("/", store);

router.put("/:id", update);

router.patch("/:id", modify);

router.delete("/:id", destroy);

export default router;