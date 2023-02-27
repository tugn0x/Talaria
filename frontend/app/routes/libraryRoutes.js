import UserPage from '../containers/Library/UserPage/Loadable';
import UsersListPage from '../containers/Library/UsersListPage/Loadable';
import SubRouteSwitch from '../components/SubRouteSwitch';
import ManageLibraryPage from '../containers/Library/ManageLibraryPage/Loadable';
import Fake from '../components/Fake';
import BorrowingPage from '../containers/Library/BorrowingPage/Loadable'
import DeliveryPage from '../containers/Library/DeliveryPage/Loadable'
import BorrowingRequestPage from '../containers/Library/BorrowingRequestPage/Loadable'
import TagsPage from '../containers/Library/TagsPage/Loadable';
import PickupsPage from '../containers/Library/PickupsPage/Loadable';
import PickupPage from '../containers/Library/PickupPage/Loadable';
import LendingPage from '../containers/Library/LendingPage';
import LendingRequestPage from '../containers/Library/LendingRequestPage';
import LibraryStatusPage from '../containers/Library/LibraryStatusPage/Loadable';
import UpgradeLibraryProfilePage from '../containers/Library/UpgradeLibraryProfilePage/Loadable';
 
const patrons_enabled=(process.env.MANAGE_PATRONS && process.env.MANAGE_PATRONS=="true")?true:false;
const show_upgrade_to_full_profile=(process.env.LIBRARY_DIFFERENT_PROFILES && process.env.LIBRARY_DIFFERENT_PROFILES=="true")?true:false;

const hidePatronRoutes = () =>{
    return !patrons_enabled;    
}

const hideUpgradeToFullProfile = () =>{
  return !show_upgrade_to_full_profile;    
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
    path: '/manage', name: `MyLibrary`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow','lend','manage-users','deliver'],resource: {type: 'libraries', key: 'library_id',},
    children: [            
      { path: '/', icon: 'info-circle', exact: true, name: `LibraryStatus`, url: '/manage/', component: LibraryStatusPage, permissions: ['manage','borrow','lend','manage-users','deliver'], sidebar: true, order:1},            
      { path: '/edit', icon: 'edit', exact: true, name: `LibraryProfile`,  url:'/manage/edit', component: ManageLibraryPage, permissions: ['manage'], sidebar:true,order:2},      
      { path: '/upgrade', icon: 'tools', exact: true, name: `LibraryUpgradeProfile`,  url:'/manage/upgrade', component: UpgradeLibraryProfilePage, hide: hideUpgradeToFullProfile(), permissions: ['manage'], sidebar:false},      
      /* NOT IMPLEMENTED
      { path: '/subscriptions', icon: 'file-contract', exact: true, name: `Subscriptions`, component: Fake, url: '/manage/subscriptions',permissions: ['manage'], sidebar: true, order:2},      
      { path: '/subscriptions/renew', icon: 'calendar', exact: true, name: `RenewSubscription`, component: Fake,permissions: ['manage']},      
      { path: '/operators', icon: 'user-cog', exact: true, name: `Operators`, component: Fake,url: '/manage/operators', permissions: ['manage'],sidebar: true, order:3 },      
      { path: '/service', icon: 'cog',exact: true, name: `LibraryServices`, component: Fake,url: '/manage/service',permissions: ['manage'],sidebar: true, order:4  },      
      { path: '/linkingservices', icon: 'link', exact: true, name: `LibraryLinkingServices`, component: Fake,url: '/manage/linkingservices',permissions: ['manage'],sidebar: true, order:5  },
      */
      { path: '/tags', icon:'tag', exact: true, name: `Tags`, url: '/manage/tags', component: TagsPage,permissions: ['manage','borrow','lend'],sidebar: true, order:6 },
      { path: '/pickup',  exact: true,icon: 'truck',name: `Pickup`, component: PickupsPage,url: '/manage/pickup', permissions: ['manage'], hide: hidePatronRoutes(),sidebar: true, order:8 },
      { path: '/pickup/:id?/:op?', exact: true, name: `PickupUpdate`, component: PickupPage, permissions: ['manage'], sidebar: false},            
      /* NOT IMPLEMENTED
       { path: '/departments', icon: 'building',  name: `LibraryDepartments`, component: Fake,url: '/manage/departments',permissions: ['manage','manage-users'], hide: hidePatronRoutes(),sidebar: true, order:7  },
       { path: '/catalogs', icon: 'database', exact: true, name: `Catalogs`, component: Fake,url: '/manage/catalogs', permissions: ['manage'],sidebar: true, order:9 },
      { path: '/protocols', icon: 'network-wired', exact: true, name: `Protocols`, component: Fake,url: '/manage/protocols', permissions: ['manage'],sidebar: true, order:10 },                      
      */      
     ]
  },
  {
    path: '/borrowing', name: `Borrowing`, header: true, component: SubRouteSwitch, permissions: ['manage','borrow'], resource: {type: 'libraries', key: 'library_id',},
    children: [      
      { path: '/tags', icon:'tag', exact: true, name: `Tags`, url: '/borrowing/tags', component: TagsPage,permissions: ['manage','borrow','lend'],sidebar: true, order:4 },
      { path: '/', icon: "share", exact: true, name: `PendingRequests`, component: BorrowingPage,url: '/borrowing',sidebar: true, order:2 },       
      { path: '/archive', icon: "hdd", name: `ArchivedRequests`, component: BorrowingPage,url: '/borrowing/archive',sidebar: true, order:3  },
      { path: '/new', icon: "plus", exact: true, name: `RequestNew`, component: BorrowingRequestPage,url: '/borrowing/new',sidebar: true, order:1},   
      { path: '/:id?/:op?', exact: true, name: `RequestUpdate`, component: BorrowingRequestPage, sidebar: false},            
     ]
  },
  {
    path: '/lending', name: `Lending`, header: true, component: SubRouteSwitch, permissions: ['manage','lend'], resource: {type: 'libraries', key: 'library_id',},
    children: [
      { path: '/tags', icon:'tag', exact: true, name: `Tags`, url: '/lending/tags', component: TagsPage,permissions: ['manage','borrow','lend'],sidebar: true, order:4 },
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
      { path: '', exact: true, name: `LibraryUsers`,  url:'/patrons', component: UsersListPage, sidebar: true, order:1},
    ]
  },
  /*
  NOT IMPLEMENTED
  {
    path: '/stats', name: `Stats`, component: Fake, header: true, permissions: ['manage','manage-users','borrow','lend'], resource: {type: 'libraries', key: 'library_id',},
  },
  {
    path: '/licenses', name: `Licenses`, component: Fake, header: true, permissions: ['manage','manage-licenses'], resource: {type: 'libraries', key: 'library_id',},
  } */
];

export default routes;
