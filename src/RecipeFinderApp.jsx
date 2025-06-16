import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock, Users, ChefHat, Star, Loader2 } from 'lucide-react';

// Enhanced Mock AI Recipe API Service
const mockRecipeAPI = {
    searchRecipes: async (description) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const allRecipes = [
            // Pizza Recipes
            {
                id: 1,
                title: "Classic Margherita Pizza",
                description: "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
                cookTime: "30 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.7,
                tags: ["pizza", "italian", "cheese", "tomato", "basil", "vegetarian", "margherita"],
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
                title: "Pepperoni Pizza",
                description: "Classic American-style pizza loaded with pepperoni and cheese",
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
                cookTime: "25 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.8,
                tags: ["pizza", "pepperoni", "cheese", "american", "meat", "comfort food"],
                ingredients: [
                    "1 pizza dough ball",
                    "200ml pizza sauce",
                    "250g mozzarella cheese, shredded",
                    "80g pepperoni slices",
                    "1 tsp oregano",
                    "1 tbsp olive oil"
                ],
                instructions: [
                    "Preheat oven to 230°C.",
                    "Roll out pizza dough and place on greased baking sheet.",
                    "Spread pizza sauce evenly over dough.",
                    "Sprinkle mozzarella cheese over sauce.",
                    "Arrange pepperoni slices on top.",
                    "Sprinkle with oregano and drizzle with olive oil.",
                    "Bake for 15-18 minutes until cheese is bubbly and crust is golden."
                ]
            },
            {
                id: 3,
                title: "Veggie Supreme Pizza",
                description: "Colorful pizza loaded with fresh vegetables and herbs",
                image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=400",
                cookTime: "35 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.5,
                tags: ["pizza", "vegetarian", "vegetables", "bell peppers", "mushrooms", "healthy"],
                ingredients: [
                    "1 pizza dough ball",
                    "200ml pizza sauce",
                    "200g mozzarella cheese",
                    "1 bell pepper, sliced",
                    "100g mushrooms, sliced",
                    "1 red onion, sliced",
                    "50g olives",
                    "2 tbsp olive oil"
                ],
                instructions: [
                    "Preheat oven to 230°C.",
                    "Roll out pizza dough and place on baking sheet.",
                    "Spread sauce and sprinkle cheese.",
                    "Arrange vegetables evenly on top.",
                    "Drizzle with olive oil.",
                    "Bake for 18-20 minutes until crust is golden.",
                    "Let cool for 2 minutes before slicing."
                ]
            },

            // Pasta Recipes
            {
                id: 4,
                title: "Classic Spaghetti Carbonara",
                description: "Creamy pasta dish with eggs, cheese, and pancetta",
                image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.8,
                tags: ["pasta", "italian", "carbonara", "eggs", "cheese", "pancetta", "creamy"],
                ingredients: [
                    "400g spaghetti",
                    "200g pancetta, diced",
                    "4 large eggs",
                    "100g Pecorino Romano cheese, grated",
                    "50g Parmesan cheese, grated",
                    "2 cloves garlic, minced",
                    "Black pepper to taste",
                    "Salt for pasta water"
                ],
                instructions: [
                    "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
                    "While pasta cooks, fry pancetta in a large skillet until crispy.",
                    "In a bowl, whisk together eggs, both cheeses, and black pepper.",
                    "Drain pasta, reserving 1 cup pasta water.",
                    "Add hot pasta to the skillet with pancetta.",
                    "Remove from heat and quickly mix in egg mixture, adding pasta water gradually.",
                    "Toss until creamy and serve immediately with extra cheese."
                ]
            },
            {
                id: 5,
                title: "Penne Arrabbiata",
                description: "Spicy Italian pasta with tomatoes, garlic, and red peppers",
                image: "https://images.unsplash.com/photo-1621996346565-e3dbc1d2c5c6?w=400",
                cookTime: "25 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.5,
                tags: ["pasta", "italian", "spicy", "tomato", "garlic", "peppers", "arrabbiata", "vegetarian"],
                ingredients: [
                    "400g penne pasta",
                    "400g canned tomatoes, crushed",
                    "4 cloves garlic, sliced",
                    "2 dried red chilies",
                    "60ml olive oil",
                    "Salt and pepper",
                    "Fresh parsley, chopped",
                    "Parmesan cheese for serving"
                ],
                instructions: [
                    "Cook penne according to package instructions until al dente.",
                    "Heat olive oil in a large pan over medium heat.",
                    "Add garlic and red chilies, cook for 1 minute until fragrant.",
                    "Add crushed tomatoes, season with salt and pepper.",
                    "Simmer for 10-15 minutes until sauce thickens.",
                    "Drain pasta and add to sauce, toss to combine.",
                    "Garnish with parsley and serve with Parmesan cheese."
                ]
            },
            {
                id: 6,
                title: "Fettuccine Alfredo",
                description: "Rich and creamy pasta with butter, cream, and Parmesan",
                image: "https://images.unsplash.com/photo-1621647264194-d5c4d1325b46?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.6,
                tags: ["pasta", "italian", "creamy", "alfredo", "cheese", "butter", "comfort food"],
                ingredients: [
                    "400g fettuccine pasta",
                    "100g butter",
                    "200ml heavy cream",
                    "150g Parmesan cheese, grated",
                    "2 cloves garlic, minced",
                    "Salt and white pepper",
                    "Fresh parsley for garnish"
                ],
                instructions: [
                    "Cook fettuccine according to package directions.",
                    "In a large pan, melt butter over medium heat.",
                    "Add garlic and cook for 30 seconds.",
                    "Pour in cream and bring to a gentle simmer.",
                    "Add half the Parmesan and whisk until melted.",
                    "Drain pasta and add to sauce, toss to coat.",
                    "Add remaining cheese, season, and garnish with parsley."
                ]
            },
            {
                id: 7,
                title: "Spaghetti Bolognese",
                description: "Classic Italian meat sauce with slow-cooked beef and tomatoes",
                image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400",
                cookTime: "45 mins",
                servings: 6,
                difficulty: "Medium",
                rating: 4.7,
                tags: ["pasta", "italian", "bolognese", "meat sauce", "beef", "tomato", "comfort food"],
                ingredients: [
                    "500g spaghetti",
                    "500g ground beef",
                    "1 onion, diced",
                    "2 carrots, diced",
                    "2 celery stalks, diced",
                    "400g crushed tomatoes",
                    "200ml red wine",
                    "2 tbsp tomato paste",
                    "Bay leaves",
                    "Fresh basil"
                ],
                instructions: [
                    "Heat oil in a large pot, brown the ground beef.",
                    "Add onion, carrots, and celery, cook until soft.",
                    "Stir in tomato paste and cook for 2 minutes.",
                    "Add wine and let it reduce by half.",
                    "Add crushed tomatoes and bay leaves.",
                    "Simmer for 30 minutes, stirring occasionally.",
                    "Cook spaghetti and serve with the sauce."
                ]
            },

            // Asian Cuisine
            {
                id: 8,
                title: "Thai Green Curry",
                description: "Aromatic coconut curry with vegetables and herbs",
                image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
                cookTime: "30 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.6,
                tags: ["thai", "curry", "coconut", "spicy", "vegetables", "asian", "chicken"],
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
                id: 9,
                title: "Chicken Fried Rice",
                description: "Quick and satisfying fried rice with chicken and vegetables",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
                cookTime: "15 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.4,
                tags: ["chinese", "fried rice", "chicken", "quick", "asian", "eggs", "vegetables"],
                ingredients: [
                    "3 cups cooked rice, preferably day-old",
                    "300g chicken breast, diced",
                    "3 eggs, beaten",
                    "100g mixed vegetables (peas, carrots)",
                    "3 green onions, chopped",
                    "3 cloves garlic, minced",
                    "3 tbsp soy sauce",
                    "2 tbsp vegetable oil",
                    "1 tsp sesame oil"
                ],
                instructions: [
                    "Heat 1 tbsp oil in a large wok or skillet over high heat.",
                    "Add beaten eggs, scramble quickly, and remove from pan.",
                    "Add remaining oil, then chicken. Cook until golden and cooked through.",
                    "Add garlic and vegetables, stir-fry for 2 minutes.",
                    "Add rice, breaking up any clumps with spatula.",
                    "Add soy sauce and sesame oil, stir-fry for 3-4 minutes.",
                    "Return eggs to pan, add green onions, and serve hot."
                ]
            },
            {
                id: 10,
                title: "Pad Thai",
                description: "Sweet and tangy Thai stir-fried noodles with shrimp",
                image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400",
                cookTime: "25 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.7,
                tags: ["thai", "noodles", "shrimp", "pad thai", "asian", "stir-fry", "tamarind"],
                ingredients: [
                    "200g rice noodles",
                    "300g shrimp, peeled",
                    "3 eggs",
                    "100g bean sprouts",
                    "3 tbsp tamarind paste",
                    "2 tbsp fish sauce",
                    "2 tbsp brown sugar",
                    "2 tbsp vegetable oil",
                    "Crushed peanuts",
                    "Lime wedges"
                ],
                instructions: [
                    "Soak rice noodles in warm water until soft.",
                    "Heat oil in a wok, add shrimp and cook until pink.",
                    "Push shrimp to one side, scramble eggs in the empty space.",
                    "Add drained noodles and sauce mixture.",
                    "Stir-fry for 3-4 minutes until noodles are coated.",
                    "Add bean sprouts and cook for 1 minute.",
                    "Garnish with peanuts and serve with lime wedges."
                ]
            },
            {
                id: 11,
                title: "Chicken Teriyaki",
                description: "Japanese glazed chicken with sweet and savory teriyaki sauce",
                image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
                cookTime: "25 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.5,
                tags: ["japanese", "chicken", "teriyaki", "sweet", "asian", "grilled", "rice"],
                ingredients: [
                    "4 chicken thighs, boneless",
                    "4 tbsp soy sauce",
                    "3 tbsp mirin",
                    "2 tbsp brown sugar",
                    "1 tbsp rice vinegar",
                    "2 cloves garlic, minced",
                    "1 tsp ginger, grated",
                    "1 tbsp vegetable oil",
                    "Sesame seeds for garnish"
                ],
                instructions: [
                    "Mix soy sauce, mirin, sugar, vinegar, garlic, and ginger for sauce.",
                    "Heat oil in a large skillet over medium-high heat.",
                    "Cook chicken skin-side down for 5-6 minutes until crispy.",
                    "Flip chicken and cook another 4-5 minutes.",
                    "Pour sauce over chicken and simmer until thickened.",
                    "Turn chicken to coat in glaze.",
                    "Garnish with sesame seeds and serve with steamed rice."
                ]
            },
            {
                id: 12,
                title: "Beef and Broccoli",
                description: "Classic Chinese stir-fry with tender beef and crisp broccoli",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.4,
                tags: ["chinese", "beef", "broccoli", "stir-fry", "asian", "quick", "vegetables"],
                ingredients: [
                    "500g beef sirloin, sliced thin",
                    "500g broccoli, cut into florets",
                    "3 tbsp soy sauce",
                    "2 tbsp oyster sauce",
                    "1 tbsp cornstarch",
                    "2 cloves garlic, minced",
                    "1 tbsp vegetable oil",
                    "1 tsp sesame oil",
                    "Steamed rice for serving"
                ],
                instructions: [
                    "Marinate beef with 1 tbsp soy sauce and cornstarch.",
                    "Blanch broccoli in boiling water for 2 minutes, drain.",
                    "Heat oil in a wok over high heat.",
                    "Stir-fry beef until just cooked, remove from pan.",
                    "Add garlic and broccoli, stir-fry for 2 minutes.",
                    "Return beef to pan with remaining sauces.",
                    "Toss everything together and serve over rice."
                ]
            },

            // Indian Cuisine
            {
                id: 13,
                title: "Chicken Tikka Masala",
                description: "Creamy Indian curry with tender chicken in tomato-based sauce",
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
                cookTime: "40 mins",
                servings: 4,
                difficulty: "Medium",
                rating: 4.8,
                tags: ["indian", "curry", "chicken", "tikka masala", "creamy", "tomato", "spices"],
                ingredients: [
                    "600g chicken breast, cubed",
                    "200ml heavy cream",
                    "400g canned tomatoes",
                    "1 large onion, diced",
                    "3 cloves garlic, minced",
                    "1 tbsp ginger, grated",
                    "2 tsp garam masala",
                    "1 tsp turmeric",
                    "1 tsp paprika",
                    "Basmati rice for serving"
                ],
                instructions: [
                    "Season chicken with half the spices and cook until golden.",
                    "In same pan, cook onion until soft.",
                    "Add garlic, ginger, and remaining spices.",
                    "Add tomatoes and simmer for 15 minutes.",
                    "Blend sauce until smooth, return to pan.",
                    "Add chicken and cream, simmer for 10 minutes.",
                    "Serve over basmati rice with naan bread."
                ]
            },

            // Mexican Cuisine
            {
                id: 14,
                title: "Chicken Tacos",
                description: "Flavorful grilled chicken tacos with fresh toppings",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.6,
                tags: ["mexican", "tacos", "chicken", "quick", "fresh", "lime", "cilantro"],
                ingredients: [
                    "500g chicken breast, sliced",
                    "8 small corn tortillas",
                    "1 tsp cumin",
                    "1 tsp chili powder",
                    "1 tsp paprika",
                    "2 limes, juiced",
                    "1 red onion, diced",
                    "Fresh cilantro, chopped",
                    "200g cheese, shredded",
                    "2 tbsp olive oil"
                ],
                instructions: [
                    "Season chicken with cumin, chili powder, paprika, salt, and pepper.",
                    "Heat olive oil in a skillet over medium-high heat.",
                    "Cook chicken for 6-8 minutes until golden and cooked through.",
                    "Warm tortillas in a dry pan or microwave.",
                    "Slice chicken and divide among tortillas.",
                    "Top with diced onion, cilantro, and cheese.",
                    "Serve with lime wedges and enjoy immediately."
                ]
            },

            // Breakfast
            {
                id: 15,
                title: "Fluffy Pancakes",
                description: "Light and airy pancakes perfect for weekend breakfast",
                image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.6,
                tags: ["breakfast", "pancakes", "fluffy", "sweet", "american", "syrup"],
                ingredients: [
                    "2 cups all-purpose flour",
                    "2 tbsp sugar",
                    "2 tsp baking powder",
                    "1/2 tsp salt",
                    "2 large eggs",
                    "1 3/4 cups milk",
                    "4 tbsp butter, melted",
                    "1 tsp vanilla extract",
                    "Maple syrup for serving"
                ],
                instructions: [
                    "Whisk together flour, sugar, baking powder, and salt.",
                    "In another bowl, beat eggs, then add milk, melted butter, and vanilla.",
                    "Pour wet ingredients into dry ingredients, mix until just combined.",
                    "Heat a lightly greased pan over medium heat.",
                    "Pour 1/4 cup batter for each pancake.",
                    "Cook until bubbles form on surface, flip and cook until golden.",
                    "Serve hot with maple syrup and butter."
                ]
            },
            {
                id: 16,
                title: "Avocado Toast",
                description: "Healthy and trendy breakfast with mashed avocado on toasted bread",
                image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400",
                cookTime: "10 mins",
                servings: 2,
                difficulty: "Easy",
                rating: 4.3,
                tags: ["breakfast", "healthy", "avocado", "toast", "vegetarian", "quick"],
                ingredients: [
                    "2 slices whole grain bread",
                    "1 ripe avocado",
                    "1 tbsp lime juice",
                    "Salt and pepper to taste",
                    "Red pepper flakes",
                    "2 eggs (optional)",
                    "Cherry tomatoes",
                    "Olive oil drizzle"
                ],
                instructions: [
                    "Toast bread slices until golden brown.",
                    "Mash avocado with lime juice, salt, and pepper.",
                    "Spread avocado mixture evenly on toast.",
                    "Top with cherry tomatoes and red pepper flakes.",
                    "Drizzle with olive oil.",
                    "Add a fried or poached egg on top if desired.",
                    "Serve immediately while toast is still warm."
                ]
            },

            // Seafood
            {
                id: 17,
                title: "Grilled Salmon",
                description: "Perfectly grilled salmon with lemon and herbs",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.7,
                tags: ["seafood", "salmon", "grilled", "healthy", "omega-3", "lemon", "herbs"],
                ingredients: [
                    "4 salmon fillets",
                    "2 lemons, sliced",
                    "3 tbsp olive oil",
                    "2 cloves garlic, minced",
                    "Fresh dill",
                    "Fresh parsley",
                    "Salt and pepper",
                    "Asparagus for serving"
                ],
                instructions: [
                    "Preheat grill to medium-high heat.",
                    "Mix olive oil, garlic, herbs, salt, and pepper.",
                    "Brush salmon with herb mixture.",
                    "Grill salmon for 4-5 minutes per side.",
                    "Top with lemon slices during last 2 minutes.",
                    "Cook until fish flakes easily with a fork.",
                    "Serve with grilled asparagus and lemon wedges."
                ]
            },

            // Burgers
            {
                id: 18,
                title: "Classic Beef Burger",
                description: "Juicy beef burger with fresh toppings and special sauce",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
                cookTime: "20 mins",
                servings: 4,
                difficulty: "Easy",
                rating: 4.7,
                tags: ["burger", "beef", "american", "grilled", "comfort food", "cheese"],
                ingredients: [
                    "500g ground beef (80/20)",
                    "4 burger buns",
                    "4 cheese slices",
                    "1 large tomato, sliced",
                    "1 onion, sliced",
                    "Lettuce leaves",
                    "Pickles",
                    "Burger sauce or mayo",
                    "Salt and pepper"
                ],
                instructions: [
                    "Form ground beef into 4 patties, season with salt and pepper.",
                    "Heat grill or skillet over medium-high heat.",
                    "Cook patties for 4-5 minutes per side for medium doneness.",
                    "Add cheese slices in last minute of cooking.",
                    "Toast burger buns until golden.",
                    "Assemble burgers with sauce, lettuce, tomato, onion, and pickles.",
                    "Serve immediately with fries or chips."
                ]
            },

            // Soups
            {
                id: 19,
                title: "Chicken Noodle Soup",
                description: "Comforting homemade soup with chicken, vegetables, and noodles",
                image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
                cookTime: "45 mins",
                servings: 6,
                difficulty: "Easy",
                rating: 4.8,
                tags: ["soup", "chicken", "noodles", "comfort food", "vegetables", "healthy"],
                ingredients: [
                    "500g chicken breast",
                    "200g egg noodles",
                    "2 carrots, diced",
                    "2 celery stalks, diced",
                    "1 onion, diced",
                    "2 cloves garlic, minced",
                    "1.5L chicken broth",
                    "2 bay leaves",
                    "Fresh thyme",
                    "Salt and pepper"
                ],
                instructions: [
                    "Cook chicken in broth until tender, about 20 minutes.",
                    "Remove chicken, shred when cool, and strain broth.",
                    "Sauté vegetables in a large pot until soft.",
                    "Add broth, bay leaves, and thyme, bring to a boil.",
                    "Add noodles and cook according to package directions.",
                    "Return shredded chicken to pot.",
                    "Season with salt and pepper, serve hot."
                ]
            },

            // Desserts
            {
                id: 20,
                title: "Chocolate Lava Cake",
                description: "Decadent dessert with molten chocolate center",
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
                cookTime: "25 mins",
                servings: 2,
                difficulty: "Hard",
                rating: 4.9,
                tags: ["dessert", "chocolate", "cake", "molten", "decadent", "sweet"],
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
            },
            {
                id: 21,
                title: "Classic Tiramisu",
                description: "Italian coffee-flavored dessert with mascarpone and cocoa",
                image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
                cookTime: "30 mins (+ 4h chill)",
                servings: 8,
                difficulty: "Medium",
                rating: 4.8,
                tags: ["dessert", "italian", "coffee", "mascarpone", "sweet", "no-bake"],
                ingredients: [
                    "6 egg yolks",
                    "75g sugar",
                    "500g mascarpone cheese",
                    "300ml strong coffee, cooled",
                    "3 tbsp coffee liqueur",
                    "2 packets ladyfinger biscuits",
                    "Cocoa powder for dusting",
                    "Dark chocolate for shaving"
                ],
                instructions: [
                    "Whisk egg yolks and sugar until thick and pale.",
                    "Add mascarpone and mix until smooth.",
                    "Combine coffee and liqueur in a shallow dish.",
                    "Quickly dip each ladyfinger in coffee mixture and layer in dish.",
                    "Spread half the mascarpone mixture over biscuits.",
                    "Repeat with another layer of dipped biscuits and remaining mascarpone.",
                    "Refrigerate for at least 4 hours or overnight.",
                    "Before serving, dust with cocoa powder and chocolate shavings."
                ]
            }
        ];

        // Enhanced AI-like search algorithm
        const searchTerms = description.toLowerCase().trim();

        if (!searchTerms) return allRecipes.slice(0, 6);

        // Score each recipe based on relevance
        const scoredRecipes = allRecipes.map(recipe => {
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
            if (searchTerms.includes('easy') || searchTerms.includes('quick') || searchTerms.includes('simple')) {
                if (recipe.difficulty === 'Easy') score += 5;
            }
            if (searchTerms.includes('advanced') || searchTerms.includes('complex') || searchTerms.includes('challenging')) {
                if (recipe.difficulty === 'Hard') score += 5;
            }

            // Cuisine-specific bonuses
            const cuisineMap = {
                'italian': ['italian'],
                'asian': ['thai', 'chinese', 'asian'],
                'mexican': ['mexican'],
                'american': ['american'],
                'indian': ['indian'],
                'mediterranean': ['mediterranean']
            };

            Object.entries(cuisineMap).forEach(([cuisine, tags]) => {
                if (searchTerms.includes(cuisine)) {
                    tags.forEach(tag => {
                        if (recipe.tags.includes(tag)) score += 12;
                    });
                }
            });

            return { ...recipe, searchScore: score };
        });

        // Filter and sort by relevance
        const relevantRecipes = scoredRecipes
            .filter(recipe => recipe.searchScore > 0)
            .sort((a, b) => b.searchScore - a.searchScore);

        // If no relevant recipes found, return popular recipes
        if (relevantRecipes.length === 0) {
            return allRecipes
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6);
        }

        // Return top 6 most relevant recipes
        return relevantRecipes.slice(0, 6);
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

// Recipe Detail Modal
const RecipeDetail = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
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

// Main App Component
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
                            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                                Discover from our collection of 30+ recipes across global cuisines. Get personalized recommendations based on your cravings, dietary preferences, and cooking skill level.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm">
                                <span className="text-gray-500">Try:</span>
                                {['pizza margherita', 'quick pasta', 'thai curry', 'chocolate dessert', 'easy chicken', 'mexican tacos'].map((suggestion, index) => (
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

export default RecipeFinderApp;