const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "businessOwner", "user"],
    default: "user",
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
    required: function () {
      return this.role === "businessOwner" && !!this.businessId;
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
