const errorMiddleware = async (error, req, res, next) => {
  console.log("Error caught:", error);

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    res.status(400).json({
      error: "validation Error",
      messages,
    });
  }

  if (error.code && error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern)[0];
    const duplicateValue = error.keyValue[duplicateField];
    return res.status(409).json({
      error: `Duplicate value for ${duplicateField}: ${duplicateValue}`,
    });
  }

   // Fallback for unhandled errors
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorMiddleware