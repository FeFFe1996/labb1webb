const elForm = document.querySelector('#formReg');
const elRating = document.querySelector('#rating');
const elComment = document.querySelector('#comment');

let currentRecipe = null; 
let ratingScore = [];


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

        currentRecipe = data.recept.find(item => String(item.id) === String(recipeId));

        if (!currentRecipe) {
            document.querySelector('#receptContent').innerText = "Recipe not found.";
            return;
        }

        if (currentRecipe.ratingCount === undefined) {
            currentRecipe.ratingCount = currentRecipe.rating > 0 ? 1 : 0;
            currentRecipe.ratingSum = currentRecipe.rating;
        }

        renderRecipe(currentRecipe);

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

    
    const instructionsHTML = recipe.howto
        .map((step, index) => `<li><Strong>Step ${index + 1}: </strong>${step}</li><br><br>`)
        .join('');
    
        detailContainer.innerHTML = `
        <h2>${recipe.recept}</h2>
        <p><strong>Portions:</strong> ${recipe.portions}</p>
        <p><strong>Rating:</strong> <span id="userRating">${recipe.rating}</span>/5</p>

        <h4>Ingredients</h4>
        <ul>
            ${ingredientsHTML}
        </ul>

        <h4>Instructions</h4>
        <ol>
            ${instructionsHTML}
        </ol>
    `;


    addRatingComment();

}

function addRatingComment(){
    if(!elForm){
        return;
    }

    elForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const userRating = parseFloat(elRating.value);
        const userComment = elComment.value;

        currentRecipe.ratingSum += userRating;
        currentRecipe.ratingCount += 1;

        const newAverageRating = (currentRecipe.ratingSum / currentRecipe.ratingCount).toFixed(1);
        currentRecipe.rating = newAverageRating;

        const RatingDisplay = document.querySelector('#userRating');
        
        if(RatingDisplay) {
                RatingDisplay.innerText = newAverageRating;
            }

        elForm.reset();
        const output = elForm.querySelector('output');
        if (output) output.value = "0";
    });
}

loadRecipeDetails();