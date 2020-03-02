import MyLibrariesPage from 'containers/Patron/MyLibrariesPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  { path: '/references/:id?', url:"/references", name: 'My references', component: ReferencesPage, header: true, roles: ['registered'],
    children: [
      { path: '/references/new', icon: "plus", name: 'Create new reference', component: ChangePassword, },
    ]
  },
  
  { path: '/searches', name: 'My searches', component: ChangePassword, header: true, },

  { path: '/requests', name: 'My requests', component: ChangePassword, header: true, permissions: ['can-request'] },

  { path: '/my-libraries', name: 'My libraries', component: MyLibrariesPage, header: true},
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

export default patronRoutes;
