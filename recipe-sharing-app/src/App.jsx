// App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import AddRecipeForm from "./components/AddRecipeForm";
import { useRecipeStore } from "./recipeStore";
import RecommendationsList from "./components/RecommendationsList";
import FavoritesList from "./components/FavoritesList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        <Route path="add-recipe" element={<AddRecipeForm />} />
        <Route path="favorites-list" element={<FavoritesList />} />
        <Route path="recommedations-list" element={<RecommendationsList />} />
      </Routes>
    </Router>
  );
};

const RecipeDetailsWrapper = () => {
  const { recipes } = useRecipeStore();
  const { recipeId } = useParams();
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) return <div>Recipe not found</div>;

  return <RecipeDetails recipeId={recipeId} />;
};

export default App;
