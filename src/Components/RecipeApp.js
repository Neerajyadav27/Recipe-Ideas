import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import RecipeGrid from './RecipeGrid';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import './RecipeApp.css';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'Add_your_own_key';

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=9&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      const formattedRecipes = formatRecipes(data.recipes);
      setRecipes(formattedRecipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=9&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to search recipes');
      }

      const data = await response.json();
      const detailedRecipes = await Promise.all(
        data.results.map(async (recipe) => {
          const detailResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
          );
          return detailResponse.json();
        })
      );

      const formattedRecipes = formatRecipes(detailedRecipes);
      setRecipes(formattedRecipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRecipes = (recipes) =>
    recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      ingredients: recipe.extendedIngredients
        .slice(0, 5)
        .map((ing) => ing.original),
      cookTime: recipe.readyInMinutes,
      difficulty: getDifficulty(recipe.readyInMinutes),
      cuisine: recipe.cuisines[0] || 'Unknown',
      imageUrl: recipe.image,
    }));

  const getDifficulty = (cookTime) => {
    if (cookTime <= 30) return 'Easy';
    if (cookTime <= 60) return 'Medium';
    return 'Hard';
  };

  return (
    <div className="container">
      <Header />
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchRecipes={searchRecipes}
        fetchRandomRecipes={fetchRandomRecipes}
      />
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loading />}
      <RecipeGrid recipes={recipes} />
    </div>
  );
};

export default RecipeApp;
