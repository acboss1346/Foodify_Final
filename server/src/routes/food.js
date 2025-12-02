import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET All food items
router.get("/", async (req, res) => {
  const foods = await prisma.foodItem.findMany();
  res.json(foods);
});

// GET single food item
router.get("/:id", async (req, res) => {
  const food = await prisma.foodItem.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!food) return res.status(404).json({ message: "Not found" });
  res.json(food);
});

// ADD food (Admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { name, price, imageUrl, category } = req.body;

  const item = await prisma.foodItem.create({
    data: { name, price, imageUrl, category },
  });

  res.status(201).json(item);
});

// UPDATE food (Admin)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const { name, price, imageUrl, category } = req.body;

  const updated = await prisma.foodItem.update({
    where: { id: Number(req.params.id) },
    data: { name, price, imageUrl, category },
  });

  res.json(updated);
});

// DELETE food (Admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 1. Remove from all carts first (Safe to do)
    await prisma.cart.deleteMany({ where: { foodId: id } });

    // 2. Try to delete the food item
    await prisma.foodItem.delete({
      where: { id },
    });

    res.json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    // Prisma P2003 = Foreign key constraint failed
    if (error.code === 'P2003') {
      return res.status(400).json({ message: "Cannot delete: This item is part of past orders." });
    }
    res.status(500).json({ message: "Server error during deletion" });
  }
});

export default router;