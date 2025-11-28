import categories from '../data/mockCategoryData.js';


// get all categories
export const getAllCategories = (req, res) => {
  res.json(categories);
};


// add a new category
export const addCategory = (req, res) => {
  const newCategory = req.body;
  newCategory.id = categories.length + 1;
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

// update a category

export const updateCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);
    if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }
    const { name } = req.body;
    categories[categoryIndex].name = name;
    res.json(categories[categoryIndex]);
};

// delete a category

export const deleteCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);   
    if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
    }
    categories.splice(categoryIndex, 1);
    res.json({ message: "Category deleted successfully" });
};
