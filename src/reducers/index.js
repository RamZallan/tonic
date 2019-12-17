import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';

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
    REQUEST_CREDITS_UPDATE,
    RECEIVE_CREDITS_UPDATE,
    REQUEST_ITEM_UPDATE,
    RECEIVE_ITEM_UPDATE,
    REQUEST_ITEM_DELETE,
    RECEIVE_ITEM_DELETE,
    CLEAR_TXN_RESPONSES,
    REQUEST_ITEM_ADD,
    RECEIVE_ITEM_ADD,
    REQUEST_SLOT_ACTIVE,
    RECEIVE_SLOT_ACTIVE,
} from '../actions';

function apis(
    state = {
        isFetching: false,
        stock: [],
        items: [],
        users: [],
        credits: {},
        drops: {},
        creditsUpdate: {},
        updateItem: {},
        deleteItem: {},
        addItem: {},
        changeSlotActive: {},
    },
    action
) {
    switch (action.type) {
        case REQUEST_STOCK:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_STOCK:
            let drops = {};
            for (const machine of action.stock.machines) {
                drops[machine.name] = {
                    display_name: machine.display_name,
                    slots: machine.slots.map(slot => ({
                        number: slot.number,
                        item: slot.item,
                        dropStatus: null,
                    })),
                };
            }
            return Object.assign({}, state, {
                isFetching: false,
                stock: action.stock,
                drops,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_ITEMS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ITEMS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                users: action.users,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_CREDITS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_CREDITS:
            return Object.assign({}, state, {
                isFetching: false,
                credits: action.credits,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_DROP:
            drops = Object.assign({}, state.drops);
            for (const i in drops[action.machine].slots) {
                if (drops[action.machine].slots[i].number === action.slot) {
                    drops[action.machine].slots[i].dropStatus = {
                        isLoading: true,
                    };
                }
            }
            return Object.assign({}, state, {
                isFetching: true,
                drops,
            });
        case RECEIVE_DROP:
            drops = Object.assign({}, state.drops);
            for (const i in drops[action.machine].slots) {
                if (drops[action.machine].slots[i].number === action.slot) {
                    drops[action.machine].slots[i].dropStatus = action.drop;
                }
            }
            return Object.assign({}, state, {
                isFetching: false,
                drops,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_CREDITS_UPDATE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_CREDITS_UPDATE:
            return Object.assign({}, state, {
                isFetching: false,
                creditsUpdate: action.creditsUpdate,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_ITEM_UPDATE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ITEM_UPDATE:
            return Object.assign({}, state, {
                isFetching: false,
                updateItem: action.updateItem,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_ITEM_DELETE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ITEM_DELETE:
            return Object.assign({}, state, {
                isFetching: false,
                deleteItem: action.deleteItem,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_ITEM_ADD:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ITEM_ADD:
            return Object.assign({}, state, {
                isFetching: false,
                addItem: action.addItem,
                lastUpdated: action.receivedAt,
            });
        case REQUEST_SLOT_ACTIVE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SLOT_ACTIVE:
            return Object.assign({}, state, {
                isFetching: false,
                changeSlotActive: action.changeSlotActive,
                lastUpdated: action.receivedAt,
            });
        case CLEAR_TXN_RESPONSES:
            return Object.assign({}, state, {
                creditsUpdate: {},
                updateItem: {},
                deleteItem: {},
                addItem: {},
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}

export default history =>
    combineReducers({
        router: connectRouter(history),
        oidc: oidcReducer,
        apis,
    });
