import React from 'react';
import { Timer, Utensils } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
    <div className="recipe-content">
      <h2 className="recipe-title">{recipe.name}</h2>
      <div className="recipe-meta">
        <div className="recipe-time">
          <Timer className="meta-icon" size={20} />
          <span>{recipe.cookTime} mins</span>
        </div>
        <div className="recipe-difficulty">
          <Utensils className="meta-icon" size={20} />
          <span>{recipe.difficulty}</span>
        </div>
      </div>
      <div className="recipe-ingredients">
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default RecipeCard;
