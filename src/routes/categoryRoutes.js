import express from "express";
import { getAllCategories , addCategory, updateCategory , deleteCategory } from "../controllers/categoryControllers.js";

const router = express.Router();
router.get("/", getAllCategories); // localhost:5000/api/categories

router.post("/", addCategory); // localhost:5000/api/categories 
router.put("/:id", updateCategory); // localhost:5000/api/categories/:id
router.delete("/:id", deleteCategory); // localhost:5000/api/categories/:id

export default router;