import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const adminRoutes = [
  { path: '/users', exact: true,  name: `UsersList`, component: UsersListPage, header: true, 
    children: [
      { path: '/users/user/new', icon: "plus", name: `UserNew` },
    ]
  },
  { path: '/users/user/:id?', exact: true,  url:'/users/user', name: `UserUpdate`, component: UserPage } 
];

export default adminRoutes;
