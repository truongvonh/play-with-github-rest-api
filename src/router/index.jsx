import routes from 'router/config';
import { Route } from 'react-router-dom';
import React from 'react';

const renderRoutes = () =>
  routes.map((route, index) => (
    <Route
      key={index}
      {...route}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  ));

export default renderRoutes;
