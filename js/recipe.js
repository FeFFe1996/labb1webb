const elForm = document.querySelector('#formReg');
const elRating = document.querySelector('#rating');
const elForm = document.querySelector('#comment');

async function loadRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        console.error("No recipe ID provided in URL.");
        return;
    }

    try {
        const response = await fetch('./data/recept.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();

        const recipe = data.recept.find(item => String(item.id) === String(recipeId));

        if (!recipe) {
            document.querySelector('#receptContent').innerText = "Recipe not found.";
            return;
        }

        renderRecipe(recipe);

    } catch (error) {
        console.error("Error loading recipe details:", error);
    }
}

function renderRecipe(recipe) {
    const detailContainer = document.querySelector('#receptContent');
    const ingredientContainter = document.querySelector('ingredientContent');

    const ingredientsHTML = recipe.ingredients
        .map(item => `<li>${item.amount} ${item.measurment} ${item.name}</li><br>`)
        .join('');

    // Generate numbered items for instructions
    const instructionsHTML = recipe.howto
        .map(step => `<li>${step}</li><br>`)
        .join('');
    
        detailContainer.innerHTML = `
        <h2>${recipe.recept}</h2>
        <p><strong>Portions:</strong> ${recipe.portions}</p>
        <p><strong>Rating:</strong> ${recipe.rating}/5</p>

        <h4>Ingredients</h4>
        <ul>
            ${ingredientsHTML}
        </ul>

        <h4>Instructions</h4>
        <ol>
            ${instructionsHTML}
        </ol>
    `;
}

loadRecipeDetails();