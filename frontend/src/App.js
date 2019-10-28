import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/global.scss';

import List from './components/list';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={List} />
        {/* <Route path="/user/:id" component={Profile} /> */}
      </Router>
    </div>
  );
};

export default App;
