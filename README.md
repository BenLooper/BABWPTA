
# valence.

### Technical Description: 
A single-page web application with CRUD functioning, utilizing:
* Interactivity (with JavaScript)
* Application Programming Interface (via Ruby on Rails)
* Object Relational Mapping (with ActiveRecord)
* SQL Databases (using sqlite3)
* Login Password Encryption

### App Description:
Valence is a gamified, interactive study tool for learning the periodic table of the elements. It was inspired by its creators, who share a love for science and games.

#

## Models & Relationships
<br>

        User | Game Session


### User <br />
* A User has many Game Sessions <br />

### Game Session <br />
* A Game Session belongs to a User <br />

#

## SQL Database Table Properties
### User Table Properties
* First Name
* Username (email address)
* Password
* Profile Image URL
* Password Digest (authentication)

### Games Table Properties 
* Score
* Reaction
* Foreign Key (User)

#

## CRUD Functionality, aka User Stories
"." Designates class methods | "#" Designates instance methods

### Create
* User can create a new User account

        UsersController#create
* User can create a reaction following a Game session
        
        GamesController#create

#
### Read
* User can view User account details

        SessionsController#create
* User can view Game session details

        SessionsController#create
#
### Update
* User can update User account details

        UsersController#update
* User can update their reaction for a Game

        GamesController#update
#
### Delete:
* User can deactivate one's own account

        UsersController#destroy
* User can delete their reaction associated with a Game session

        GamesController#destroy


#
## Related Information
<br/>

### Video Demo:
 [Video Demo Link](https://video.com/blahblahblah)

### Difficulties/Things Learned:
* Approaching core functionality and achieve it, both on front- and back-end
* Using a Grid Layout/Skeleton/Template
* Front-end workflow with JavaScript
* Having an understanding of Javascript to fully utilize CSS
  * CSS syntax and overall display

### Changes/Modifications/Additions:
* Multiple Difficuly Levels (easy, medium, hard)
* Index Page of all games of all Users (high score page)
* "Start Game" Button, when clicked twice, pauses timer
* Organization of Javascript file(s)
  * Separation of Responsibilites

### Highlights
* Github Workflow
  * Github Projects (cards to delegate tasks)
* Overall Task Delegation between Styling and Functionality
  * Each partner building on previous ideas of the other; scaffolding