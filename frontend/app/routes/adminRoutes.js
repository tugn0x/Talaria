import UsersList from 'containers/Admin/UsersList/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const adminRoutes = [
  { path: '/users-list', name: `UsersList`, component: UsersList, header: true },
];

export default adminRoutes;
