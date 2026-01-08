/**
 * Category Model
 * Un utilisateur peut avoir plusieurs catégories
 * et une catégorie peut appartenir à plusieurs utilisateurs
 * ➡️ Many-to-Many
 */
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }  // ✅ TRÈS IMPORTANT !
);

export default mongoose.model("Category", categorySchema);