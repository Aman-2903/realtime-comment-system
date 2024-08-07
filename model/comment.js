const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, require: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema, "userComments");

module.exports = Comment;
