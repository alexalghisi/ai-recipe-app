import React, { useState, useEffect } from 'react';
import { Search, Heart, ChefHat, Loader2 } from 'lucide-react';
import { RecipeCard, RecipeDetail } from './components';
import { useFavorites } from './hooks';
import { recipeAPI } from './services'; // Changed this line

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const [apiStatus, setApiStatus] = useState(''); // New state for API status
    const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    // Load popular recipes on initial mount
    useEffect(() => {
        const loadPopularRecipes = async () => {
            setIsLoading(true);
            try {
                const popularRecipes = await recipeAPI.searchRecipes('popular recipes');
                setRecipes(popularRecipes);
                setApiStatus('✅ API Ready');
            } catch (error) {
                console.error('Failed to load popular recipes:', error);
                setApiStatus('❌ API Error');
            } finally {
                setIsLoading(false);
            }
        };
        loadPopularRecipes();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            const popularRecipes = await recipeAPI.searchRecipes('popular recipes');
            setRecipes(popularRecipes);
            return;
        }

        setIsLoading(true);
        setApiStatus('🤖 AI Thinking...');

        try {
            const results = await recipeAPI.searchRecipes(searchQuery);
            setRecipes(results);
            setApiStatus(`✅ Found ${results.length} recipes`);
        } catch (error) {
            console.error('Error searching recipes:', error);
            setApiStatus('❌ Search failed');
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
                            {/* API Status Indicator */}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {apiStatus}
              </span>
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
                            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                                🤖 Powered by ChatGPT AI - Describe what you're craving and get personalized recipes generated just for you!
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm">
                                <span className="text-gray-500">Try:</span>
                                {[
                                    'pizza margherita',
                                    'healthy breakfast',
                                    'quick dinner',
                                    'chocolate dessert',
                                    'asian stir fry',
                                    'vegetarian pasta'
                                ].map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSearchQuery(suggestion)}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                    >
                                        "{suggestion}"
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Describe what you want to eat... (e.g., 'spicy Mexican tacos' or 'healthy breakfast bowl')"
                                    className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading}
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
                    <>
                        {activeTab === 'search' && !searchQuery && (
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">AI Generated Recipes</h3>
                                <p className="text-gray-600">Discover recipes created by AI, or search above for something specific.</p>
                            </div>
                        )}
                        {activeTab === 'search' && searchQuery && (
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">AI Search Results</h3>
                                <p className="text-gray-600">Found {displayedRecipes.length} AI-generated recipe{displayedRecipes.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                            </div>
                        )}
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
                    </>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is creating recipes for you...</h3>
                        <p className="text-gray-600">ChatGPT is analyzing your request and generating personalized recipes.</p>
                    </div>
                )}

                {/* Empty States */}
                {activeTab === 'search' && recipes.length === 0 && !isLoading && searchQuery && (
                    <div className="text-center py-12">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
                        <p className="text-gray-600">Try a different search term or browse our AI-generated recipes above.</p>
                    </div>
                )}

                {activeTab === 'favorites' && favorites.length === 0 && (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                        <p className="text-gray-600 mb-4">Start exploring AI-generated recipes and save your favorites!</p>
                        <button
                            onClick={() => setActiveTab('search')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Discover Recipes
                        </button>
                    </div>
                )}
            </main>

            {/* Recipe Detail Modal */}
            {selectedRecipe && (
                <RecipeDetail
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                    isFavorite={isFavorite(selectedRecipe.id)}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
        </div>
    );
};

export default App;