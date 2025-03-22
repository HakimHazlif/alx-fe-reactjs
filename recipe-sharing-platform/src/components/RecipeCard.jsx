const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-green-600 text-white transition transform hover:scale-105 hover:shadow-2xl">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-semibold text-amber-400">
          {recipe.title}
        </h2>

        <p className="mt-2 text-lg text-amber-200">{recipe.summary}</p>

        <button className="mt-4 px-4 py-2 bg-amber-200 text-green-700 font-bold rounded-full hover:bg-amber-300 transition">
          Read Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
