import MyLibraryPage from 'containers/Patron/MyLibraryPage/Loadable';
import MyLibrariesListPage from 'containers/Patron/MyLibrariesListPage/Loadable';
import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';
import ReferencesListPage from 'containers/Patron/ReferencesListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const patronRoutes = [
  /*
  TODO: la path è /users, ma si tratta a tutti gli effetti dei library-users, cioè del collegamento tra utente Patron e Biblioteca
  la lista è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la create è POST /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la show è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
  l'update è PUT /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
   */
  { path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
      { path: '/patron/new', icon: "plus", name: `LibraryUserNew`, url: `/patron/user/new`, component: ReferencesPage, sidebar: true},
      { path: '/patron/:id?', name: `LibraryUserUpdate`, component: ReferencesPage, },
      { path: '', exact: true, name: `LibraryUserPage`, component: ReferencesListPage, },
    ]
  },

  // { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },
  // { path: '/requests', name: `Requests`, component: ChangePassword, header: true, permissions: ['can-request'] },
  //
  // { path: '/my-libraries', name: `MyLibraries`, component: SubRouteSwitch, header: true,
  //   children: [
  //     { path: '/library/new', icon: "plus", name: `MyLibraryNew`, url: `/my-libraries/library/new`, component: MyLibraryPage, sidebar: true},
  //     { path: '/library/:id?', name: `Libraries`, component: MyLibraryPage, },
  //     { path: '/:page?', exact: true, name: `MyLibraries`, url: `/my-libraries`, component: MyLibrariesListPage, },
  //   ]
  // },
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

export default patronRoutes;
