import React from 'react';
import { Heart, Clock, Users, Star } from 'lucide-react';
import './styles/RecipeCard.css';

export const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
    return (
        <div className="recipe-card">
            <div className="recipe-card-image-container" onClick={() => onSelect(recipe)}>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-card-image"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe);
                    }}
                    className="recipe-card-favorite-button"
                >
                    <Heart
                        className={`recipe-card-heart-icon ${isFavorite ? 'recipe-card-heart-favorite' : ''}`}
                    />
                </button>
                <div className="recipe-card-rating-badge">
                    <Star className="recipe-card-star-icon" />
                    <span className="recipe-card-rating-text">{recipe.rating}</span>
                </div>
            </div>

            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <p className="recipe-card-description">{recipe.description}</p>

                <div className="recipe-card-footer">
                    <div className="recipe-card-info-item">
                        <Clock className="recipe-card-info-icon" />
                        <span>{recipe.cookTime}</span>
                    </div>
                    <div className="recipe-card-info-item">
                        <Users className="recipe-card-info-icon" />
                        <span>{recipe.servings} servings</span>
                    </div>
                    <div className={`recipe-card-difficulty ${recipe.difficulty.toLowerCase()}`}>
                        {recipe.difficulty}
                    </div>
                </div>
            </div>
        </div>
    );
};
