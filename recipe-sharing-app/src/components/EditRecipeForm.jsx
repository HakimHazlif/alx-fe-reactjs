const EditRecipeForm = () => {
  const { updateRecipe } = useRecipeStore();
  const [updatedTitle, setUpdatedTitle] = useState(recipe.title);
  const [updatedDescription, setUpdatedDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = { ...recipe, title: updatedTitle, description: updatedDescription };
    updateRecipe(updatedRecipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Recipe title"
      />
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        placeholder="Recipe description"
      />
      <button type="submit">Update Recipe</button>
    </form>
};

export default EditRecipeForm;
