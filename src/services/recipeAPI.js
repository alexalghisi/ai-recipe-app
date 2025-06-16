import { openaiRecipeAPI } from './openaiRecipeAPI';
import { mockRecipeAPI } from './mockRecipeAPI';

// Configuration - set to true to use OpenAI, false for mock
const USE_OPENAI = process.env.REACT_APP_OPENAI_API_KEY ? true : false;

export const recipeAPI = {
    searchRecipes: async (description) => {
        console.log(`🔍 Using ${USE_OPENAI ? 'OpenAI' : 'Mock'} API for search:`, description);

        if (USE_OPENAI) {
            return await openaiRecipeAPI.searchRecipes(description);
        } else {
            console.log('⚠️ OpenAI API key not found, using mock API');
            return await mockRecipeAPI.searchRecipes(description);
        }
    }
};