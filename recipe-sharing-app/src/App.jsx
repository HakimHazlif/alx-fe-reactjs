// App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import { useRecipeStore } from "./recipeStore";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        {/* Other Routes */}
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
