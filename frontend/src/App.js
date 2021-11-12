import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateCompany from "./components/CreateCompany";
import CompanyView from "./components/CompanyView";
import CompaniesView from "./components/CompaniesView";
import Splash from "./components/Splash";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Splash/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create-company">
            <CreateCompany/>
          </Route>
          <Route path="/company">
            <CompanyView/>
          </Route>
          <Route path="/companies">
            <CompaniesView/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
