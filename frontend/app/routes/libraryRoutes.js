import UserPage from 'containers/Library/UserPage/Loadable';
import UsersListPage from 'containers/Library/UsersListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';
import ManageLibraryPage from 'containers/Library/ManageLibraryPage'
const routes = [
  /*
  TODO: la path è /users, ma si tratta a tutti gli effetti dei library-users, cioè del collegamento tra utente Patron e Biblioteca
  la lista è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la create è POST /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la show è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
  l'update è PUT /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
   */
  {
    path: '/manage', name: `MyLibrary`, header: true, component: SubRouteSwitch, permissions: ['manage','manage-users'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `MyLibrary`, component: ManageLibraryPage },
     ]
  },
  { /* TODO */
    path: '/borrowing', name: `Borrowing`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `MyLibrary`, component: ManageLibraryPage },
     ]
  },
  { /* TODO */
    path: '/lending', name: `Lending`, header: true, component: SubRouteSwitch, permissions: ['manage','lend'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `MyLibrary`, component: ManageLibraryPage },
     ]
  },
  { /* TODO */
    path: '/delivery', name: `Delivery`, header: true, component: SubRouteSwitch, permissions: ['manage','deliver'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `Delivery`, component: UsersListPage },
      { path: '/pickup', name: `Pickup`, component: UsersListPage,url: '/delivery/pickup',sidebar: true },
     ]
  },
  {
    path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, permissions: ['manage','manage-users'], resource: {type: 'libraries', key: 'library_id',},
    children: [
     /*  { path: '/patron/new', icon: "plus", name: `LibraryUserNew`, url: `/patron/user/new`, component: ReferencesPage, sidebar: true}, */
      { path: '/patron/:id?',  name: `LibraryUser`, url:'/patrons/patron',  component: UserPage, },
      { path: '', exact: true, name: `LibraryUsers`, component: UsersListPage, },
    /* TODO */
      { path: '/departmens',  name: `LibraryDepartments`, component: UsersListPage,url: '/patrons/departments',sidebar: true  },
    ]
  },
];

export default routes;
