import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import PlayBar from './components/PlayBar';
import Home  from './pages/Home';
import Genres from './pages/Genres';
import AllReleases from './pages/AllReleases';



export default function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <div className="custom-container pl-5 pr-5">
        <Header></Header>
        <Switch>
          <Route path="/genres">
            <Genres />
          </Route>
          <Route path="/all-releases">
            <AllReleases />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <PlayBar></PlayBar>
      </div>
    </Router>
  );
}


