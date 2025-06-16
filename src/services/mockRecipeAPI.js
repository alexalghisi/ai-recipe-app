import { recipeData } from '../data/recipes';

export const mockRecipeAPI = {
    searchRecipes: async (description) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Enhanced AI-like search algorithm
        const searchTerms = description.toLowerCase().trim();

        if (!searchTerms) {
            // Return a diverse mix of popular recipes when no search terms
            return recipeData
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 9);
        }

        // Score each recipe based on relevance
        const scoredRecipes = recipeData.map(recipe => {
            let score = 0;
            const searchWords = searchTerms.split(/\s+/);

            // Check title (high weight)
            searchWords.forEach(word => {
                if (recipe.title.toLowerCase().includes(word)) {
                    score += 10;
                }
            });

            // Check tags (high weight)
            searchWords.forEach(word => {
                recipe.tags.forEach(tag => {
                    if (tag.includes(word) || word.includes(tag)) {
                        score += 8;
                    }
                });
            });

            // Check description (medium weight)
            searchWords.forEach(word => {
                if (recipe.description.toLowerCase().includes(word)) {
                    score += 5;
                }
            });

            // Check ingredients (lower weight)
            searchWords.forEach(word => {
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.toLowerCase().includes(word)) {
                        score += 2;
                    }
                });
            });

            // Bonus for exact tag matches
            if (recipe.tags.some(tag => searchTerms.includes(tag))) {
                score += 15;
            }

            // Bonus for difficulty preference
            if (searchTerms.includes('easy') || searchTerms.includes('quick') || searchTerms.includes('simple') || searchTerms.includes('beginner')) {
                if (recipe.difficulty === 'Easy') score += 7;
            }
            if (searchTerms.includes('medium') || searchTerms.includes('intermediate')) {
                if (recipe.difficulty === 'Medium') score += 7;
            }
            if (searchTerms.includes('advanced') || searchTerms.includes('complex') || searchTerms.includes('challenging') || searchTerms.includes('hard')) {
                if (recipe.difficulty === 'Hard') score += 7;
            }

            // Cuisine-specific bonuses
            const cuisineMap = {
                'italian': ['italian'],
                'asian': ['thai', 'chinese', 'asian', 'japanese', 'korean', 'vietnamese'],
                'mexican': ['mexican'],
                'american': ['american'],
                'indian': ['indian'],
                'mediterranean': ['mediterranean', 'greek', 'spanish'],
                'middle eastern': ['middle eastern'],
                'french': ['french'],
                'british': ['british'],
                'german': ['german'],
                'russian': ['russian'],
                'moroccan': ['moroccan'],
                'cajun': ['cajun'],
                'fusion': ['fusion']
            };

            Object.entries(cuisineMap).forEach(([cuisine, tags]) => {
                if (searchTerms.includes(cuisine)) {
                    tags.forEach(tag => {
                        if (recipe.tags.includes(tag)) score += 12;
                    });
                }
            });

            // Meal type bonuses
            if (searchTerms.includes('breakfast') || searchTerms.includes('brunch')) {
                if (recipe.tags.includes('breakfast') || recipe.tags.includes('brunch')) score += 10;
            }
            if (searchTerms.includes('dessert') || searchTerms.includes('sweet')) {
                if (recipe.tags.includes('dessert') || recipe.tags.includes('sweet')) score += 10;
            }
            if (searchTerms.includes('appetizer') || searchTerms.includes('starter')) {
                if (recipe.tags.includes('appetizer') || recipe.tags.includes('side')) score += 10;
            }
            if (searchTerms.includes('comfort food') || searchTerms.includes('comfort')) {
                if (recipe.tags.includes('comfort food')) score += 8;
            }
            if (searchTerms.includes('healthy')) {
                if (recipe.tags.includes('healthy') || recipe.tags.includes('vegetarian') || recipe.tags.includes('vegan')) score += 8;
            }
            if (searchTerms.includes('vegetarian') || searchTerms.includes('veggie')) {
                if (recipe.tags.includes('vegetarian') || recipe.tags.includes('vegan')) score += 10;
            }
            if (searchTerms.includes('vegan')) {
                if (recipe.tags.includes('vegan')) score += 12;
            }
            if (searchTerms.includes('seafood') || searchTerms.includes('fish')) {
                if (recipe.tags.includes('seafood') || recipe.tags.includes('fish') || recipe.tags.includes('shrimp') || recipe.tags.includes('salmon')) score += 10;
            }

            return { ...recipe, searchScore: score };
        });

        // Filter and sort by relevance
        const relevantRecipes = scoredRecipes
            .filter(recipe => recipe.searchScore > 0)
            .sort((a, b) => b.searchScore - a.searchScore);

        // If no relevant recipes found, return popular recipes
        if (relevantRecipes.length === 0) {
            return recipeData
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 9);
        }

        // For specific popular categories, return more results
        const popularCategories = ['pizza', 'pasta', 'chicken', 'dessert', 'breakfast'];
        const isPopularCategory = popularCategories.some(category =>
            searchTerms.includes(category)
        );

        // Return more results for popular categories, fewer for others
        const maxResults = isPopularCategory ? 15 : 9;
        return relevantRecipes.slice(0, maxResults);
    }
};