import React from 'react';
import Main from './Components/Main';
import Home from './Components/Home';
import Signup from './Components/Signup';
import { Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/home">
          <Main/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </div>
    );
  }
}

export default App;
