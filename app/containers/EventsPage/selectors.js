import { createSelector } from 'reselect';

/**
 * Direct selector to the eventsPage state domain
 */
const selectEventsPageDomain = () => state => state.get('eventsPage');

/**
 * Other specific selectors
 */

const selectAuth = () => (state) => state.getIn(['app', 'auth']).toJS();

const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();

/**
 * Default selector used by EventsPage
 */

const selectEvents = () => createSelector(
  selectEventsPageDomain(),
  (eventsPage) => eventsPage.get('data').toJS()
);

const selectLoading = () => createSelector(
  selectEventsPageDomain(),
  (documentsPage) => documentsPage.get('loading')
);

const selectError = () => createSelector(
  selectEventsPageDomain(),
  (documentsPage) => documentsPage.get('error').toJS()
);

export default selectEventsPageDomain;
export {
  selectEvents,
  selectLoading,
  selectError,
  selectAuth,
  selectAPI,
};
