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

const getSingleUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ userId: uid }).select("-__v");

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "user found successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update user by uid
const updateUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: uid },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-__v");
    if (!updatedUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getSingleUser, updateUser };
