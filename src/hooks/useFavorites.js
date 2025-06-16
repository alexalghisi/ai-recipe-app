import { useState, useEffect } from 'react';

export const useFavorites = () => {
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