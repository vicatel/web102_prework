/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
addGamesToPage(GAMES_JSON);

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // const container = document.getElementById('game-container'); 
 // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        
        // Creating a new div element for each game
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Creating the HTML content using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="Game Image">
            <h2>${game.name}</h2>
            <p>Description: ${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
           
        `;

     
        gamesContainer.appendChild(gameCard);
    }
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

contributionsCard.innerHTML = `
   <small> Total Contributions: ${totalContributions.toLocaleString()} </small>
`;
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);

raisedCard.innerHTML = `
    <small> Total Raised: $${totalRaised.toLocaleString()} </small>
`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `
    Total Games: ${totalGames}
`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// filterFundedOnly();
// filterUnfundedOnly();
// showAllGames();
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);


    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

   
    addGamesToPage(unfundedGames);


}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    
    addGamesToPage(fundedGames);

   

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Function to connect event listeners to buttons
function connectButtons() {
    unfundedBtn.addEventListener("click", filterUnfundedOnly);
    fundedBtn.addEventListener("click", filterFundedOnly);
    allBtn.addEventListener("click", showAllGames);
}

// Call the function to connect event listeners
connectButtons();

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter() to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Calculate the total raised amount across all games
// const totalRaised = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);

// Calculate the total number of games
// const totalGames = GAMES_JSON.length;

// Create a template string to display the information
const templateString = `
    A total of $${totalRaised.toLocaleString()} for ${totalGames} games.
    ${unfundedGamesCount > 0 ?
    `Currently ${unfundedGamesCount} game${unfundedGamesCount === 1 ? '' : 's'} remain unfunded. We need your help to fund these amazing games!` :
    'All games are funded!'} 
`;

// Create a new paragraph element and set its inner HTML to the template string
const paragraphElement = document.createElement('p');
paragraphElement.innerHTML = templateString;

// Add the paragraph element to the descriptionContainer
descriptionContainer.appendChild(paragraphElement);
// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('p');
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Create a new element to hold the name of the second most funded game and append it to the secondGameContainer
const secondGameElement = document.createElement('p');
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement)




