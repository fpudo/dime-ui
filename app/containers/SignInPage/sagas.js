import { put, call, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import request from 'utils/request';
import { SUBMIT_SIGNIN, SUBMIT_CREATE } from './constants';
import { saveCredentials, receiveAppError, clearAppError } from 'containers/App/actions';
import { cancelByLocationChange } from 'containers/App/sagas';
import {
  signInSucess,
  createSucess,
  submitSignIn as submitSignInAction,
} from './actions';
import { selectAPI, selectLocationBeforeSignIn } from './selecters';

export function* submitSignIn({ username, password, rememberMe }) {
  const { url } = yield select(selectAPI());
  const previousLocation = yield select(selectLocationBeforeSignIn());
  const token = window.btoa(`${username}:${password}`);
  const requestURL = `http://${url}/api/ping`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
  try {
    const respond = yield call(request, requestURL, options);
    if (respond) {
      yield put(signInSucess(respond));
      yield put(saveCredentials(username, password, rememberMe, respond.userId));
      yield put(clearAppError());
      if (previousLocation) {
        yield call(browserHistory.push, previousLocation);
      } else {
        yield call(browserHistory.push, '/');
      }
    }
  } catch (e) {
    // This is an ugly fix should be avoided. It was intend to fake 401 Error
    // since /api/ping does not return readable response.
    const fakeResponse = {
      status: 401,
      statusText: 'Unauthorized',
    };
    const error = new Error(fakeResponse.statusText);
    error.response = fakeResponse;
    yield put(receiveAppError(error));
  }
}

export function* submitCreate({ username, password, email, rememberMe }) {
  const { url } = yield select(selectAPI());
  const requestURL = `http://${url}/api/users`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  };
  try {
    const respond = yield call(request, requestURL, options);
    yield put(createSucess(respond));
    yield put(submitSignInAction(username, password, rememberMe));
    yield put(clearAppError());
  } catch (error) {
    yield put(receiveAppError(error));
  }
}

// All sagas to be loaded
export default [
  cancelByLocationChange(SUBMIT_SIGNIN, submitSignIn),
  cancelByLocationChange(SUBMIT_CREATE, submitCreate),
];
