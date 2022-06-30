import React from 'react';
import Main from './Components/Main';
import Home from './Components/Home';
import Signup from './Components/Signup';
import { Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/home" exact>
          <Main/>
        </Route>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/signin" exact>
          <Home/>
        </Route>
        <Route path="/signup" exact>
          <Home/>
        </Route>
      </div>
    );
  }
}

export default App;
