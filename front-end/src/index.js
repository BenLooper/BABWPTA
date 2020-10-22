//Global Variables
const table = document.querySelector('.periodic')
const elementDetails = document.querySelectorAll('.at_details')
const highScoreCell = document.querySelector("#high-cell")
const profileDetailsCell = document.querySelector("#profile-cell")


//URLs
let baseUrl = 'http://localhost:3000'
let sessionsUrl = '/sessions'


//login button
//TODO add listener that makes login form appear
//TODO make login form not ugly 
const loginCell = document.querySelector("#login-cell")
let loginButton = document.createElement('button')
loginButton.innerText = "Login"
loginButton.id = "login-button"
loginButton.addEventListener('click', () => addLoginForm())
loginCell.append(loginButton)

//logout button
const logoutCell = document.querySelector("#logout-cell")
let logoutButton = document.createElement('button')
logoutButton.innerText = "Logout"
logoutButton.id = "logout-button"
logoutCell.append(logoutButton)

//signup button
const signupCell = document.querySelector("#signup-cell")
let signupButton = document.createElement('button')
signupButton.innerText = "Sign Up"
signupButton.id = "signup-button"
signupCell.append(signupButton)

//start game button
const gameCell = document.querySelector("#game-cell")
let gameButton = document.createElement('button')
gameButton.innerText = "Start Game"
gameButton.id = "game-button"
gameButton.addEventListener('click', () => quizModeOn())
gameCell.append(gameButton)

//score button
const scoreCell = document.querySelector("#score-cell")
let scoreButton = document.createElement('button')
// scoreButton.innerText = `score: ${game.score}`
scoreButton.innerText = "Score: 0"
scoreButton.id = "score-button"
scoreCell.append(scoreButton)


//sets up table for quiz mode 
function quizModeOn(){

    //start the timer 
    let thirtySeconds = 30,
    timerCell = document.querySelector('#timer-cell');
    startTimer(thirtySeconds, timerCell);

    //Set the score to zero
    scoreButton.innerText = "Score: 0"

    //Get an array of names to randomly pull from
    names = getElementNames();
    
    //clear table of names and weights (no cheating 😤)
    //sets the font size to 0, this way we can still look at the value to see if it's correct! 
    elementDetails.forEach(element => element.style = 'font-size:0px')

    //uses the array of names to set a random element as the answer 
    assignRandomElement(names);

    //add listeners for each element that check if they match the element we're looking for
    createCellListeners();

    //After the 30 seconds expires on the timer, quizModeOff will run 
}


//Undoes everything that quizModeOn did to the DOM
function quizModeOff(runTimer){
 
    //stops the function that setTimer runs in quizModeOn
    clearInterval(runTimer)
    
    //set the timer cell (otherwise it just says 0 seconds left)
    timerCell = document.querySelector('#timer-cell');
    timerCell.textContent = "TIME UP"

    //remove event listeners from the cells
    removeCellListeners();

    //un-hides the text by undoing the font-size change 
    elementDetails.forEach(element => element.style = '')
}

//Creates form to login with, currently appends the form to bottom of the table on button click
function addLoginForm(){
    let form = createEl('form')
    form.id = 'login-form'
    form.addEventListener('submit', function(e){
        e.preventDefault();
        logIn(e.target);
    })

    let userInput = createEl('input')
    userInput.id = 'user'
    userInput.type = 'text'
    userInput.placeholder = "Enter Email Address"

    let passInput = createEl('input')
    passInput.id = 'pass'
    passInput.type = 'password'
    passInput.placeholder = "Enter Password"

    let submit = createEl('input')
    submit.type = 'submit'
    submit.id = 'submit-btn'

    form.append(userInput, passInput, submit)
    table.append(form)
}


//Based on login info, either logs a user in and populates page w/their data
//or returns "user not found"
function logIn(inputForm){
    fetch(`${baseUrl}${sessionsUrl}`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({
            "username":inputForm.user.value,
            "password":inputForm.pass.value
        })
    })
    .then(res=>res.json())
    .then(user => {
        if (!user.error) {
            // console.log(user)
            renderProfileDetails(user);
            inputForm.remove();
        }
        else{
            inputForm.append(user.error)
        }
    })
}


