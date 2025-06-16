import React from 'react';
import { Heart, Clock, Users, ChefHat, Star } from 'lucide-react';

export const RecipeDetail = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
    if (!recipe) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="relative">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onToggleFavorite(recipe)}
                        className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                        <Heart
                            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)] md:max-h-[calc(90vh-20rem)]">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
                            <p className="text-gray-600 mb-4">{recipe.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{recipe.cookTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{recipe.servings} servings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ChefHat className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{recipe.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{recipe.rating}</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                            <ol className="space-y-4">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index} className="flex gap-4">
                                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
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