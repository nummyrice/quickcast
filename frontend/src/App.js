import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import CreateCompany from "./components/CreateCompany";
// import CompanyView from "./components/CompanyView";
// import CompaniesView from "./components/CompaniesView";
import Splash from "./components/Splash";
// import CreateProduction from "./components/CreateProduction";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Main from "./components/Main";

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
          <Route exact path='/welcome-to-quickcast'>
            <Splash/>
          </Route>
          <ProtectedRoute path='/'>
            <Main/>
          </ProtectedRoute>
          {/* <Route path="/signup">
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
          <Route>
            <CreateProduction path="/create-production"/>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
