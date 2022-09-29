import React, { useState, useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import SnackbarProvider from "react-simple-snackbar";

import Header from "./components/Header";
import Gallery from "./layouts/Gallery";

import UserContext from "./context/UserContext";

import userActions from "./redux/actions/user";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _user = userActions.getUser();
    setUser(_user);
  }, []);

  return (
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <SnackbarProvider>
          <Header />
          <Gallery />
        </SnackbarProvider>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
