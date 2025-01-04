import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  measurement: { type: String, required: true }, // Ensure this matches the migration field
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  tags: { type: [String], required: false }, // Matches the "tags" field
  time: {
    prep: { type: Number, required: false },
    cook: { type: Number, required: false },
    total: { type: Number, required: false },
  }, // Matches the "time" object
  difficulty: { type: String, required: false },
  servings: { type: Number, required: false },
  ingredients: [ingredientSchema],
  nutritional_values: {
    calories: { type: Number, required: false },
    fat: { type: Number, required: false },
    saturated_fat: { type: Number, required: false },
    carbohydrates: { type: Number, required: false },
    sugar: { type: Number, required: false },
    fiber: { type: Number, required: false },
    protein: { type: Number, required: false },
    cholesterol: { type: Number, required: false },
    sodium: { type: Number, required: false },
  }, // Matches the "nutritional_values" object
  utensils: { type: [String], required: false }, // Matches the "utensils" array
  instructions: { type: [String], required: true }, // Matches the "instructions" array
});

recipeSchema.index({ title: 1 }); // To optimize sorting by title
recipeSchema.index({ tags: 1 }); // To optimize filtering by tags
recipeSchema.index({ difficulty: 1 }); // For difficulty filtering

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.init().then(() => {
  console.log("Indexes created successfully");
});

export default Recipe;