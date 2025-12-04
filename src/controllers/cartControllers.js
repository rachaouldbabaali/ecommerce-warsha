import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: "default" }).populate(
      "items.productId"
    );
    if (!cart) {
      const cart = new Cart({ sessionId: "default", items: [], totalPrice: 0 });
      await cart.save();
      return res.json(cart);
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// add item to cart
export const addItemToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity are required" });
    }

    const cart = await Cart.findOne({ sessionId: "default" });

    if (!cart) {
      new Cart({ sessionId: "default", items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    console.log("existingItem index:", existingItem);

    if (quantity > product.quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    if (existingItem > -1) {
      cart.items[existingItem].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
      });
    }
    cart.totalPrice += product.price * quantity;
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
