import React from 'react';
import SearchUsers from 'pages/SearchUsers';
import DetailUsers from 'pages/DetailUsers';

const routes = [
  {
    path: '/',
    component: SearchUsers,
    exact: true,
    routes: [],
  },
  {
    path: '/user/:user_name',
    exact: true,
    component: DetailUsers,
  },
];

export default routes;
