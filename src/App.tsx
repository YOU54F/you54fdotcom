import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";

import { NotFound } from "./pages/Error";
import { Footer } from "components/Footer";
import { createGlobalStyle } from "styled-components";

import Terminal from "pages/Terminal";
import UbuntuApp from "./operatingSystems/Ubuntu/App";
import MacOSApp from "./operatingSystems/macOS";
import { ReplEmbedded } from "./components/ReplIt";
import { ReplWorkspace } from "./components/Repl";
import { TerminalContextProvider } from "react-terminal";
import { Provider } from "react-redux";
import store from "./operatingSystems/macOS/redux/store";

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
              <Terminal />
            </TerminalContextProvider>
          )}
          exact
        />
        <Route path="/replworkspace" component={ReplWorkspace} exact />
        <Route path="/ReplEmbedded" component={ReplEmbedded} exact />
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
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
};

export default App;
