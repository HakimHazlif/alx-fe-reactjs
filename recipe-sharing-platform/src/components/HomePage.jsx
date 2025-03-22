import { useEffect } from "react";
import { useState } from "react";
import RecipeCard from "./RecipeCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
