import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnimalPage from "./pages/animalPage/AnimalPage";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import LandingPage from "./pages/landingPage/LandingPage";
import Nav from "./components/Nav/Nav";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://animzon.herokuapp.com",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <Router>
        <ApolloProvider client={client}>
          <Nav />
          <Switch>
            <Route exact strict path="/" component={LandingPage} />
            <Route exact strict path="/products/:slug" component={CategoryPage} />
            <Route exact strict path="/product/:slug" component={AnimalPage} />
          </Switch>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;
