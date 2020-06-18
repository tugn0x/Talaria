import UserPage from 'containers/Library/UserPage/Loadable';
import UsersListPage from 'containers/Library/UsersListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';
import ManageLibraryPage from 'containers/Library/ManageLibraryPage'
import Fake from 'components/Fake';

const routes = [
  /*
  TODO: la path è /users, ma si tratta a tutti gli effetti dei library-users, cioè del collegamento tra utente Patron e Biblioteca
  la lista è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la create è POST /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la show è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
  l'update è PUT /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
   */
  {
    path: '/manage', name: `MyLibrary`, header: true, component: SubRouteSwitch, permissions: ['manage'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `MyLibrary`, component: ManageLibraryPage, sidebar: true, order:1},
      { path: '/services', name: `LibraryServices`, component: Fake,url: '/manage/services',sidebar: true, order:2  },
     ]
  },
  { /* TODO */
    path: '/borrowing', name: `Borrowing`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `Borrowing`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `BorrowingArchive`, component: Fake,url: '/borrowing/archive',sidebar: true, order:2  },
      { path: '/labels', exact: true, name: `Labels`, url: '/borrowing/labels', component: Fake,sidebar: true, order:3 },
     ]
  },
  { /* TODO */
    path: '/lending', name: `Lending`, header: true, component: SubRouteSwitch, permissions: ['manage','lend'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `Lending`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `LendingArchive`, component: Fake,url: '/lending/archive',sidebar: true, order:2  },
      { path: '/labels', exact: true, name: `Labels`, url: '/lending/labels', component: Fake,sidebar: true, order:3 },
     ]
  },
  { /* TODO */
    path: '/delivery', name: `Delivery`, header: true, component: SubRouteSwitch, permissions: ['manage','deliver'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `Delivery`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `DeliveryArchive`, component: Fake,url: '/delivery/archive',sidebar: true, order:2  },
      { path: '/pickup', name: `Pickup`, component: Fake,url: '/delivery/pickup', permissions: ['manage'],sidebar: true, order:3 },
     ]
  },
  {
    path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, permissions: ['manage','manage-users'], resource: {type: 'libraries', key: 'library_id',},
    children: [
     /*  { path: '/patron/new', icon: "plus", name: `LibraryUserNew`, url: `/patron/user/new`, component: ReferencesPage, sidebar: true}, */
      { path: '/patron/:id?',  name: `LibraryUser`, url:'/patrons/patron',  component: UserPage},
      { path: '', exact: true, name: `LibraryUsers`, component: UsersListPage, sidebar: true, order:1},
      /* TODO */
      { path: '/departmens',  name: `LibraryDepartments`, component: Fake,url: '/patrons/departments',permissions: ['manage','manage-users'],sidebar: true, order:2  },
    ]
  },
  {
    path: '/stats', name: `Stats`, component: Fake, header: true, permissions: ['manage','manage-users','borrow','lend'], resource: {type: 'libraries', key: 'library_id',},
  },
  {
    path: '/licenses', name: `Licenses`, component: Fake, header: true, permissions: ['manage','manage-licenses'], resource: {type: 'libraries', key: 'library_id',},
  }
];

export default routes;
