const User = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
