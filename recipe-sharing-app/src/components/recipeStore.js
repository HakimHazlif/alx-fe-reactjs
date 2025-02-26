import create from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),
}));

export { useRecipeStore };
