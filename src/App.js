import React, { useState, useEffect } from 'react';
import { Search, Heart, ChefHat, Loader2 } from 'lucide-react';
import { RecipeCard, RecipeDetail } from './components';
import { useFavorites } from './hooks';
import { recipeAPI } from './services';
import './styles/App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const [apiStatus, setApiStatus] = useState('');
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
        <div className="app-container">
            {/* Header */}
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo-section">
                            <ChefHat className="logo-icon" />
                            <h1 className="app-title">AI Recipe Finder</h1>
                            <span className="api-status">
                                {apiStatus}
                            </span>
                        </div>

                        <nav className="nav-section">
                            <button
                                onClick={() => setActiveTab('search')}
                                className={`nav-button ${activeTab === 'search' ? 'nav-button-active' : ''}`}
                            >
                                Search
                            </button>
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`nav-button ${activeTab === 'favorites' ? 'nav-button-active' : ''}`}
                            >
                                <Heart className="nav-heart-icon" />
                                Favorites ({favorites.length})
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {activeTab === 'search' && (
                    <div className="search-section">
                        <div className="search-intro">
                            <h2 className="search-title">
                                What would you like to cook today?
                            </h2>
                            <p className="search-description">
                                🤖 Powered by ChatGPT AI - Describe what you're craving and get personalized recipes generated just for you!
                            </p>
                            <div className="search-suggestions">
                                <span className="suggestions-label">Try:</span>
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
                                        className="suggestion-button"
                                    >
                                        "{suggestion}"
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="search-input-container">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Describe what you want to eat... (e.g., 'spicy Mexican tacos' or 'healthy breakfast bowl')"
                                    className="search-input"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    className="search-button"
                                >
                                    {isLoading ? (
                                        <Loader2 className="search-icon loading" />
                                    ) : (
                                        <Search className="search-icon" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="favorites-section">
                        <h2 className="favorites-title">Your Favorite Recipes</h2>
                        <p className="favorites-description">
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
                            <div className="results-header">
                                <h3 className="results-title">AI Generated Recipes</h3>
                                <p className="results-description">Discover recipes created by AI, or search above for something specific.</p>
                            </div>
                        )}
                        {activeTab === 'search' && searchQuery && (
                            <div className="results-header">
                                <h3 className="results-title">AI Search Results</h3>
                                <p className="results-description">Found {displayedRecipes.length} AI-generated recipe{displayedRecipes.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                            </div>
                        )}
                        <div className="recipe-grid">
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
                    <div className="loading-state">
                        <Loader2 className="loading-spinner" />
                        <h3 className="loading-title">AI is creating recipes for you...</h3>
                        <p className="loading-description">ChatGPT is analyzing your request and generating personalized recipes.</p>
                    </div>
                )}

                {/* Empty States */}
                {activeTab === 'search' && recipes.length === 0 && !isLoading && searchQuery && (
                    <div className="empty-state">
                        <Search className="empty-icon" />
                        <h3 className="empty-title">No recipes found</h3>
                        <p className="empty-description">Try a different search term or browse our AI-generated recipes above.</p>
                    </div>
                )}

                {activeTab === 'favorites' && favorites.length === 0 && (
                    <div className="empty-state">
                        <Heart className="empty-icon" />
                        <h3 className="empty-title">No favorites yet</h3>
                        <p className="empty-description">Start exploring AI-generated recipes and save your favorites!</p>
                        <button
                            onClick={() => setActiveTab('search')}
                            className="discover-button"
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