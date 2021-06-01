import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "react-router";
import { Footer } from "components/Footer";
import { createGlobalStyle } from "styled-components";

// import "./index.tailwind.css";
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
const ReplWorkspace = lazy(() => import("./components/ReplWorkspace"));
const ReplEmbedded = lazy(() => import("./components/ReplEmbedded"));
const Termy = lazy(() => import("./pages/Termy"));
const UbuntuApp = lazy(() => import("./operatingSystems/Ubuntu/App"));
const TrelloBoard = lazy(() => import("./components/TrelloBoard"));
const TrelloCardComponent = lazy(() => import("./components/TrelloCard"));
const NotFound = lazy(() => import("./pages/Error"));
const HomeTerminal = lazy(() => import("pages/HomeTerminalWrapper"));
const BlogTerminal = lazy(() => import("pages/BlogTerminalWrapper"));
const MacOSWrapper = lazy(() => import("pages/MacOSWrapper"));

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_NAME}</title>
      </Helmet>

      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={HomeTerminal} exact />
          <Route path="/blog" component={BlogTerminal} exact />
          <Route path="/replworkspace" component={ReplWorkspace} exact />
          <Route path="/ReplEmbedded" component={ReplEmbedded} exact />
          <Route path="/termy" component={Termy} exact />
          <Route path="/MacOS" component={MacOSWrapper} exact />
          <Route path="/Ubuntu" component={UbuntuApp} exact />
          <Route path="/trelloboard" component={TrelloBoard} exact />
          <Route path="/trellocard" component={TrelloCardComponent} exact />
          <Route component={NotFound} />
        </Switch>
      </Suspense>

      <Footer />
    </>
  );
};

export default App;
