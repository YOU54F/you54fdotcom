import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";

import { NotFound } from "./pages/Error";
import { Footer } from "components/Footer";
import { createGlobalStyle } from "styled-components";

import HomeTerminal from "pages/HomeTerminal";
import UbuntuApp from "./operatingSystems/Ubuntu/App";
import MacOSApp from "./operatingSystems/macOS";
import { ReplEmbedded } from "./components/ReplEmbedded";
import { ReplWorkspace } from "./components/ReplWorkspace";
import { TerminalContextProvider } from "react-terminal";
import { Provider } from "react-redux";
import store from "./operatingSystems/macOS/redux/store";
import BlogTerminal from "pages/BlogTerminal";
import { Termy } from "pages/Termy";
import { TrelloBoard } from "components/TrelloBoard";
import { TrelloCardComponent } from "components/TrelloCard";
import "./index.tailwind.css";
const GlobalStyles = createGlobalStyle`
  body {
    margin: auto 0;
    height: 100%;
    max-height: auto;
    overflow-y: scroll;
    background: #333;
    width: 100%;
    max-width: auto;
    display: block;
  }
`;

const App: React.FC = () => {
  console.log(process.env.REACT_APP_NAME);
  console.log(process.env.REACT_APP_GIT_BRANCH);
  console.log(process.env.REACT_APP_GIT_BRANCH);
  return (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_NAME}</title>
      </Helmet>

      <GlobalStyles />

      <Switch>
        <Route
          path="/"
          component={() => (
            <TerminalContextProvider>
              <HomeTerminal />
            </TerminalContextProvider>
          )}
          exact
        />
        <Route
          path="/blog"
          component={() => (
            <TerminalContextProvider>
              <BlogTerminal />
            </TerminalContextProvider>
          )}
          exact
        />
        <Route path="/replworkspace" component={ReplWorkspace} exact />
        <Route path="/ReplEmbedded" component={ReplEmbedded} exact />
        <Route path="/termy" component={Termy} exact />
        <Route
          path="/MacOS"
          component={() => (
            <Provider store={store}>
              <MacOSApp />
            </Provider>
          )}
          exact
        />
        <Route path="/Ubuntu" component={UbuntuApp} exact />
        <Route path="/trelloboard" component={TrelloBoard} exact />
        <Route path="/trellocard" component={TrelloCardComponent} exact />
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
};

export default App;
