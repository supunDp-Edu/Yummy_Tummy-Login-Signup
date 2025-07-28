const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /cart/items - Add item to cart
router.post("/items", async (req, res) => {
  const { users_id, product_id, qty, check, discount } = req.body;
  console.log("Received:", req.body); // Add this line
  try {
    // Check if item already exists in cart for this user
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE users_id = ? AND product_id = ?",
      [users_id, product_id]
    );
    console.log("Existing:", existing); // Add this line
    if (existing.length > 0) {
      // Update quantity and other fields if already exists
      await db.query(
        "UPDATE cart SET qty = qty + ?, `check` = ?, discount = ? WHERE id = ?",
        [qty, check, discount, existing[0].id]
      );
      console.log("Updated cart item"); // Add this line
      return res.json({ message: "Cart item updated" });
    } else {
      // Insert new cart item
      await db.query(
        "INSERT INTO cart (users_id, product_id, qty, `check`, discount) VALUES (?, ?, ?, ?, ?)",
        [users_id, product_id, qty, check, discount]
      );
      console.log("Inserted new cart item"); // Add this line
      return res.json({ message: "Cart item added" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add/update cart item" });
  }
});

// GET /cart/:userId - Get all items in user's cart
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const [items] = await db.query(
      `SELECT c.id, c.product_id, c.qty, c.check, c.discount, p.name AS product_name, p.price AS product_price
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.users_id = ?`,
      [userId]
    );
    res.json({ cartItems: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// PUT /cart/items/:itemId - Update item quantity, check, or discount
router.put("/items/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const { qty, check, discount } = req.body;
  try {
    await db.query(
      "UPDATE cart SET qty = ?, `check` = ?, discount = ? WHERE id = ?",
      [qty, check, discount, itemId]
    );
    res.json({ message: "Cart item updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// DELETE /cart/items/:itemId - Remove item from cart
router.delete("/items/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    await db.query("DELETE FROM cart WHERE id = ?", [itemId]);
    res.json({ message: "Cart item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

module.exports = router;
