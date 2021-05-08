# Your project's name
​
## Description
Podcast webapp to discover amazing podcast and create your own collections and share it with friends. 

The users are also able to rate and comment their favorite podcasts!
​
## User stories (MVP)
* **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​
* **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
​
* **Homepage** - As a user I want to be able to access the homepage so that I can search or browse among the most featured podcasts 
​
* **Sign up** - As a user I want to sign up on the webpage so that I can use the premium features.
​
* **Log in** - As a user I want to be able to log in on the webpage so that I can add the podcasts to my favorites, listen to them and leave a rating.
​
* **Log out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​
* **Profile** - As a user I want to be able to see my profile and edit it
​
​
​
## Backlog / Nice to have
* **Custom Home Page** - As a user I want to see my customise suggestions based on my preferences.
​
* **Leave Comments** - As a user I want to be able to comment on the podcast and leave my review.
​
* **Social Media Login** - As a user I want to be able to login with my social media accounts.
​
* **Custom Collections** - As a user I want to be able to create my customized collections.
​
​
## Routes
| Name            | Method | Endpoint                      | Description                                      | Body                                | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ----------------------------------  | --------------- |
| Home            | GET    | /                             | See the main page                                |                                     |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                     |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                    | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                     |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                    | /profile        |
| Profile         | GET    | /profile                      | See the user profile                             | {mail, username}                    |                 |
| Profile         | POST   | /profile/edit                 | Update the user profile                          | {mail, username}                    | /profile        |
| Podcast Card    | GET    | /podcast/{podcastID}       | See the podcast information                         | {podcastId, podcastInfo...}         |                 |
| Podcast Card    | POST   | /podcast/{podcastID}/favorited    | Add a podcast to users favorites             | {podcastId, podcastInfo...}         |/login or  /podcast/{podcastID}|
| Podcast Card    | POST   | /podcast/{podcastID}/rating    | Add a rating to a podcast                       | {podcastId, rating}                 |/login or  /podcast/{podcastID}|
| Favorites       | GET    | /{userId}/favorites           | See my favorited podcasts                        | {podcastId}                         |                  |
| Favorites       | GET    | /{userId}/favorites/{podcastId}/delete    | Delet a favorited podcast            | {podcastId}                          |/favorites       

## Models
### User
```js
{
    firstName: { 
      type: String,
      required: true
    },
    lastName: { 
      type: String,
      required: true
    },
    email:{ 
      type: String,
      required: [ true, 'Email is required,']
      unique: [ true, 'This email has already been registered.']
    },
    profilePicture: {
        Type: String,
        default: [look for an avatar]
    },
    hashedPassword: { 
      type: String,
      required: [ true, 'Password is required,']
    },
    { timestamp: true} 
}
```
### Favorited Podcast
```js
{ 
  audio: String,
  image: String,
  podcast: { Object } /* Object with the podcast episodes */,
  thumbnail: String,
  pub_date_ms: Date,
  guid_from_rss:"004f03c8-cdf9-4ff5-9d89-b2147f8d55cf" /* ? */,
  title_original: String,
  audio_length_sec: Number,
  explicit_content: Bolean,
  description_original: String,
  transcripts_highlighted:[ String ],
  usersIDs: {
      type: [mongoose.SchemaTypes.ObjectId]
  },
  rating: [ Numbers ],
  comments: [ mongoose.SchemaTypes.ObjectId ],
  { timestamp: true } 
}
```
### Comments
```js
{   
  content: String,
  author: mongoose.SchemaTypes.ObjectId,
  { timestamp: true } 
},
```
​
## Links
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
https://excalidraw.com/#room=9ca8cea4b63cce2e4076,DYERAHJrSXWUMBT5r_uscQ
​
### Slides
​
URls for the project presentation
[Link Slides.com]()
