import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// Link to the GraphQL server on the backend
const httpLink = createHttpLink({
  uri: "/graphql",
});
// Instantiate the Apollo Client instance to connect to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // Instantiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Enable entire app to interact with the Apollo Client instance
    <ApolloProvider client={client}>
      {/* Makes the child components aware of the client-side routing that can take place */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            {/* Used with final component to act as a catch-all */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/thought" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
