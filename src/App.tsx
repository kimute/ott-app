import React from 'react';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Header from './Components/Header';
import Home from './Routes/Home';
import Intro from './Routes/Intro';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
import SearchHeader from './Components/SearchHeader';
import Mylist from './Routes/Mylist';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
      <Route path={["/mylist", "/mylist/:movieId", "/mylist/recommend/:movieId"]}>
        <Header/>
          <Mylist/>
        </Route>
        <Route path={["/tv", "/tv/onair/:tvId", "/tv/onair/popular/:tvId"]}>
        <Header/>
          <Tv/>
        </Route>
        <Route path={["/search", "/search/:movieId"]}>
        <SearchHeader/>
          <Search/>
        </Route>
        <Route path={["/home", "/home/movies/:movieId", "/home/movies/upcomming/:movieId"]}>
        <Header/>
          <Home/>
        </Route>
        <Route path="/">
          <Intro/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
