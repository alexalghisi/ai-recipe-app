import React from 'react';
import { Heart, Clock, Users, ChefHat, Star } from 'lucide-react';
import './styles/RecipeDetails.css';

export const RecipeDetail = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-detail-overlay">
            <div className="recipe-detail-modal">
                <div className="recipe-detail-image-section">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-detail-image"
                    />
                    <button
                        onClick={onClose}
                        className="recipe-detail-close-button"
                    >
                        <svg className="recipe-detail-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onToggleFavorite(recipe)}
                        className="recipe-detail-favorite-button"
                    >
                        <Heart
                            className={`recipe-detail-heart-icon ${isFavorite ? 'recipe-detail-heart-favorite' : ''}`}
                        />
                    </button>
                </div>

                <div className="recipe-detail-content">
                    <div className="recipe-detail-header">
                        <div>
                            <h2 className="recipe-detail-title">{recipe.title}</h2>
                            <p className="recipe-detail-description">{recipe.description}</p>
                        </div>
                    </div>

                    <div className="recipe-detail-meta">
                        <div className="recipe-detail-meta-item">
                            <Clock className="recipe-detail-meta-icon" />
                            <span className="recipe-detail-meta-text">{recipe.cookTime}</span>
                        </div>
                        <div className="recipe-detail-meta-item">
                            <Users className="recipe-detail-meta-icon" />
                            <span className="recipe-detail-meta-text">{recipe.servings} servings</span>
                        </div>
                        <div className="recipe-detail-meta-item">
                            <ChefHat className="recipe-detail-meta-icon" />
                            <span className="recipe-detail-meta-text">{recipe.difficulty}</span>
                        </div>
                        <div className="recipe-detail-meta-item">
                            <Star className="recipe-detail-star-icon" />
                            <span className="recipe-detail-meta-text">{recipe.rating}</span>
                        </div>
                    </div>

                    <div className="recipe-detail-main">
                        <div className="recipe-detail-section">
                            <h3 className="recipe-detail-section-title">Ingredients</h3>
                            <ul className="recipe-detail-ingredients-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="recipe-detail-ingredient-item">
                                        <div className="recipe-detail-ingredient-bullet"></div>
                                        <span className="recipe-detail-ingredient-text">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="recipe-detail-section">
                            <h3 className="recipe-detail-section-title">Instructions</h3>
                            <ol className="recipe-detail-instructions-list">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index} className="recipe-detail-instruction-item">
                                        <div className="recipe-detail-instruction-number">
                                            {index + 1}
                                        </div>
                                        <p className="recipe-detail-instruction-text">{instruction}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};