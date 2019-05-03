import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import { connectRouter } from "connected-react-router";

import {
  REQUEST_STOCK,
  RECEIVE_STOCK,
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_CREDITS,
  RECEIVE_CREDITS,
  REQUEST_DROP,
  RECEIVE_DROP,
} from '../actions';


function apis(state = {isFetching: false, stock: [], items: [], users: [], credits: {}, drop: {}}, action) {
  switch(action.type) {
    case REQUEST_STOCK:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case  RECEIVE_STOCK:
      return Object.assign({}, state, {
        isFetching: false,
        stock: action.stock,
        lastUpdated: action.receivedAt,
      });
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case  RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt,
      });
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case  RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users,
        lastUpdated: action.receivedAt,
      });
    case REQUEST_CREDITS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case  RECEIVE_CREDITS:
      return Object.assign({}, state, {
        isFetching: false,
        credits: action.credits,
        lastUpdated: action.receivedAt,
      });
    case REQUEST_DROP:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case  RECEIVE_DROP:
      return Object.assign({}, state, {
        isFetching: false,
        drop: action.drop,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export default (history) => combineReducers({
  router: connectRouter(history),
  oidc: oidcReducer,
  apis,
});