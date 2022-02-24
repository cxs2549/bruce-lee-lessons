const mongoose = require("mongoose")

const classSchema = mongoose.Schema(
  {
    session: {
      type: String,
      required: [true, "Session is required"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Class", classSchema)
