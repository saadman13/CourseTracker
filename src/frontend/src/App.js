import React from 'react';
import Main from './Components/Main';
import Home from './Components/Home';
import Signup from './Components/Signup';
import { Route } from 'react-router-dom';
import Signin from './Components/Signin';
import CourseDetails from './Components/CourseDetails';


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
        <Route path="/courseDetails/:id" exact>
          <CourseDetails />
        </Route>
        <Route path="/signin" exact>
          <Home isSignup={false} />
        </Route>
        <Route path="/signup" exact>
          <Home isSignup={true}/>
        </Route>
      </div>
    );
  }
}

export default App;
