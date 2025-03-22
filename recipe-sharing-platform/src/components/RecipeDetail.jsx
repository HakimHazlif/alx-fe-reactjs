import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const recipeApi = async () => {
      try {
        const res = await fetch("src/data.json");
        const data = res.json();

        const selectedRecipe = data.find((recipe) => recipe.id === Number(id));
        setRecipe(selectedRecipe);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    recipeApi();
  }, [id]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="p-6">
          <h2 className="text-4xl font-semibold text-green-700">
            {recipe.title}
          </h2>
          <p className="mt-4 text-lg text-gray-700">{recipe.summary}</p>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            ingredients
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-lg text-gray-700">200g spaghetti</li>
            <li className="text-lg text-gray-700">100g pancetta</li>
            <li className="text-lg text-gray-700">2 eggs</li>
            <li className="text-lg text-gray-700">50g pecorino cheese</li>
            <li className="text-lg text-gray-700">50g parmesan cheese</li>
            <li className="text-lg text-gray-700">Black pepper to taste</li>
          </ul>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Preparation Steps
          </h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li className="text-lg text-gray-700">
              Boil the spaghetti according to package instructions.
            </li>
            <li className="text-lg text-gray-700">
              Cook pancetta in a pan until crispy.
            </li>
            <li className="text-lg text-gray-700">
              Beat eggs and mix with cheese, then add black pepper.
            </li>
            <li className="text-lg text-gray-700">
              Toss the pasta with pancetta and egg mixture.
            </li>
            <li className="text-lg text-gray-700">
              Serve with extra cheese and black pepper.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
