let Articles = [];
const createArticle = (request, response) => {
  try {
    const { title, content } = request.body;
    if (!title || !content) throw new Error("All fields are required");
    if (Articles.find((article) => article.title === title))
      throw new Error("Article title already exist");
    const newArticle = { id: Articles.length + 1, ...request.body };
    Articles.push(newArticle);
    response.status(201).json({
      status: true,
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getArticles = (request, response) => {
  const searchArticle = request.query.search || null;
  let filterResults;
  try {
    if (searchArticle != null) {
      filterResults = Articles.filter(
        (article) =>
          article.title.includes(searchArticle) ||
          article.content.includes(searchArticle)
      );
    }
    response.status(200).json({
      status: true,
      message: searchArticle === null ? "All articles" : "Search results",
      articles: searchArticle === null ? Articles : filterResults,
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const getArticle = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    console.log(id);
    if (!id) throw new Error("Article ID is required");
    const findArticle = Articles.find((article) => article.id === id);
    if (!findArticle) throw new Error("Article not found");
    response.status(200).json({
      status: true,
      message: "Article found",
      article: findArticle,
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const updateArticle = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("Article ID is required");
    const findArticle = Articles.findIndex((article) => article.id === id);
    if (findArticle === -1) throw new Error("Article not found");
    Article[findArticle] = { ...Article[findArticle], ...request.body };
    response.status(200).json({
      status: true,
      message: "Article updated",
      article: Article[findArticle],
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteArticle = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("Article ID is required");
    const findArticle = Articles.findIndex((article) => article.id === id);
    if (findArticle === -1) throw new Error("Article not found");
    Articles.splice(findArticle, 1);
    response.status(200).json({
      status: true,
      message: "Article deleted",
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