//populates page with user specific data 
function renderProfileDetails(user){
    
    let profileElement = document.createElement('div')
    profileElement.className = "element"

    let profileDetailsDiv = document.createElement('div')
    profileDetailsDiv.className = "at_details"
    
    let description = document.createElement('p')
    
    let name = document.createElement('p')
    name.innerText = "Welcome, " + user.name + "!" + '\n' + "Click this tile to edit your profile"
    
    let image = document.createElement('img')
    image.src = user.image_url
    image.id = "profile-pic"
    
    let username = createEl('p')
    username.innerText = `Email: ${user.username}`
    
    profileDetailsDiv.append(description, name, username)
    profileElement.append(profileDetailsDiv)
    profileDetailsCell.append(profileElement)

    //profile pic cell
    let profilePicCell = document.querySelector("#profile-pic-cell")
    let profilePicElement = document.createElement('div')
    // profilePicElement.className = "element"

    let profilePicDiv = document.createElement('div')
    profilePicDiv.className = "at_details"

    profilePicDiv.append(image)
    profilePicElement.append(profilePicDiv)
    profilePicCell.append(profilePicElement)

    //high score cell's inner text
    highScoreCell.innerText = `High Score: ${(highestScore(user.games))}`
}


//---------------------//
//HELPER FUNCTIONS --> These are used in the "big" functions above and interact with each other somewhat as well

//adds quiz mode event listeners to each element
//if the selected element is correct, it increases the score by 1 
function createCellListeners(){
    //We're adding listeners only to the ones we want them to be able to click--the cells with elements in them
    let cells = document.querySelectorAll('.cell')

    //You can't use filter on a node array, so we make it into an array with spread operator
    let cellsArray = [...cells]

    //filter out the empty cells 
    cellsArray = cellsArray.filter(cell => cell.hasChildNodes())

    //for every cell in the array, add a listener that runs checkHandler on click
    //checkHandler is the variable that points to the checkAnswer function
    for (const cell of cellsArray){
        cell.addEventListener('click', checkHandler)
    }
}


//check if the chosen element matches the answer 
//We set it to a variable so that when we remove it, all we have to do is remove the variable 
const checkHandler = function checkAnswer(selected){  
    
    //the actual name of the element is all the way down in the details :( 
    let element = selected.target.children[0].children[2]
    
    let names = getElementNames();
    let answer = document.querySelector('#answer-cell');
    
    //if the name matches the answer, increase the score and assign a new element to find
    if (element.innerText.match(letters).join('') == answer.innerText.toLowerCase()){
        
        //this looks confusing -- all it's doing is finding the number in "Score: 1" and incrementing it 
        let currentScore = parseInt(scoreButton.innerText.match(/\d/))
        scoreButton.innerText = scoreButton.innerText.replace(/\d/, (currentScore + 1))
        
        assignRandomElement(names);
    }

    //else it turns the element red or something idk
    else{
        console.log('nope')
    }
}
   

//removes listeners from cells 
function removeCellListeners(){
    let cells = document.querySelectorAll('.cell')

    let cellsArray = [...cells]

    cellsArray = cellsArray.filter(cell => cell.hasChildNodes())

    for (const cell of cells){
        //removeEventListener just does the opposite of addEventListener 
        //this is why we needed the variable -- just putting the name of the function doesn't work for some reason 
        cell.removeEventListener('click',checkHandler)
    }
}


//Get the array of element names by parsing the text in at_details for each element
function getElementNames(){

    //elementNamesAndWeights is an array of the name of the element + the weight 
    //we just want the names, but the name&weight are in the same string! 😱
    let elementNamesAndWeights = []
    elementDetails.forEach(function(element){elementNamesAndWeights.push(element.textContent)})
    
    //so we need to get an array with only the element names 
    //"letters" is the regex pattern for any lower case letter a-z  
    letters = /[a-z]/g;

    //for each name&weight string in the list, we grab only the letters (the name)
    //but .match returns the individual characters in an array (['a','b','c'])
    //so for each element, we .join it's letter array with nothing (''), which combines to make the name!
    let names = elementNamesAndWeights.map(function(element){return element.match(letters).join('')})
    return names
}


//Assign a random element to find 
function assignRandomElement(names){

    //populate answer-cell with a randomly indexed element from the names array
    let answer = document.querySelector('#answer-cell')
    answer.innerText = (names[getRandomInt(names.length)])

    //this capitalizes the word...I only did this because I knew it'd drive you crazy if it was all lowercase
    answer.innerText = answer.innerText.replace(answer.innerText[0],answer.innerText[0].toUpperCase())
    return answer
}


//timer countdown -- after zero, runs quizModeOff
//quizModeOff takes in the variable (runTimer) that's assigned to the interval function so that it can stop it 
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let timerButton = document.createElement('button')
    timerButton.id = "timer-button"
    
    runTimer = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `Time Left: ${seconds} secs`;
        if (--timer < 0) {
            // timer = duration;
            quizModeOff(runTimer);
        }
    }, 1000);
}


//iterates through a user's game instance, returning the highest scoring game 
function highestScore(games){
    let currentHigh = 0 
    for (const game of games){
        currentHigh = Math.max(currentHigh, game.score)
    }
    return currentHigh
}


//returns a random 
//used to get a random index from the element name array 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//create element helper function 
function createEl(el){
    return document.createElement(el)
}




