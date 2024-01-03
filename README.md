<h5  align ="center"> 
  <H1 align ="center" > Speer- Assesment  </h1>
<br/>

##  Technologies used

This project was created using the following technologies.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware

  ####  Database 

 - [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.


## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

##  Key Features

Authentication Endpoints

-POST /api/auth/register: create a new user account.
-POST /api/auth/login: log in to an existing user account and receive an access token.

Note Endpoints

GET /api/user/notes: get a list of all notes for the authenticated user.
GET /api/user/notes/:id: get a note by ID for the authenticated user.
POST /api/user/notes: create a new note for the authenticated user.
PUT /api/user/notes/:id: update an existing note by ID for the authenticated user.
DELETE /api/user/notes/:id: delete a note by ID for the authenticated user.
POST /api/notes/:id/share: share a note with another user for the authenticated user.
GET /api/user/search: search for notes based on keywords for the authenticated user.

<br/>
