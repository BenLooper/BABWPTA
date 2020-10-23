//Global Variables
const table = document.querySelector('.periodic')
const elementDetails = document.querySelectorAll('.at_details')

const profileDetailsCell = document.querySelector("#profile-cell")
const profilePicCell = document.querySelector("#profile-pic-cell")
const gameHistoryCell = document.querySelector("#game-hist-cell")

const promptCellSelect = document.querySelector("#select")
const promptCellElement = document.querySelector("#select-element")
const reactionCell = document.querySelector('#reaction-cell')
const highScoreCell = document.querySelector("#high-cell")
const scoreCell = document.querySelector("#score-cell")
let scoreButton = document.createElement('button')
scoreButton.id = "score-button"
let timerCell = document.querySelector('#timer-cell')
timerCell.style.border = '0px'


// Stores current user info 
let currentUser 

//URLs
const baseUrl = 'http://localhost:3000'
const sessionsUrl = '/sessions'
const gamesUrl = '/games' 
const usersUrl = '/users'


//login button
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
logoutButton.addEventListener('click', () => logout())
logoutCell.append(logoutButton)

//signup button
const signupCell = document.querySelector("#signup-cell")
let signupButton = document.createElement('button')
signupButton.innerText = "Sign Up"
signupButton.id = "signup-button"
signupButton.addEventListener('click', () => addSignUpForm())
signupCell.append(signupButton)

//start game button
const gameCell = document.querySelector("#game-cell")
let gameButton = document.createElement('button')
gameButton.innerText = "Start Game"
gameButton.id = "game-button"
gameButton.addEventListener('click', () => quizModeOn())
gameCell.append(gameButton)

//title image
let titleCell = document.querySelector('#title-cell')
let titleImage = document.createElement("img")
console.log(titleImage)

titleImage.src = "/Users/admin/Flatiron/code/BABWPTA-6/valence-image-dark.jpg"
titleImage.id = "title-image"
titleCell.append(titleImage)

//sets up table for quiz mode 
function quizModeOn(){

    removeForms();

    //Border timer cell
    timerCell.style.border = '2px solid rgba(0, 160, 96, 0.9)'

    //start the timer 
    let thirtySeconds = 30
    
    startTimer(thirtySeconds, timerCell);

    promptCellSelect.innerText = "Select the"
    promptCellElement.innerText = "element:  "

    
    scoreCell.append(scoreButton)

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
//After 10 seconds, saves the game with whatever reaction was chose ('' if none)
function quizModeOff(runTimer){
    
    //stops the function that setTimer runs in quizModeOn
    clearInterval(runTimer);
    
    //set the timer cell (otherwise it just says 0 seconds left)
    timerCell = document.querySelector('#timer-cell');
    timerCell.textContent = "TIME'S UP"

    //choose a reaction for the last quiz 
    renderReactionSelection();

    //remove event listeners from the cells
    removeCellListeners();

    //un-hides the text by undoing the font-size change 
    elementDetails.forEach(element => element.style = '')

    
    
    //submits the score and reaction choice after 5 seconds
    setTimeout(saveGameHandler,5000);

}

//Creates form to login with, currently appends the form to bottom of the table on button click
function addLoginForm(){

    // //clear table of any existing forms
    removeForms();

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
            renderProfileDetails(user);
            inputForm.remove();
        }
        else{
            let form = createEl('form')
            form.id = 'message-form'
            form.innerText = "Incorrect user or password"
            inputForm.append(form)
            setTimeout(() => {inputForm.removeChild(form)},3000)
        }
    })
}


//populates page with user specific data 
function renderProfileDetails(user){
  
    //clears the profile pic cell in case there's already something there
    removeAllChildNodes(profilePicCell)
    removeAllChildNodes(profileDetailsCell)
    removeAllChildNodes(gameHistoryCell)
    removeForms();

    currentUser = user 

    //edit game history button
    let viewGamesButton = document.createElement('button')
    viewGamesButton.innerText = "Games"
    viewGamesButton.id = "game-hist-button"
    viewGamesButton.addEventListener('click', function(){
        if (currentUser.games.length > 0){
            removeForms();
            for (const game of currentUser.games){
                addGamesForm(game);
            }}
        else{
            removeForms();
            let form = createEl('form')
            form.id = 'message-form'
            form.innerText = "You don't have any games saved. Play a game to see it here!"
            table.append(form)
        }
    })
    gameHistoryCell.append(viewGamesButton)

    //edit profile button
    let editProfileButton = document.createElement('button')
    editProfileButton.innerText = "Profile"
    editProfileButton.id = "edit-profile-button"
    editProfileButton.addEventListener('click', () => addEditForm())
    profileDetailsCell.append(editProfileButton)

    let image = document.createElement('img')
    image.src = user.image_url
    image.id = "profile-pic"

    profilePicCell.append(image)

    //high score cell's inner text
    highScoreCell.id = "high-score-cell"
    highScoreCell.innerText = `High Score: ${(highestScore(user.games))}`
    highScoreCell.style.border = '2px solid rgba(0, 160, 96, 0.9)'

}


