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
      { path: '', exact: true, name: `Profile`, component: ManageLibraryPage,permissions: ['manage'], sidebar: true, order:1},
      // vari pezzi dei dati della biblio (dati servizio, dati anag, ...)
      { path: '/service', name: `Service`, component: Fake,url: '/manage/service',permissions: ['manage'],sidebar: true, order:2  },
      { path: '/linkingservices', name: `LinkingServices`, component: Fake,url: '/manage/linkingservices',permissions: ['manage'],sidebar: true, order:2  },
      { path: '/labels', exact: true, name: `Labels`, url: '/manage/labels', component: Fake,permissions: ['manage','borrow','lend','deliver'],sidebar: true, order:3 },
      { path: '/operators', name: `Operators`, component: Fake,url: '/manage/catalogs', permissions: ['manage'],sidebar: true, order:5 },
      { path: '/departments',  name: `Departments`, component: Fake,url: '/patrons/departments',permissions: ['manage','manage-users'],sidebar: true, order:4  },
      { path: '/pickup', name: `Pickup`, component: Fake,url: '/delivery/pickup', permissions: ['manage'],sidebar: true, order:5 },
      { path: '/catalogs', name: `Catalogs`, component: Fake,url: '/manage/catalogs', permissions: ['manage'],sidebar: true, order:5 },
      { path: '/protocols', name: `Protocols`, component: Fake,url: '/manage/protocols', permissions: ['manage'],sidebar: true, order:5 },
      
     ]
  },
  { 
    path: '/borrowing', name: `Borrowing`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `PendingRequests`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `ArchivedRequests`, component: Fake,url: '/borrowing/archive',sidebar: true, order:2  },
      
     ]
  },
  { 
    path: '/lending', name: `Lending`, header: true, component: SubRouteSwitch, permissions: ['manage','lend'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `PendingRequests`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `ArchivedRequests`, component: Fake,url: '/lending/archive',sidebar: true, order:2  },
      
     ]
  },
  {
    path: '/delivery', name: `Delivery`, header: true, component: SubRouteSwitch, permissions: ['manage','deliver'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', exact: true, name: `PendingRequests`, component: Fake,sidebar: true, order:1 },
      { path: '/archive', name: `ArchivedRequests`, component: Fake,url: '/delivery/archive',sidebar: true, order:2  },
     ]
  },
  {
    path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, permissions: ['manage','manage-users'], resource: {type: 'libraries', key: 'library_id',},
    children: [
     /*  { path: '/patron/new', icon: "plus", name: `LibraryUserNew`, url: `/patron/user/new`, component: ReferencesPage, sidebar: true}, */
      { path: '/patron/:id?',  name: `LibraryUser`, url:'/patrons/patron',  component: UserPage},
      { path: '', exact: true, name: `LibraryUsers`, component: UsersListPage, sidebar: true, order:1},
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
