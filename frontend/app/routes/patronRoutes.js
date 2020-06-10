import MyLibraryPage from 'containers/Patron/MyLibraryPage/Loadable';
import MyLibrariesListPage from 'containers/Patron/MyLibrariesListPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';
import ReferencesListPage from 'containers/Patron/ReferencesListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/references', name: `Bibliography`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
      { path: '/reference/new', icon: "plus", name: `ReferenceNew`, url: `/references/reference/new`, component: ReferencesPage, sidebar: true},
      { path: '/reference/:id?', name: `ReferenceUpdate`, component: ReferencesPage, },
      { path: '/:page?', exact: true, name: `ReferenceList`, url: `/references`, component: ReferencesListPage,sidebar: true },
    ]
  },

//  { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },
  { path: '/requests', name: `Requests`, component: ChangePassword, header: true, permissions: ['can-request'] },

  { path: '/:library_id?/my-libraries', name: `MyLibraries`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/library/new', icon: "plus", name: `MyLibraryNew`, url: `/my-libraries/library/new`, component: MyLibraryPage, sidebar: true},
      { path: '/library/:id?', name: `Libraries`, component: MyLibraryPage, },
      { path: '/:page?', exact: true, name: `MyLibraries`, url: `/my-libraries`, component: MyLibrariesListPage, },
    ]
  },
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

// '/:library_id?/my-libraries'

export default routes;
