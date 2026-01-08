/**
 * Un utilisateur peut avoir plusieurs catégories
et une catégorie peut appartenir à plusieurs utilisateurs
➡️ Many-to-Many
 */

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Category", categorySchema);
