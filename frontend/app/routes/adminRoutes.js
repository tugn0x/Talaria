import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const adminRoutes = [
  { path: '/users',  name: `UsersList`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/user/new', name: `UserNew`, component: UserPage },
      { path: '/user/:id?', name: `UserUpdate`, component: UserPage },
      { path: '/:page?', exact: true, name: `UsersList`, url: `/users/user`, component: UsersListPage, header: true },
    ]
  },
];

export default adminRoutes;
