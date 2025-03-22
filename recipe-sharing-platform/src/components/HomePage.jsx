import { useEffect } from "react";
import { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log("start");
    const recipesApi = async () => {
      try {
        const res = await fetch("src/data.json");
        const data = await res.json();
        console.log(data);
        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };

    recipesApi();
    console.log("end");
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Recipe Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-green-700 text-white transition transform hover:scale-105 hover:shadow-2xl hover:rounded-xl"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-amber-200">
                {recipe.title}
              </h2>
              <p className="mt-2 text-lg text-amber-200">{recipe.summary}</p>
              <Link
                to={`/recipe/${recipe.id}`}
                className="mt-4 px-4 py-2 bg-amber-200 text-green-700 font-bold rounded-full hover:bg-amber-300 transition"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
