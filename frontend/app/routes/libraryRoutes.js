import UserPage from 'containers/Library/UserPage/Loadable';
import UsersListPage from 'containers/Library/UsersListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';
import ManageLibraryPage from 'containers/Library/ManageLibraryPage/Loadable';
import Fake from 'components/Fake';
import BorrowingPage from '../containers/Library/BorrowingPage/Loadable'
import DeliveryPage from '../containers/Library/DeliveryPage/Loadable'
import BorrowingRequestPage from '../containers/Library/BorrowingRequestPage/Loadable'
import TagsPage from '../containers/Library/TagsPage/Loadable';
import LendingPage from '../containers/Library/LendingPage';
import LendingRequestPage from '../containers/Library/LendingRequestPage';

const patrons_enabled=(process.env.MANAGE_PATRONS && process.env.MANAGE_PATRONS=="true")?true:false;

const hidePatronRoutes = () =>{
    return !patrons_enabled;    
}


const routes = [
  /*
  TODO: la path è /users, ma si tratta a tutti gli effetti dei library-users, cioè del collegamento tra utente Patron e Biblioteca
  la lista è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la create è POST /api/v1/libraries/{LIBRARY_ID!!}/library-users
  la show è GET /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
  l'update è PUT /api/v1/libraries/{LIBRARY_ID!!}/library-users/{library_users_id}
   */

  {
    path: '/manage', name: `MyLibrary`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow','lend','manage-users'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', icon: 'info-circle', exact: true, name: `Profile`, component: ManageLibraryPage, url: '/manage',permissions: ['manage'], sidebar: true, order:1},
      // vari pezzi dei dati della biblio (dati servizio, dati anag, ...)
      { path: '/service', icon: 'cog',exact: true, name: `Service`, component: Fake,url: '/manage/service',permissions: ['manage'],sidebar: true, order:2  },
      { path: '/linkingservices', icon: 'link', name: `LinkingServices`, component: Fake,url: '/manage/linkingservices',permissions: ['manage'],sidebar: true, order:2  },
      { path: '/tags', icon:'tag', exact: true, name: `Tags`, url: '/manage/tags', component: TagsPage,permissions: ['manage','borrow','lend'],sidebar: true, order:3 },
      { path: '/operators', icon: 'user-cog', name: `Operators`, component: Fake,url: '/manage/operators', permissions: ['manage'],sidebar: true, order:5 },
      { path: '/departments', icon: 'building',  name: `Departments`, component: Fake,url: '/manage/departments',permissions: ['manage','manage-users'], hide: hidePatronRoutes(),sidebar: true, order:4  },
      { path: '/pickup', icon: 'truck',name: `Pickup`, component: Fake,url: '/manage/pickup', permissions: ['manage'], hide: hidePatronRoutes(),sidebar: true, order:5 },
      { path: '/catalogs', icon: 'database', name: `Catalogs`, component: Fake,url: '/manage/catalogs', permissions: ['manage'],sidebar: true, order:5 },
      { path: '/protocols', icon: 'network-wired', name: `Protocols`, component: Fake,url: '/manage/protocols', permissions: ['manage'],sidebar: true, order:5 },

     ]
  },
  {
    path: '/borrowing', name: `Borrowing`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      /*{ path: '', exact: true, name: `PendingRequests`, component: Fake,sidebar: true, order:1 },*/
      { path: '/', icon: "share", exact: true, name: `PendingRequests`, component: BorrowingPage,url: '/borrowing',sidebar: true, order:2 }, 
      { path: '/archive', icon: "hdd", name: `ArchivedRequests`, component: BorrowingPage,url: '/borrowing/archive',sidebar: true, order:3  },
      { path: '/new', icon: "plus", exact: true, name: `RequestNew`, component: BorrowingRequestPage,url: '/borrowing/new',sidebar: true, order:1},   
      { path: '/:id?/:op?', exact: true, name: `RequestUpdate`, component: BorrowingRequestPage, sidebar: false},      
     ]
  },
  {
    path: '/lending', name: `Lending`, header: true, component: SubRouteSwitch, permissions: ['manage','lend'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '/', icon: "share", exact: true, name: `PendingRequests`, component: LendingPage,url: '/lending',sidebar: true, order:1}, 
      { path: '/archive', icon: "hdd", name: `ArchivedRequests`, component: LendingPage,url: '/lending/archive',sidebar: true, order:3 },
      { path: '/allrequests', icon: "cloud", name: `AllRequests`, component: LendingPage,url: '/lending/allrequests',sidebar: true, order:2 },
      { path: '/:id?/:op?', exact: true, name: `RequestUpdate`, component: LendingRequestPage, sidebar: false},      
    ]
  },
  {
    path: '/delivery', name: `Delivery`, header: true, component: SubRouteSwitch, permissions: ['manage','deliver'], hide: hidePatronRoutes(), resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '', icon:'truck', exact: true, name: `PendingRequests`, component: DeliveryPage,url: '/delivery',sidebar: true, order:1 },
      { path: '/:id?/:op?', exact: true, name: `RequestUpdate`, component: BorrowingRequestPage, sidebar: false},      
      /*{ path: '/archive', icon: "hdd", name: `ArchivedRequests`, component: BorrowingPage,url: '/borrowing/archive',sidebar: true, order:3  },*/
     ]
  },
  {
    path: '/patrons', name: `LibraryUsers`, component: SubRouteSwitch, header: true, permissions: ['manage','manage-users'],  hide: hidePatronRoutes(),resource: {type: 'libraries', key: 'library_id',},
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
