import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeGrid.css';

const RecipeGrid = ({ recipes }) => (
  <div className="recipes-grid">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
  </div>
);

export default RecipeGrid;
