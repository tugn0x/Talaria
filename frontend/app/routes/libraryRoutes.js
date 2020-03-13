import UserPage from 'containers/Library/UserPage/Loadable';
import UsersListPage from 'containers/Library/UsersListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

const routes = [
  /*
  TODO: la path è /users, ma si tratta a tutti gli effetti dei library-users, cioè del collegamento tra utente Patron e Biblioteca
  la lista è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la create è POST /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la show è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
  l'update è PUT /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
   */
  {
    path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
     /*  { path: '/patron/new', icon: "plus", name: `LibraryUserNew`, url: `/patron/user/new`, component: ReferencesPage, sidebar: true}, */
      { path: '/patron/:id?', name: `LibraryUser`, url:'/patrons/patron',  component: UserPage, },
      { path: '', exact: true, name: `LibraryUsers`, component: UsersListPage, },
    ]
  },
];

export default routes;
