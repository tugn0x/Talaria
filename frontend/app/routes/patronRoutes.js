import MyLibrariesPage from 'containers/Patron/MyLibrariesPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  { path: '/references/:id?', url:"/references", name: `Reference`, component: ReferencesPage, header: true, roles: ['registered'],
    children: [
      { path: '/references/new', icon: "plus", name: `ReferenceNew`, component: null, },
    ]
  },
  
  { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },

  { path: '/requests', name: `Requests`, component: ChangePassword, header: true, permissions: ['can-request'] },

  { path: '/my-libraries', name: `Libraries`, component: MyLibrariesPage, header: true},
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

export default patronRoutes;
