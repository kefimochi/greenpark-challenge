import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/global.scss';

import Profile from './components/profile';
import EditProfile from './components/editProfile';
import List from './components/list';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={List} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/edit/:id" component={EditProfile} />
      </Router>
    </div>
  );
};

export default App;
