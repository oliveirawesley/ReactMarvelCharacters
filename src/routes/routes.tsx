import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../views/Home';
import CharacterDetail from '../views/CharacterDetail';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/character/:id" component={CharacterDetail} />
  </Switch>
);

export default Routes;
