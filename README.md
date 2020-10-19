
## Possible App Names:
- elemental
- BABWPTA
- periodic
- science, competitiveness, learning-based, etc.
- Valence
- 
- 
#
### Technical Description: 
description here

### App Description:
description here

-----
## Instructions:
### Click [here](http://localhost:3000/) to begin the application!
----

## Models & Relationships

### User | Game Session 

<br />

### User <br />
* A User has many Game Sessions <br />

### Game Session <br />
* A Game Session belongs to a User <br />
----

## SQL Database Table Properties
### User Table Properties
* First Name
* Username (email address)
* Password
* Profile Image URL
* Password Digest (authentication)

### Games Table Properties 
* Score (fixed)
* Duration (fixed)
* Reaction (can change)
* Foreign Key (User)

--------

## CRUD Functionality, aka User Stories
"." Designates class methods | "#" Designates instance methods

### Create
* User can create a new User account

        UsersController#new
        UsersController#create
* User can create a reaction following a Game session
        
        GamesController#new
        GamesController#create

#
### Read
* User can view User account details

        UsersController#show
* User can view Game session details

        GamesController#show
#
### Update
* User can update User account details

        UsersController#edit
        UsersController#update
* User can update their reaction for a Game

        GamesController#edit
        GamesController#update
#
### Delete:
* User can deactivate one's own account

        UsersController#destroy
* User can delete their reaction associated with a Game session

        GamesController#destroy

#
## Techincal-Specific Tasks:
* User's highest streak 
* On hover displays:
  * Element number
  * full name,
  * group name (ex: Noble Gases), 
  * mass,
  * image showing valence electrons

## Styling-Specific Tasks:
* Hover feature on learning page (landing page) that displays info about an element
* Hover changes color of element so you know you're looking at a specific one 
* Colorized periodic tables by element 
* Timing feature during Game (30 seconds)
* Fancy loading feature ("exhales" info onto page)
#
## Additional Methods, aka Stretch Goals:

* Multiple Difficuly Levels (easy, medium, hard)

* Index Page of all games (high score page)

#
## Related Information
<br/>

### Video Demo:
 [Video Demo Link](https://video.com/blahblahblah)

### Difficulties/Things Learned:
* 

### Changes/Modifications/Additions:
* 


### Highlights
* 

-----

monday (planning)
- create readme
- think of app name
- clean up related information
- complete technical and app description
- add stretch goals to readme
- map out navigation of index/show/new/edit pagesn

tuesday (functionality)
- build models, migrations, seeds, controllers, views
- work on model methods
- work on controllers & show pages
- change name of rails lab, if possible

wednesday (dry code & aesthetics)
- clean up navagation
- work on simple login validation
- DRY (partials, before_action, etc.)
- authentificaion? cookies & sessions?
- front-end focus on HTML/CSS/Bootstrap

thursday (finishing up)
- specify route resources
- finish any back-or front end
- add more seeds for walkthrough, if needed
- finish things learned/highlights/difficulties, etc
- create walkthrough to record

friday (presenting)
- record walkthrough
- update readme with any changes
- Present
