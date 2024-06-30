let Categories = [];

const createCategory = (request, response) => {
  try {
    const { name, description } = request.body;
    if (!name || !description)
      throw new Error("Category name or description is required");
    if (Categories.find((category) => category.name === name))
      throw new Error("Category name already exist");
    const newCategory = { id: Categories.length + 1, ...request.body };
    Categories.push(newCategory);
    response.status(201).json({
      status: true,
      message: "Category created",
      category: newCategory,
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
const getCategories = (request, response) => {
  const searchCategory = request.query.search || null;
  let filterCategory;
  try {
    if (searchCategory != null) {
      filterCategory = Categories.filter(
        (category) =>
          category.name.includes(searchCategory) ||
          category.description.includes(searchCategory)
      );
    }
    response.status(200).json({
      status: true,
      message: searchCategory === null ? "All categories" : "search result",
      categories: searchCategory === null ? Categories : filterCategory,
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const getCategory = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("Category ID is required");
    const findCategory = Categories.find((category) => category.id === id);
    if (!findCategory) throw new Error("Category not found");
    response.status(200).json({
      status: true,
      message: "Category found",
      category: findCategory,
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const updateCategory = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("Category ID is required");
    const findCategory = Categories.findIndex((category) => category.id === id);
    if (findCategory === -1) throw new Error("Category not found");
    Categories[findCategory] = { ...Categories[findCategory], ...request.body };
    response.status(200).json({
      status: true,
      message: "Category updated",
      category: Categories[findCategory],
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteCategory = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("Category ID is required");
    const findCategory = Categories.findIndex((category) => category.id === id);
    if (findCategory === -1) throw new Error("Category not found");
    Categories.splice(findCategory, 1);
    response.status(200).json({
      status: true,
      message: "Category deleted",
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
