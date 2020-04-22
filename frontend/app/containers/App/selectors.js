import { createSelector } from 'reselect';

const selectAppDomain = state => state.app || initialState;

const makeSelectApp = () =>
  createSelector(
    selectAppDomain,
    substate => substate,
  );
const makeSelectNotifications = () =>
  createSelector(
    selectAppDomain,
    substate => substate.notifications,
);

export default makeSelectApp;

export { makeSelectNotifications };
