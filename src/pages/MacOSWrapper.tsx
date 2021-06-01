import React from "react";
import { Provider } from "react-redux";
import MacOSApp from "../operatingSystems/macOS";
import store from "../operatingSystems/macOS/redux/store";

function MacOSWrapper() {
  return (
    <Provider store={store}>
      <MacOSApp />
    </Provider>
  );
}

export default MacOSWrapper;
