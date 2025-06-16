import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock, Users, ChefHat, Star, Loader2 } from 'lucide-react';

// Mock AI Recipe API Service
const mockRecipeAPI = {
    searchRecipes: async (description) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const recipes = [
            {
                id: 1,
                title: "Classic Margherita Pizza",
                description: "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
                cookTime: "30 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.7,
                ingredients: [
                    "1 pizza dough ball",
                    "200ml pizza sauce",
                    "200g fresh mozzarella, sliced",
                    "2 large tomatoes, sliced",
                    "Fresh basil leaves",
                    "2 tbsp olive oil",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Preheat oven to 250°C (or highest setting) with pizza stone inside.",
                    "Roll out pizza dough on floured surface to 12-inch circle.",
                    "Spread pizza sauce evenly, leaving 1-inch border for crust.",
                    "Add mozzarella slices and tomato slices.",
                    "Drizzle with olive oil and season with salt and pepper.",
                    "Transfer to hot pizza stone and bake for 10-12 minutes until crust is golden.",
                    "Remove from oven, add fresh basil leaves, and serve immediately."
                ]
            },
            {
                id: 2,
                title: "Thai Green Curry",
                description: "Aromatic coconut curry with vegetables and herbs",
                image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
                cookTime: "30 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.6,
                ingredients: [
                    "2 tbsp green curry paste",
                    "400ml coconut milk",
                    "300g chicken breast, sliced",
                    "1 eggplant, cubed",
                    "100g green beans",
                    "2 tbsp fish sauce",
                    "1 tbsp brown sugar",
                    "Thai basil leaves",
                    "Jasmine rice for serving"
                ],
                instructions: [
                    "Heat 2 tbsp coconut milk in a large pan over medium heat.",
                    "Add curry paste and fry for 2 minutes until fragrant.",
                    "Add chicken and cook until no longer pink.",
                    "Pour in remaining coconut milk and bring to a simmer.",
                    "Add eggplant and green beans, cook for 10 minutes.",
                    "Season with fish sauce and brown sugar.",
                    "Garnish with Thai basil and serve with jasmine rice."
                ]
            },
            {
                id: 3,
                title: "Chocolate Lava Cake",
                description: "Decadent dessert with molten chocolate center",
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
                cookTime: "25 mins",
                servings: 2,
                difficulty: "Hard",
                rating: 4.9,
                ingredients: [
                    "100g dark chocolate, chopped",
                    "100g butter",
                    "2 large eggs",
                    "2 egg yolks",
                    "60g caster sugar",
                    "2 tbsp plain flour",
                    "Butter for ramekins",
                    "Cocoa powder for dusting"
                ],
                instructions: [
                    "Preheat oven to 200°C. Grease ramekins and dust with cocoa.",
                    "Melt chocolate and butter in a double boiler until smooth.",
                    "Whisk eggs, egg yolks, and sugar until thick and pale.",
                    "Fold melted chocolate into egg mixture.",
                    "Sift in flour and fold gently until just combined.",
                    "Divide between ramekins and bake for 12-14 minutes.",
                    "Let stand for 1 minute, then turn out onto plates and serve immediately."
                ]
            }
        ];

        // Simple keyword matching
        const keywords = description.toLowerCase();
        if (keywords.includes('pizza') || keywords.includes('italian')) {
            return [recipes[0], ...recipes.slice(1)];
        } else if (keywords.includes('curry') || keywords.includes('thai')) {
            return [recipes[1], ...recipes.filter(r => r.id !== 2)];
        } else if (keywords.includes('dessert') || keywords.includes('chocolate')) {
            return [recipes[2], ...recipes.filter(r => r.id !== 3)];
        }

        return recipes;
    }
};

// Custom hook for managing favorites
const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('recipe-favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const addToFavorites = (recipe) => {
        const updated = [...favorites, recipe];
        setFavorites(updated);
        localStorage.setItem('recipe-favorites', JSON.stringify(updated));
    };

    const removeFromFavorites = (recipeId) => {
        const updated = favorites.filter(r => r.id !== recipeId);
        setFavorites(updated);
        localStorage.setItem('recipe-favorites', JSON.stringify(updated));
    };

    const isFavorite = (recipeId) => {
        return favorites.some(r => r.id === recipeId);
    };

    return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};

// Recipe Card Component
const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="relative" onClick={() => onSelect(recipe)}>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                >
                    <Heart
                        className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                    }`}>
                        {recipe.difficulty}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecipeFinderApp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const results = await mockRecipeAPI.searchRecipes(searchQuery);
            setRecipes(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleFavorite = (recipe) => {
        if (isFavorite(recipe.id)) {
            removeFromFavorites(recipe.id);
        } else {
            addToFavorites(recipe);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const displayedRecipes = activeTab === 'search' ? recipes : favorites;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <ChefHat className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">AI Recipe Finder</h1>
                        </div>

                        <nav className="flex items-center gap-1">
                            <button
                                onClick={() => setActiveTab('search')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    activeTab === 'search'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Search
                            </button>
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                                    activeTab === 'favorites'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Heart className="w-4 h-4" />
                                Favorites ({favorites.length})
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'search' && (
                    <div className="mb-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                What would you like to cook today?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Describe what you're craving and let our AI find the perfect recipes for you.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Describe what you want to eat..."
                                    className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading || !searchQuery.trim()}
                                    className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Search className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Favorite Recipes</h2>
                        <p className="text-gray-600">
                            {favorites.length === 0
                                ? "You haven't saved any recipes yet. Search for recipes and add them to your favorites!"
                                : `You have ${favorites.length} favorite recipe${favorites.length !== 1 ? 's' : ''}.`
                            }
                        </p>
                    </div>
                )}

                {/* Recipe Grid */}
                {displayedRecipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onSelect={setSelectedRecipe}
                                isFavorite={isFavorite(recipe.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                )}

                {/* Empty States */}
                {activeTab === 'search' && recipes.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to find recipes</h3>
                        <p className="text-gray-600">Enter a description above to get started with AI-powered recipe search.</p>
                    </div>
                )}

                {activeTab === 'favorites' && favorites.length === 0 && (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                        <p className="text-gray-600 mb-4">Start exploring recipes and save your favorites!</p>
                        <button
                            onClick={() => setActiveTab('search')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Search Recipes
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-12">
                        <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding recipes for you...</h3>
                        <p className="text-gray-600">Our AI is searching for the perfect recipes based on your description.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecipeFinderApp;