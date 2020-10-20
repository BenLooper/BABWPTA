let table = document.querySelector('.periodic')
let loginBtn = document.querySelectorAll('.button')[0]
let createAccountBtn = document.querySelectorAll('.button')[1]
let baseUrl = 'http://localhost:3000'
let sessionsUrl = '/sessions'



loginBtn.addEventListener('click', function(){
    addLoginForm();
})

createAccountBtn.addEventListener('click', function(){
    console.log('hey')
})


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