import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";

import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import Gallery from "./pages/Gallery";
import Forum from "./pages/Forum";
import SingleThought from "./pages/SingleThought";

import "./index.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="  dark:bg-black/90 text-black/90 dark:text-white text-sm">
        <StoreProvider>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
