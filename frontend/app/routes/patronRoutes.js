import MyLibraryPage from 'containers/Patron/MyLibraryPage/Loadable';
import MyLibrariesListPage from 'containers/Patron/MyLibrariesListPage/Loadable';
// import ChangePassword from 'containers/User/ChangePassword/Loadable';
import ReferencesPage from 'containers/Patron/ReferencesPage/Loadable';
import RequestsPage from 'containers/Patron/RequestsPage/Loadable';
import ReferencesListPage from 'containers/Patron/ReferencesListPage/Loadable';
import RequestsListPage from 'containers/Patron/RequestsListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';
import Fake from 'components/Fake';
import ReferencesLabels from 'containers/Patron/ReferencesLabels/Loadable';
import ReferencesGroups from 'containers/Patron/ReferencesGroups/Loadable';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/references', name: `Bibliography`, component: SubRouteSwitch, header: true, roles: ['registered'],
    children: [
      { path: '/new', exact: true, icon: "plus", name: `ReferenceNew`, url: `/references/new`, component: ReferencesPage, sidebar: true, order:1},
      { path: '/labels', icon: "tags", exact: true, name: `Labels`, url: '/references/labels', component: ReferencesLabels, sidebar: true, order:3 },
      { path: '/categories', icon: "folder",exact: true, name: `Categories`, url: '/references/categories', component: ReferencesGroups, sidebar: true , order:4},
      { path: '/', icon: "icon-riferimenti", exact: true, name: `ReferenceList`, url: `/references`, component: ReferencesListPage,sidebar: true, order:2 },
      { path: '/:id?/:op?', exact: true, name: `ReferenceUpdate`, component: ReferencesPage},
      //{ path: '/:id?/:request', exact: true, name: `ReferenceRequest`, component: ReferencesPage},
    ]
  },

//  { path: '/searches', name: `Searches`, component: ChangePassword, header: true, },
  { path: '/requests', name: `Requests`, component: SubRouteSwitch, header: true, permissions: ['patron'], 
    children: [
      { path: '/archive', icon: "hdd", exact:true, name: `ArchivedRequests`, component: RequestsListPage,url: `/requests/archive`, sidebar: true, order: 2},
      { path: '/', icon: "share", exact: true, name: `PendingRequests`, component: RequestsListPage,url: `/requests`, sidebar: true, order: 1},
      { path: '/:id?/:edit?', exact: true, name: `RequestDetail`, component: RequestsPage},
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
