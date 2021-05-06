# Your project's name
​
## Description
​
Short description of your app's purpose. 
​
## User stories (MVP)
​
*Complete with your own functionalities for the MVP (remember, be realistic!):*
​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
​
**Homepage** - As a user I want to be able to access the homepage so that I can...
​
**Sign up** - As a user I want to sign up on the webpage so that I can...
​
**Log in** - As a user I want to be able to log in on the webpage so that I can...
​
**Log out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​
**Profile** - As a user I want to be able to see my profile and edit it
​
​
​
## Backlog / Nice to have
​
*If you finished your MVP, what other functionalities would you like to add to your app? (User stories). Here's an example:*
​
**Theme** - As a user I want to be able to choose from a dark or light theme for my app
​
​
## Routes
​
| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /login        |
​
## Models
​
User model
​
```js
{
    firstName: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    location: Array,
    age: Number
}
```
​
## Links
​
### Github kanban
​
[Link to my project]()
​
### Github repository
​
[Link Repo]()
​
### Project deploy
​
[Link Deploy]()
​
### Wireframes
​
[InVision with Wireframes]()
​
### Slides
​
URls for the project presentation
[Link Slides.com]()
