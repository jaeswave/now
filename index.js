require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", require("./routes/usersRoute"));
app.use("/article", require("./routes/articlesRoute"));
app.use("/category", require("./routes/categoriesRoute"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
