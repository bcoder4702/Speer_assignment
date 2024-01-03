const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    note:{
      type: String,
      required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
