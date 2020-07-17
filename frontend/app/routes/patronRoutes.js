import MyLibraryPage from 'containers/Patron/MyLibraryPage/Loadable';
import MyLibrariesListPage from 'containers/Patron/MyLibrariesListPage/Loadable';
// import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';
import ReferencesListPage from 'containers/Patron/ReferencesListPage/Loadable';
import RequestsListPage from 'containers/Patron/RequestsListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';
import Fake from 'components/Fake';
import ReferencesLabels from 'containers/Patron/ReferencesLabels';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/references', name: `Bibliography`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
      { path: '/reference/new', icon: "plus", name: `ReferenceNew`, url: `/references/reference/new`, component: ReferencesPage, sidebar: true, order:1},
      { path: '/labels', icon: "tags", exact: true, name: `Labels`, url: '/references/labels', component: ReferencesLabels, sidebar: true, order:3 },
      { path: '/categories', icon: "folder",exact: true, name: `Categories`, url: '/references/categories', component: Fake,sidebar: true , order:4},
      { path: '/reference/:id?/:edit?', name: `ReferenceUpdate`, component: ReferencesPage},
      { path: '/', name: `ReferenceList`, url: '/references', component: ReferencesListPage,sidebar: true, order:2 },
    ]
  },

//  { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },
  { path: '/requests', name: `Requests`, component: SubRouteSwitch, header: true, permissions: ['patron'], 
    children: [
      { path: '/archive', exact:true, name: `ArchivedRequests`, component: Fake,url: `/requests/archive`, sidebar: true, order: 2},
      { path: '/', name: `PendingRequests`, component: RequestsListPage,url: `/requests`, sidebar: true, order: 1},
      
    ]
  },

  { path: '/:library_id?/my-libraries', name: `MyLibraries`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/library/new', icon: "plus", name: `MyLibraryNew`, url: `/my-libraries/library/new`, component: MyLibraryPage, sidebar: true, order: 1},
      { path: '/library/:id?', name: `Libraries`, component: MyLibraryPage, },
      { path: '/:page?', exact: true, name: `MyLibraries`, url: `/my-libraries`, component: MyLibrariesListPage, sidebar: true,order: 2},
    ]
  },
  // { path: '/request-access', name: 'Request access', component: ChangePassword, menu: true },
];

// '/:library_id?/my-libraries'

export default routes;
