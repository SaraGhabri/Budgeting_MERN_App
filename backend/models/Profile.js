//Un utilisateur possède un seul profile, et un profile appartient à un seul user donc relation 1-to-1

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    financialGoal: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