//Creates form to login with, currently appends the form to bottom of the table on button click
function addSignUpForm(){

    removeForms();

    let form = createEl('form')
    form.id = 'login-form'
    form.addEventListener('submit', function(e){
        e.preventDefault();
        signUp(e.target);
    })

    let userNameInput = createEl('input')
    userNameInput.id = 'username'
    userNameInput.type = 'text'
    userNameInput.placeholder = "Enter Valid Email Address"

    let nameInput = createEl('input')
    nameInput.id = 'name'
    nameInput.type = 'text'
    nameInput.placeholder = "Enter Name"

    let imageInput = createEl('input')
    imageInput.id = 'image'
    imageInput.type = 'text'
    imageInput.placeholder = "Enter Profile Picture URL"

    let passInput = createEl('input')
    passInput.id = 'passInit'
    passInput.type = 'password'
    passInput.placeholder = "Enter Password"

    let passConfInput = createEl('input')
    passConfInput.id = 'passConf'
    passConfInput.type = 'password'
    passConfInput.placeholder = "Confirm Password"

    let submit = createEl('input')
    submit.type = 'submit'
    submit.id = "create-submit-btn"

    form.append(userNameInput,nameInput,imageInput,passInput,passConfInput,submit)
    table.append(form)
}


//Based on login info, either logs a user in and populates page w/their data
//or returns "user not found"
function signUp(inputForm){
    fetch(`${baseUrl}${usersUrl}`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({
            username:inputForm.username.value,
            name: inputForm.name.value,
            password: inputForm.passInit.value,
            passConf: inputForm.passConf.value,
            image_url: inputForm.image.value
        })
    })
    .then(res=>res.json())
    .then(user => {
        renderProfileDetails(user);
        inputForm.remove();
    })
}


//creates new game instance after a quiz is completed 
const saveGameHandler = function saveGame(){
    
    //get chosen reaction 
    let reaction = reactionCell.children[1].value
    
    //get ending score 
    let scoreButton = document.querySelector('#score-button')
    let finalScore = parseInt(scoreButton.innerText.match(/\d/))
    
    //remove option to react 
    reactionCell.innerText = ''
    let highScoreButton = document.querySelector('#high-score-button')

    //clear quiz mode stuff 
    timerCell.innerText = ''
    timerCell.style.border = '0px'
    removeAllChildNodes(scoreCell);
    promptCellSelect.innerText = ''
    promptCellElement.innerText = ''
    let answer = document.querySelector('#answer-cell')
    answer.innerText = ''

    fetch(`${baseUrl}${gamesUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "score": finalScore,
            "reaction": reaction,
            "user_id": currentUser.id
        })
    })
    .then(res => res.json())
    .then(games => {
        highScoreCell.innerText = `High Score: ${(highestScore(games))}`
        currentUser.games = games
    })
}


function addEditForm(){

    removeForms();

    let form = createEl('form')
    form.id = 'login-form'
    form.addEventListener('submit', function(e){
        e.preventDefault();
        editProfile(e.target);
    })

    let userNameInput = createEl('input')
    userNameInput.id = 'username'
    userNameInput.type = 'text'
    userNameInput.value = currentUser.username

    let nameInput = createEl('input')
    nameInput.id = 'name'
    nameInput.type = 'text'
    nameInput.value = currentUser.name

    let imageInput = createEl('input')
    imageInput.id = 'image'
    imageInput.type = 'text' 
    imageInput.value = currentUser.image_url

    let submit = createEl('input')
    submit.type = 'submit'
    submit.value = 'Update Profile'
    submit.id = "create-submit-btn"

    let delBtn = createEl('input')
    delBtn.type = 'button'
    delBtn.value = 'Delete Account'
    delBtn.id = "delete-user-btn"
    delBtn.addEventListener('click', () => delUser())

    form.append(nameInput, userNameInput, imageInput, submit, delBtn)
    table.append(form)
}


function editProfile(inputForm){
    fetch(`${baseUrl}${usersUrl}/${currentUser.id}`, {
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({
            username:inputForm.username.value,
            name: inputForm.name.value,
            image_url: inputForm.image.value
        })
    })
    .then(res=>res.json())
    .then(user => {
        renderProfileDetails(user);
        inputForm.remove();
        let form = createEl('form')
        form.id = 'message-form'
        form.innerText = "Profile Updated"
        table.append(form)
        setTimeout(removeForms,3000)
    })
}

//makes a form for a given game instance, can change reaction or delete game record
function addGamesForm(game){

    let form = createEl('form')
    form.id = 'login-form'
    form.addEventListener('submit', function(e){
        e.preventDefault();
        editGame(e.target,game.id);
    })

    let score = createEl('span')
    score.id = 'high-score-history'
    score.innerText = `Score: ${game.score}`

    let reactionLabel = document.createElement('span')
    reactionLabel.id = 'reaction-label'
    reactionLabel.innerText = "Reaction: "

    let reactions = ['😤', '🤓', '🤬', '😩', '😭', '😎']
    let reactionSelection = makeReactionList(reactions,game.reaction)
    reactionSelection.id = 'reaction'

    let submit = createEl('input')
    submit.type = 'submit'
    submit.value = 'Update Reaction'
    submit.id = "update-reaction-btn"

    let delBtn = createEl('input')
    delBtn.type = 'button'
    delBtn.value = 'Delete Game'
    delBtn.id = "hist-delete-btn"
    delBtn.addEventListener('click', () => delGame(game))

    form.append(score,reactionLabel, reactionSelection,submit,delBtn)
    table.append(form)
}


function editGame(inputForm,gameID){
    fetch(`${baseUrl}${gamesUrl}/${gameID}`, {
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({
            reaction: inputForm.reaction.value,
        })
    })
    .then(res=>res.json())
    .then(user => {
        let form = createEl('form')
        form.id = 'message-form'
        form.innerText = "Reaction Updated"
        inputForm.append(form)
        setTimeout(() => inputForm.removeChild(form),3000)
        currentUser = user
    })
}


//"logout" a user --> sets the session id to nil and removes all user specific stuff
function logout(){
    removeAllChildNodes(profilePicCell)
    removeAllChildNodes(profileDetailsCell)
    removeAllChildNodes(gameHistoryCell)
    removeForms();
    highScoreCell.innerText = ""
    highScoreCell.style.border = '0px'
    sessionID = null
    let form = createEl('form')
    form.id = 'message-form'
    form.innerText = "Logged out, goodbye!"
    table.append(form)
    setTimeout(removeForms,3000)
}


//permanently delete user from DB
function delUser(){
    fetch(`${baseUrl}${usersUrl}/${currentUser.id}`, {
        method:"DELETE"
    })
    .then(() => {
        removeForms();
        let form = createEl('form')
        form.id = 'message-form'
        logout();
        form.innerText = "User Deleted"
        table.append(form)
    })
}


//permanently delete game from DB
function delGame(game){
    fetch(`${baseUrl}${gamesUrl}/${game.id}`, {
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({
            user: currentUser.id
        })
    })
    .then(res=>res.json())
    .then(user => {
        currentUser = user
        removeForms();
        let form = createEl('form')
        form.id = 'message-form'
        form.innerText = "Game Deleted"
        table.append(form)
        setTimeout(() => {table.removeChild(form)},3000)
        for (const game of currentUser.games){
            addGamesForm(game);
        }
    })
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
        
        //change color of tile for 1 second
        element.parentElement.style.backgroundColor = 'yellow'
        setTimeout(() => {element.parentElement.style.backgroundColor = ''}, 500)

        //this looks confusing -- all it's doing is finding the number in "Score: 1" and incrementing it 
        let currentScore = parseInt(scoreButton.innerText.match(/\d/))
        scoreButton.innerText = scoreButton.innerText.replace(/\d/, (currentScore + 1))
        
        assignRandomElement(names);
    }

    //else it turns the element red or something idk
    else{
        element.parentElement.style.backgroundColor = 'red'
        setTimeout(() => {element.parentElement.style.backgroundColor = ''}, 500)
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
    //randomly selects by doing (length - somenumber) -- 70 here to make it easier
    answer.innerText = (names[getRandomInt(names.length-100)])

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
        display.textContent = "Time Left: " + '\n' + seconds + "sec";
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


//renders reaction selection in reaction cell
function renderReactionSelection(){

    reactionCell.id = "reaction-cell"

    let selectionLabel = document.createElement('label')
    selectionLabel.innerText = "Reaction:"
    
    let reactions = ['😤', '🤓', '🤬', '😩', '😭', '😎']
    let reactionSelection = makeReactionList(reactions)
    
    reactionCell.append(selectionLabel,reactionSelection)
}

//given an array of strings, makes a selection list of those items
function makeReactionList(reactions,selected=""){
    let select = document.createElement('select')
    select.id = "drop-down"
    
    for (const reaction of reactions){
        let option = document.createElement('option')
        option.id = "drop-down-items"
        option.innerText = reaction 
        if (option.innerText == selected){
            option.selected = true
        }
        select.append(option)
    }

    return select
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


//removes all child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


//removes all forms from bottom of table
function removeForms(){
    while (table.lastElementChild.id == "login-form" || table.lastElementChild.id == "message-form" ){
        table.removeChild(table.lastElementChild)
        }
}
