import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import Course from "./components/Course";
import CustomNavbar from "./components/CustomNavbar";
import Department from "./components/Department";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const {processing} = useSelector((state) => state.logIn)

  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop>
          <CustomNavbar/>
          {processing
          ? <Loader/>
          :
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
            </Switch>
          }
          <Footer/>
        </ScrollToTop>
      </HashRouter>
    </div>
  );
}

export default App;
