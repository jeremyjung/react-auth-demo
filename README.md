## Simple Auth example

### Description

This is a simple example of authentication using React with a json-server backend.  The application presents a login page as well as both public and protected routes.  The main purpose of this application is to demonstrate a basic login flow and how to restrict routes or change data based on the logged in user.

This app stores a list of games and has lists of games that are associated with a user called a "Playlist".  Anonymous users are allowed to view the list of games and their playlists.  Normal users are also allowed to access the "protected" route and view a list of their own playlists.  Admin users are allowed to create new games to add to the list.  The ability to create or modify playlists is not implemented.

### Running locally
```
git clone git@github.com:endlesscombo/react-auth-demo.git
cd react-auth-demo
npm install
cd client
npm install
cd ..
npm start
```

This should open up a browser running the application.  To quit, you'll have to hit ctrl-c twice.

### Authentication details
The react application sends a basic http authentication request to the `/user_token` endpoint.  If the credentials are incorrect, a 401 status code will be returned.  If successful, a json payload will be returned in the following format:

```
{
	"username": "User1",
	"role": "Admin",
	"token": "tokengoeshere"
}
```

All subsequent requests should be made by filling in the Authorization header tag with the user's token. IE: `Bearer tokengoeshere`.  Providing this information gives the user access to certain restricted routes, such as the one that creates new games in the application.

The example currently does not have proper authorization implemented.  As long as the user has a valid token they currently have access to all actions.

