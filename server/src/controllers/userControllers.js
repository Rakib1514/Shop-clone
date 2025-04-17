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

// Get all users (with custom errors)
const getUsers = async (req, res, next) => {
  try {
    // --- Authentication check ---
    // if (!req.user) {
    //   const err = new Error("You must be signed in to view users.");
    //   err.name = "AuthenticationError";
    //   throw err;
    // }

    // --- Authorization check (only admins) ---
    // if (req.user.role !== "admin") {
    //   const err = new Error("You do not have permission to view all users.");
    //   err.name = "AuthorizationError";
    //   throw err;
    // }

    // --- Optional: filter by query param `id` ---
    if (req.query.id) {
      // invalid ObjectId?
      if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        const err = new Error(`Invalid user ID format: ${req.query.id}`);
        err.name = "CastError";
        throw err;
      }
      const single = await User.findById(req.query.id);
      if (!single) {
        const err = new Error("User not found");
        err.name = "NotFoundError";
        throw err;
      }
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: single,
      });
    }

    // --- default: fetch all users ---
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUsers };
