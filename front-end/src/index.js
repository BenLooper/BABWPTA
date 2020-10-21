//Global Variables
let table = document.querySelector('.periodic')

//URLs
let baseUrl = 'http://localhost:3000'
let sessionsUrl = '/sessions'




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

    let passInput = createEl('input')
    passInput.id = 'pass'
    passInput.type = 'password'

    let submit = createEl('input')
    submit.type = 'submit'

    form.append(userInput,passInput,submit)
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
            console.log(user)
        }
        else{
            inputForm.append(user.error)
        }
    })
}

//create element helper function 
function createEl(el){
    return document.createElement(el)
}


//login button
const loginCell = document.querySelector("#login-cell")
let loginButton = document.createElement('button')
loginButton.innerText = "Login"
loginButton.id = "login-button"
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
gameCell.append(gameButton)

//score button
const scoreCell = document.querySelector("#score-cell")
let scoreButton = document.createElement('button')
// scoreButton.innerText = `score: ${game.score}`
scoreButton.innerText = "Score: 0"
scoreButton.id = "score-button"
scoreCell.append(scoreButton)

//timer countdown
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let timerButton = document.createElement('button')
        timerButton.id = "timer-button"

    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `Time Left: ${seconds} secs`;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let thirtySeconds = 30,
        timerCell = document.querySelector('#timer-cell');
    startTimer(thirtySeconds, timerCell);
};


