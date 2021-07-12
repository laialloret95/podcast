# Podapp 🎧

## Description

Podcast webapp to discover amazing podcast and create your own collections and share it with friends.

The users are also able to rate and comment their favorite podcasts!

## User stories (MVP)

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
  ​
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
  ​
- **Homepage** - As a user I want to be able to access the homepage so that I can search by query or browse among genres
  ​
- **Query Results** - As a user I want to be able to access the results from a query search (by keyword)
  ​
- **Genre Results** - As a user I want to be able to access the results from a click on a genre button
  ​
- **Podcast Profile** - As a user I want to be able to access the profile of a Podcast, get all its information, save it as favourite and access the episodes
  ​
- **Episode Profile** - As a user I want to be able to access the episode and listen to it
  ​
- **Favourites** - As a user I want to be able to access my favourited podcasts
  ​
- **Sign up** - As a user I want to sign up on the webpage so that I can use the premium features
  ​
- **Log in** - As a user I want to be able to log in on the webpage so that I can add the podcasts to my favorites, listen to them and leave a rating.
  ​
- **Log out** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
  ​
- **Profile** - As a user I want to be able to see my profile and edit it
  ​
  ​
  ​

## Backlog / Nice to have

- **Custom Home Page** - As a user I want to see my customise suggestions based on my preferences.
  ​
- **Leave Comments** - As a user I want to be able to comment on the podcast and leave my review.
  ​
- **Social Media Login** - As a user I want to be able to login with my social media accounts.
  ​
- **Custom Collections** - As a user I want to be able to create my customized collections.
  ​
- **User Profile Picture** - As a user I want to be able to upload my profile picture.
  ​
- **API connection** - As a user I want to be able to browse among all API database
  ​
- **Log in redirection** - As a user I want to land on the page I was before logging in
  ​
  ​

## Routes

| Name         | Method | Endpoint                               | Description                      | Body                        | Redirects                      |
| ------------ | ------ | -------------------------------------- | -------------------------------- | --------------------------- | ------------------------------ |
| Home         | GET    | /                                      | See the main page                |                             |                                |
| Log in form  | GET    | /login                                 | See the form to log in           |                             |                                |
| Log in       | POST   | /login                                 | Log in the user                  | {mail, password}            | /                              |
| Sign Up form | GET    | /signup                                | See the form to sign up          |                             |                                |
| Sign Up      | POST   | /signup                                | Sign up a user                   | {mail, password}            | /profile                       |
| Profile      | GET    | /profile                               | See the user profile             | {mail, username}            |                                |
| Profile      | POST   | /profile/edit                          | Update the user profile          | {mail, username}            | /profile                       |
| Podcast Card | GET    | /podcast/{podcastID}                   | See the podcast information      | {podcastId, podcastInfo...} |                                |
| Podcast Card | POST   | /podcast/{podcastID}/favorited         | Add a podcast to users favorites | {podcastId, podcastInfo...} | /login or /podcast/{podcastID} |
| Podcast Card | POST   | /podcast/{podcastID}/rating            | Add a rating to a podcast        | {podcastId, rating}         | /login or /podcast/{podcastID} |
| Favorites    | GET    | /{userId}/favorites                    | See my favorited podcasts        | {podcastId}                 |                                |
| Favorites    | GET    | /{userId}/favorites/{podcastId}/delete | Delet a favorited podcast        | {podcastId}                 | /favorites                     |

## Models

### User

```js
    {
        firstName: {
          type: String,
          required: [ true, 'Name is required.']
        },
        lastName: {
          type: String,
          required: [ true, 'Last name is required.']
        },
        email:{
          type: String,
          required: [ true, 'Email is required,'],
          match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
          unique: [ true, 'This email has already been registered.'],
          lowercase: true,
          trim: true
        },
        preferences: ["Technology", "Business", "Sports", "Science", "Games"],
        profilePicture: {
            Type: String,
            default: "../images/avatar-icon.png"
        },
        hashedPassword: {
          type: String,
          required: [ true, 'Password is required.']
        }
    },
    { 
      timestamps: true 
    }
```

### Podcasts

```js
{
        title: {
            type: String
        },
        language: {
            type: String
        },
        audio: {
            type: String
        },
        audio_length: {
            type: Number
        },
        author: {
            type: String
        },
        description: {
            type: String
        },
        pub_date: {
            type: Date
        },
        image: {
            type: String
        },
        genre: {
            type: String
        },
        ratings: {
            type: [Number]
        },
        comments: {
            type: [ Schema.ObjectId ]
        }
    }
```

### Favorites

```js
{
  _id: ObjectId,
  podcastID: {type: [mongoose.SchemaTypes.ObjectId]},
  usersID: {type: [mongoose.SchemaTypes.ObjectId]},
  { timestamp: true }
}
```

### Comments

```js
{
  _id: ObjectId,
  content: {
     type: String,
     required: true
  },
  author: Schema.Types.ObjectId
},
{ 
  timestamps: true 
}
```

​

## Links

### Project deploy

​
[Link Deploy]()
​

### Wireframes

​
(![podapp-wireframes](https://user-images.githubusercontent.com/70531755/125267834-73ae2180-e307-11eb-8bb7-cb582b347265.png)

​

### Slides
​
URls for the project presentation
[Link Slides.com]()
