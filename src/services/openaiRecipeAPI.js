import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only for client-side usage
});

export const openaiRecipeAPI = {
    searchRecipes: async (description) => {
        try {
            // Create a detailed prompt for recipe generation
            const prompt = `
You are a professional chef and recipe expert. Based on the user's description: "${description}", generate 3-6 relevant recipes in JSON format.

Each recipe should have this exact structure:
{
  "id": unique_number,
  "title": "Recipe Name",
  "description": "Brief description (max 100 chars)",
  "image": "https://images.unsplash.com/photo-[food-related-unsplash-id]?w=400",
  "cookTime": "XX mins",
  "servings": number,
  "difficulty": "Easy|Medium|Hard",
  "rating": 4.0-5.0,
  "tags": ["tag1", "tag2", "tag3", "cuisine", "meal-type"],
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["step 1", "step 2", ...]
}

Requirements:
- If user searches for "pizza", return 4-6 different pizza varieties
- Include diverse cuisines and cooking styles
- Use real Unsplash food image IDs
- Tags should include cuisine type, main ingredients, dietary info
- Instructions should be clear and detailed (6-10 steps)
- Ingredients should be specific with measurements
- Match the difficulty to the actual recipe complexity
- Ensure recipes are practical and achievable

Return ONLY valid JSON array of recipes, no additional text.
`;

            console.log('🤖 Calling OpenAI API for recipes...');

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional chef and recipe expert. Always respond with valid JSON only."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 3000,
                temperature: 0.7,
            });

            const response = completion.choices[0].message.content;
            console.log('🔍 OpenAI Response:', response);

            // Parse the JSON response
            try {
                const recipes = JSON.parse(response);

                // Validate and format the recipes
                const formattedRecipes = recipes.map((recipe, index) => ({
                    ...recipe,
                    id: recipe.id || Date.now() + index,
                    // Ensure all required fields exist
                    image: recipe.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400`,
                    tags: recipe.tags || ['recipe'],
                    rating: recipe.rating || 4.5,
                }));

                console.log('✅ Parsed recipes:', formattedRecipes);
                return formattedRecipes;

            } catch (parseError) {
                console.error('❌ JSON Parse Error:', parseError);
                console.log('Raw response:', response);

                // Fallback to mock recipes if parsing fails
                return getFallbackRecipes(description);
            }

        } catch (error) {
            console.error('❌ OpenAI API Error:', error);

            // Check for specific error types
            if (error.status === 401) {
                alert('OpenAI API Key is invalid. Please check your environment variables.');
            } else if (error.status === 429) {
                alert('OpenAI API rate limit exceeded. Please try again later.');
            } else {
                console.error('API Error details:', error);
            }

            // Fallback to mock recipes on error
            return getFallbackRecipes(description);
        }
    }
};

// Fallback recipes when API fails
const getFallbackRecipes = (description) => {
    console.log('🔄 Using fallback recipes for:', description);

    const fallbackRecipes = [
        {
            id: 1,
            title: "Classic Margherita Pizza",
            description: "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
            cookTime: "30 mins",
            servings: 4,
            difficulty: "Medium",
            rating: 4.7,
            tags: ["pizza", "italian", "cheese", "tomato", "basil", "vegetarian"],
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
                "Preheat oven to 250°C with pizza stone inside.",
                "Roll out pizza dough on floured surface to 12-inch circle.",
                "Spread pizza sauce evenly, leaving 1-inch border for crust.",
                "Add mozzarella slices and tomato slices.",
                "Drizzle with olive oil and season with salt and pepper.",
                "Transfer to hot pizza stone and bake for 10-12 minutes until golden.",
                "Remove from oven, add fresh basil leaves, and serve immediately."
            ]
        },
        {
            id: 2,
            title: "Chicken Stir Fry",
            description: "Quick and healthy stir-fry with colorful vegetables",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
            cookTime: "20 mins",
            servings: 4,
            difficulty: "Easy",
            rating: 4.5,
            tags: ["chicken", "stir-fry", "healthy", "quick", "asian", "vegetables"],
            ingredients: [
                "500g chicken breast, sliced",
                "2 bell peppers, sliced",
                "1 broccoli head, florets",
                "2 tbsp soy sauce",
                "1 tbsp sesame oil",
                "2 cloves garlic, minced",
                "1 tbsp vegetable oil"
            ],
            instructions: [
                "Heat vegetable oil in a large wok over high heat.",
                "Add chicken and cook until golden brown.",
                "Add garlic and stir-fry for 30 seconds.",
                "Add vegetables and stir-fry for 3-4 minutes.",
                "Add soy sauce and sesame oil.",
                "Toss everything together and cook for 2 more minutes.",
                "Serve immediately over rice."
            ]
        },
        {
            id: 3,
            title: "Chocolate Chip Cookies",
            description: "Classic homemade cookies with chocolate chips",
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
            cookTime: "25 mins",
            servings: 24,
            difficulty: "Easy",
            rating: 4.8,
            tags: ["dessert", "cookies", "chocolate", "baking", "sweet"],
            ingredients: [
                "225g butter, softened",
                "200g brown sugar",
                "100g white sugar",
                "2 eggs",
                "300g flour",
                "1 tsp baking soda",
                "200g chocolate chips"
            ],
            instructions: [
                "Preheat oven to 190°C.",
                "Cream butter and sugars until fluffy.",
                "Beat in eggs one at a time.",
                "Mix in flour and baking soda.",
                "Fold in chocolate chips.",
                "Drop spoonfuls on baking sheet.",
                "Bake 9-11 minutes until golden brown."
            ]
        }
    ];

    // Simple filter based on search term
    const searchTerm = description.toLowerCase();
    if (searchTerm.includes('pizza')) {
        return [fallbackRecipes[0]];
    } else if (searchTerm.includes('chicken') || searchTerm.includes('stir')) {
        return [fallbackRecipes[1]];
    } else if (searchTerm.includes('dessert') || searchTerm.includes('cookie')) {
        return [fallbackRecipes[2]];
    }

    return fallbackRecipes;
};