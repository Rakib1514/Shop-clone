const errorMiddleware = async (error, req, res, next) => {
  console.log("Error caught:", error);

  // Handle Validation Errors (Mongoose ValidationError)
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      error: "Validation Error",
      messages,
    });
  }

  // Handle Duplicate Errors (MongoDB duplicate key error, error code 11000)
  if (error.code && error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern)[0];
    const duplicateValue = error.keyValue[duplicateField];
    return res.status(409).json({
      error: `Duplicate value for ${duplicateField}: ${duplicateValue}`,
    });
  }

  // Handle Cast Errors (Invalid ObjectId or other type casting issues)
  if (error.name === "CastError") {
    return res.status(400).json({
      error: `Invalid ${error.path}: ${error.value}`,
    });
  }

  // Handle Authentication Errors (e.g., invalid credentials)
  if (error.name === "AuthenticationError") {
    return res.status(401).json({
      error: "Authentication failed. Invalid credentials.",
    });
  }

  // Handle Authorization Errors (e.g., user lacks permission)
  if (error.name === "AuthorizationError") {
    return res.status(403).json({
      error: "Access denied. You do not have permission to perform this action.",
    });
  }

  // Handle Internal Server Errors (any unhandled errors)
  console.error(error); // Log the full error for debugging purposes
  return res.status(500).json({
    error: "Internal Server Error. Something went wrong.",
  });
};

module.exports = errorMiddleware;
