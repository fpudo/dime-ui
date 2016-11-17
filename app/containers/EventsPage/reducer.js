/*
 *
 * EventsPage reducer
 *
 */

import { fromJS } from 'immutable';
import unionBy from 'lodash/unionBy';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_EVENTS,
  LOAD_MORE_EVENTS,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_ERROR,
  SEARCH_EVENTS,
  SEARCH_EVENTS_SUCCESS,
  SEARCH_EVENTS_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCESS,
  DELETE_EVENT_ERROR,
  CLICK_EVENT_TAG,
  TOOGLE_EVENT_TAG_SUCESS,
  TOOGLE_EVENT_TAG_ERROR,
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
  LOAD_PROFILES_ERROR,
  ADD_EVENT_TO_PROFILE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: {},
  data: [],
  profiles: [],
});

function eventsPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('data', fromJS([]))
        .set('loading', true);
    case LOAD_MORE_EVENTS:
      return state
        .set('loading', true);
    case LOAD_EVENTS_SUCCESS:
      return state
        .updateIn(['data'], data => fromJS(unionBy(data.toJS(), action.events, 'id')))
        .set('loading', false)
        .set('error', {});
    case LOAD_EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case SEARCH_EVENTS:
      return state
        .set('loading', true);
    case SEARCH_EVENTS_SUCCESS:
      return state
        .set('data', fromJS(action.events))
        .set('loading', false)
        .set('error', {});
    case SEARCH_EVENTS_ERROR:
      return state
        .set('data', fromJS([]))
        .set('loading', false)
        .set('error', fromJS(action.error));
    case DELETE_EVENT:
      return state
        .set('loading', true);
    case DELETE_EVENT_SUCESS:
      return state
        .set('loading', false)
        .set('error', {})
        .deleteIn(['data', state.get('data').findIndex((item) => item.get('id') === action.eventID)]);
    case DELETE_EVENT_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case CLICK_EVENT_TAG:
      return state
        .set('loading', true)
        .set('error', {});
    case TOOGLE_EVENT_TAG_SUCESS: {
      const eventIndex = state.get('data').findIndex((item) => item.get('id') === action.respond.eventID);
      const newEventWithNewTags = fromJS(action.respond);
      return state
        .set('loading', false)
        .set('error', {})
        .setIn(['data', eventIndex, 'tags'], newEventWithNewTags.getIn(['tags']));
    }
    case TOOGLE_EVENT_TAG_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case LOAD_PROFILES:
      return state
        .set('loading', true);
    case LOAD_PROFILES_SUCCESS:
      return state
        .set('profiles', fromJS(action.profiles))
        .set('loading', false)
        .set('error', {});
    case LOAD_PROFILES_ERROR:
      return state
        .set('profiles', fromJS([]))
        .set('loading', false)
        .set('error', fromJS(action.error));
    case ADD_EVENT_TO_PROFILE_ERROR:
      return state.set('error', fromJS(action.error));
    case LOCATION_CHANGE:
      return state
        .set('error', {});
    default:
      return state;
  }
}

export default eventsPageReducer;
