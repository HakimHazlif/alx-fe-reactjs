import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = () => {
  const { deleteRecipe } = useRecipeStore();

  const handleDelete = () => {
    deleteRecipe(recipeId);
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
};

export default DeleteRecipeButton;
