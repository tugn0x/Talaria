import React from 'react';

import MyLibrariesPage from 'containers/Patron/MyLibrariesPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  { path: '/references', name: 'My references', component: ChangePassword, menu: true, roles: ['registered'] },
  { path: '/searches', name: 'My searches', component: ChangePassword, header: true, },
  { path: '/requests', name: 'My requests', component: ChangePassword, header: true, permissions: ['can-request'] },
  { path: '/my-libraries', name: 'My libraries', component: MyLibrariesPage, menu: true},
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

export default patronRoutes;
