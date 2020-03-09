import MyLibrariesPage from 'containers/Patron/MyLibrariesPage/Loadable';
import MyLibrariesListPage from 'containers/Patron/MyLibrariesListPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';
import ReferencesListPage from 'containers/Patron/ReferencesListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  { path: '/references', name: `Reference`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
      { path: '/reference/new', icon: "plus", name: `ReferenceNew`, url: `/references/reference/new`, component: ReferencesPage, sidebar: true},
      { path: '/reference/:id?', name: `ReferenceUpdate`, component: ReferencesPage, },
      { path: '/:page?', exact: true, name: `ReferenceList`, url: `/references/reference`, component: ReferencesListPage, },
    ]
  },
  
  { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },
  { path: '/requests', name: `Requests`, component: ChangePassword, header: true, permissions: ['can-request'] },
  
  { path: '/my-libraries', name: `Libraries`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/my-library/new', icon: "plus", name: `LibraryNew`, url: `/my-libraries/my-library/new`, component: MyLibrariesPage, sidebar: true},
      { path: '/my-library/:id?', name: `Libraries`, component: MyLibrariesPage, },
      { path: '/:page?', exact: true, name: `Libraries`, url: `/my-libraries`, component: MyLibrariesListPage, },
    ]
  },
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

export default patronRoutes;
