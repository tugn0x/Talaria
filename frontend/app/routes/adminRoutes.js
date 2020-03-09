import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const adminRoutes = [
  { path: '/users',  name: `UsersList`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/user/new', name: `UserUpdate`, component: UserPage, sidebar: true },
      { path: '/user/:id?', name: `UserUpdate`, component: UserPage },
      { path: '', exact: true, name: `UsersList`, component: UsersListPage },
    ]
  },
];

export default adminRoutes;
