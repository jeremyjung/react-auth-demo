## Simple React Router v4 Auth example

### Description

This is a simple example of authentication using React with a json-server backend.  The application presents a login page as well as both public and protected routes.  The main purpose of this application is to demonstrate a basic login flow and how to restrict routes or change data based on the logged in user.

This app stores a list of games with the following restrictions:

1.  Anonymous users are allowed to view the home, about, and login pages.
2.	Normal users are also allowed to access the games route.
3.  Admin users are allowed to create or delete games.

If you are not familiar with React Router v4, I recommend you take a look at some of the samples in their [documentation](https://reacttraining.com/react-router/web/guides/quick-start).

### Running locally
```
git clone git@github.com:jeremyjung/react-auth-demo.git
cd react-auth-demo
npm install
cd client
npm install
cd ..
npm start
```

Open the app in your browser of choice at http://localhost:3000.  If you use Chrome, the debugger will use source maps to show individual files instead of just seeing the page as a single bundled file.

If another application is using port 3000, either close the app or look at the console to see if an alternate port has been selected.

### Authentication details
The application sends a basic http authentication request to the `/user_token` endpoint.  If the credentials are incorrect, a 401 status code will be returned.  If successful, a json payload will be returned in the following format:

```
{
	"username": "User1",
	"role": "Admin",
	"token": "tokengoeshere"
}
```

All subsequent requests should be made by filling in the Authorization header tag with the user's token. IE: `Bearer tokengoeshere`.  Providing this information gives the user access to certain restricted routes, such as the one that creates new games in the application.

### API details
Only admin users can use POST or DELETE on the /games route.

### Custom router components
Two custom components are used to assist with routing:

1.  RouteWithProps
	* React Router v4's match component makes it a little verbose to pass in props.  This wrapper component makes it possible to pass props to the component within by simply using a props object
	* This component was inspired by this [post](https://github.com/ReactTraining/react-router/issues/4293).
2.  PrivateRoute
	* This component restricts a route by showing the login page whenever a user attempts to view a route without being logged in
	* It looks at the context.auth.loggedIn boolean to determine if the user is logged in or not
	* This component was inspired by the authorization example in the [React Router documentation](https://reacttraining.com/react-router/web/example/auth-workflow).
