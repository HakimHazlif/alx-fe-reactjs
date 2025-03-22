import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!title || !ingredients || !steps) {
      setErrors("All fields are required!");
      return false;
    }

    const ingredientsArray = ingredients.split("\n");
    if (ingredientsArray.length < 2) {
      setErrors("Ingredients must have at least two items.");
      return false;
    }

    setErrors("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const newRecipe = {
      title,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    console.log("New Recipe:", newRecipe);

    setIsSubmitting(false);
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Add New Recipe
      </h2>

      <form onSubmit={handleSubmit}>
        {errors && <p className="text-red-500 mb-4">{errors}</p>}

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 font-medium mb-2"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="5"
            placeholder="List ingredients, one per line"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="steps"
            className="block text-gray-700 font-medium mb-2"
          >
            Preparation Steps
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="5"
            placeholder="List steps, one per line"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 ${
            isSubmitting ? "bg-gray-400" : "bg-green-700"
          } text-white font-semibold rounded-lg hover:bg-green-600`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
