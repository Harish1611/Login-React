import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStoredStatus = localStorage.getItem("isLoggedIn");
    if (localStoredStatus === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, college, password) => {
    localStorage.setItem("isLoggedIn", "1");

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
        }}
      >
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
