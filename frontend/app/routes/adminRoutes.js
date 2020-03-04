import UsersList from 'containers/Admin/UsersList/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const adminRoutes = [
  { path: '/users-list/:id?', url:'/users-list', name: `UsersList`, component: UsersList, header: true, 
    children: [
      { path: '/users-list/new', icon: "plus", name: `UserNew`, component: null, },
    ]
  },
];

export default adminRoutes;
