import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
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
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
