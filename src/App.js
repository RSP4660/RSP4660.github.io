import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Course from "./components/Course";
import CustomNavbar from "./components/CustomNavbar";
import Department from "./components/Department";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <CustomNavbar/>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route path="/department/:deptId">
              <Department/>
            </Route>
            <Route path="/course/:courseCode">
              <Course/>
            </Route>
            <Route path="/loader">
              <Loader/>
            </Route>
          </Switch>
          <Footer/>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
