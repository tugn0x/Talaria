export function checkPermissions(user, permissions, resource) {
  console.log('checkPermissions', user, permissions, resource);
  if(checkRole(user, "super-admin")) {
    return true;
  }
  if(!resource) {
    return true;
  }
  permissions = typeof permissions === 'string' ? [permissions] : permissions;
  return permissions.map(i => resource.permissions.includes(i)).filter(i => i===true).length > 0
}
export function checkRole(auth, roles) {
  console.log('checkRole', auth.permissions, roles)
  if(auth.user.status !== 1) {
  // if(auth.user.status !== 1 || !auth.permissions.roles) {
    return false;
  }
  if(auth.permissions.roles.includes("super-admin")) {
    return true;
  }
  roles = typeof roles === 'string' ? [roles] : roles
  return roles.map(i => auth.permissions.roles.includes(i)).filter(i => i===true).length > 0
}

export function checkRoutePermission(auth, route, resource) {
  if(!route.roles && !route.permissions)
  {
    return true;
  }
  if(route.roles && route.permissions)
  {
    return checkPermissions(auth, route.permissions, resource) && checkRole(auth, route.roles)
  }
  return (route.roles && checkRole(auth, route.roles) || (route.permissions && checkPermissions(auth, route.permissions, resource)))

}

export function getAuthResource(auth, resource) {
  console.log('getAuthResource', auth, resource)
  return auth.permissions.resources[resource.type] && auth.permissions.resources[resource.type].find(i => i.resource.id == resource.id)
}
