import Category from "../models/Category.js";


// get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// add a new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update a category
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;  
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name });
      res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
    


// delete a category

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
