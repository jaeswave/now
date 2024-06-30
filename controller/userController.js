const User = [];

const createUser = (request, response) => {
  const { firstName, lastName, email, phoneNo } = request.body;
  try {
    if (!firstName || !lastName || !email || !phoneNo)
      throw new Error("All fields are required");
    if (User.find((user) => user.email === email && user.phoneNo === phoneNo))
      throw new Error("User already exists");
    const newUser = { id: User.length + 1, ...request.body };
    User.push(newUser);
    response.status(201).json({
      status: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getUser = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("User ID is required");
    const findUser = User.findIndex((user) => user.id === id);
    if (findUser === -1) throw new Error("User not found");
    response.status(200).json({
      status: true,
      message: "User found successfully",
      user: User[findUser],
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

const updateUser = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("User ID is required");
    const findUser = User.findIndex((user) => user.id === id);
    if (findUser === -1) throw new Error("User not found");
    User[findUser] = { ...User[findUser], ...request.body };
    response.status(200).json({
      status: true,
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    response.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteUser = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (!id) throw new Error("User ID is required");
    const findUser = User.findIndex((user) => user.id === id);
    if (findUser === -1) throw new Error("User not found");
    User.splice(findUser, 1);
    response.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    response.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
