import React from 'react';

import MyLibrariesPage from 'containers/Patron/MyLibrariesPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  { path: '/my-libraries', name: 'My libraries', component: MyLibrariesPage },
  { path: '/request-access', name: 'Request access', component: ChangePassword },
];

export default patronRoutes;
