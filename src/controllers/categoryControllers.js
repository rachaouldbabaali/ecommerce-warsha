// Category Controllers
// These functions handle all category-related requests

import categories from "../data/mockCategoryData.js";

// 1. GET ALL CATEGORIES
export const getAllCategories = (req, res) => {
  res.json({
    success: true,
    data: categories,
  });
};

// 2. ADD A NEW CATEGORY
export const addCategory = (req, res, next) => {
  const newCategory = req.body;

  // Validation: Check if name exists
  if (!newCategory.name) {
    const err = new Error("Category name is required");
    err.statusCode = 400;
    return next(err);
  }

  // Set category ID
  newCategory.id = categories.length + 1;

  // Add to categories array
  categories.push(newCategory);

  res.status(201).json({
    success: true,
    message: "Category added successfully",
    data: newCategory,
  });
};

// 3. UPDATE A CATEGORY
export const updateCategory = (req, res, next) => {
  const categoryId = parseInt(req.params.id);

  // Find the category index
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);

  if (categoryIndex === -1) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    return next(err);
  }

  const { name } = req.body;

  // Validation: Check if name is provided
  if (!name) {
    const err = new Error("Category name is required");
    err.statusCode = 400;
    return next(err);
  }

  // Update the category
  categories[categoryIndex].name = name;

  res.json({
    success: true,
    message: "Category updated successfully",
    data: categories[categoryIndex],
  });
};

// 4. DELETE A CATEGORY
export const deleteCategory = (req, res, next) => {
  const categoryId = parseInt(req.params.id);

  // Find the category index
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);

  if (categoryIndex === -1) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    return next(err);
  }

  // Remove the category from array
  categories.splice(categoryIndex, 1);

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
};
