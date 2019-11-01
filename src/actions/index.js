import fetch from 'cross-fetch';

export const REQUEST_STOCK = 'REQUEST_STOCK';
export const RECEIVE_STOCK = 'RECEIVE_STOCK';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_CREDITS = 'REQUEST_CREDITS';
export const RECEIVE_CREDITS = 'RECEIVE_CREDITS';

export const REQUEST_DROP = 'REQUEST_DROP';
export const RECEIVE_DROP = 'RECEIVE_DROP';

export const REQUEST_CREDITS_UPDATE = 'REQUEST_CREDITS_UPDATE';
export const RECEIVE_CREDITS_UPDATE = 'RECEIVE_CREDITS_UPDATE';

export const REQUEST_ITEM_UPDATE = 'REQUEST_ITEM_UPDATE';
export const RECEIVE_ITEM_UPDATE = 'RECEIVE_ITEM_UPDATE';

export const REQUEST_ITEM_DELETE = 'REQUEST_ITEM_DELETE';
export const RECEIVE_ITEM_DELETE = 'RECEIVE_ITEM_DELETE';

export const CLEAR_TXN_RESPONSES = 'CLEAR_TXN_RESPONSES';

export const REQUEST_ITEM_ADD = 'REQUEST_ITEM_ADD';
export const RECEIVE_ITEM_ADD = 'RECEIVE_ITEM_ADD';

export const REQUEST_SLOT_ACTIVE = 'REQUEST_SLOT_ACTIVE';
export const RECEIVE_SLOT_ACTIVE = 'RECEIVE_SLOT_ACTIVE';

const SERVER_ADDRESS = 'https://drink.csh.rit.edu'

function GET(access_token, route) {
    return fetch(SERVER_ADDRESS + route, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    });
}

function POST(access_token, route, body) {
    return fetch(SERVER_ADDRESS + route, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(err => console.log(err));
}

function PUT(access_token, route, body) {
    return fetch(SERVER_ADDRESS + route, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(err => console.log(err));
}

function DELETE(access_token, route, body) {
    return fetch(SERVER_ADDRESS + route, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(err => console.log(err));
}

export function requestStock() {
    return {
        type: REQUEST_STOCK,
    };
}

export function receiveStock(json) {
    return {
        type: RECEIVE_STOCK,
        stock: json,
        receivedAt: Date.now(),
    };
}

export function requestItems() {
    return {
        type: REQUEST_ITEMS,
    };
}

export function receiveItems(json) {
    return {
        type: RECEIVE_ITEMS,
        items: json,
        receivedAt: Date.now(),
    };
}

export function requestUsers() {
    return {
        type: REQUEST_USERS,
    };
}

export function receiveUsers(json) {
    return {
        type: RECEIVE_USERS,
        users: json,
        receivedAt: Date.now(),
    };
}

export function requestCredits() {
    return {
        type: REQUEST_CREDITS,
    };
}

export function receiveCredits(json) {
    return {
        type: RECEIVE_CREDITS,
        credits: json,
        receivedAt: Date.now(),
    };
}

export function requestDropDrink(machine, slot) {
    return {
        type: REQUEST_DROP,
        machine,
        slot,
    };
}

export function responseDropDrink(json, machine, slot) {
    return {
        type: RECEIVE_DROP,
        drop: json,
        machine,
        slot,
        receivedAt: Date.now(),
    };
}

export function requestUpdateUserCredits() {
    return {
        type: REQUEST_CREDITS_UPDATE,
    };
}

export function responseUpdateUserCredits(json) {
    return {
        type: RECEIVE_CREDITS_UPDATE,
        creditsUpdate: json,
        receivedAt: Date.now(),
    };
}

export function requestUpdateItem() {
    return {
        type: REQUEST_ITEM_UPDATE,
    };
}

export function responseUpdateItem(json) {
    return {
        type: RECEIVE_ITEM_UPDATE,
        updateItem: json,
        receivedAt: Date.now(),
    };
}

export function requestDeleteItem() {
    return {
        type: REQUEST_ITEM_DELETE,
    };
}

export function responseDeleteItem(json) {
    return {
        type: RECEIVE_ITEM_DELETE,
        deleteItem: json,
        receivedAt: Date.now(),
    };
}

export function clearResponses() {
    return {
        type: CLEAR_TXN_RESPONSES,
    };
}

export function requestAddItem() {
    return {
        type: REQUEST_ITEM_ADD,
    };
}

export function responseAddItem(json) {
    return {
        type: RECEIVE_ITEM_ADD,
        addItem: json,
        receivedAt: Date.now(),
    };
}

export function requestChangeSlotActive() {
    return {
        type: REQUEST_SLOT_ACTIVE,
    };
}

export function responseChangeSlotActive(json) {
    return {
        type: RECEIVE_SLOT_ACTIVE,
        changeSlotActive: json,
        receivedAt: Date.now(),
    };
}

export function fetchStock(dispatch, access_token) {
    dispatch(requestStock());
    return GET(access_token, '/drinks')
        .then(response => response.json())
        .then(json => dispatch(receiveStock(json)));
}

export function fetchItems(dispatch, access_token) {
    dispatch(requestItems());
    return GET(access_token, '/items')
        .then(response => response.json())
        .then(json => dispatch(receiveItems(json)));
}

export function fetchUsers(dispatch, access_token) {
    dispatch(requestUsers());
    return GET(access_token, '/users')
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(json)));
}

export function fetchCredits(dispatch, access_token, uid) {
    dispatch(requestCredits());
    return GET(access_token, '/users/credits?uid=' + uid)
        .then(response => response.json())
        .then(json => dispatch(receiveCredits(json)));
}

export function dropDrink(dispatch, access_token, machine, slot) {
    dispatch(requestDropDrink(machine, slot));
    const body = {
        machine,
        slot,
    };
    return POST(access_token, '/drinks/drop', body)
        .then(response => response.json())
        .then(json => dispatch(responseDropDrink(json, machine, slot)));
}

export function updateUserCredits(dispatch, access_token, uid, drinkBalance) {
    dispatch(requestUpdateUserCredits());
    const body = {
        uid,
        drinkBalance,
    };
    return PUT(access_token, '/users/credits', body)
        .then(response => response.json())
        .then(json => dispatch(responseUpdateUserCredits(json)));
}

export function updateItem(dispatch, access_token, id, name, price) {
    dispatch(requestUpdateItem());
    const body = {
        id,
        name,
        price,
    };
    return PUT(access_token, '/items', body)
        .then(response => response.json())
        .then(json => dispatch(responseUpdateItem(json)));
}

export function deleteItem(dispatch, access_token, id) {
    dispatch(requestDeleteItem());
    const body = {
        id,
    };
    return DELETE(access_token, '/items', body)
        .then(response => response.json())
        .then(json => dispatch(responseDeleteItem(json)));
}

export function clearTransactionResponses(dispatch) {
    return dispatch(clearResponses());
}

export function addItem(dispatch, access_token, name, price) {
    dispatch(requestAddItem());
    const body = {
        name,
        price,
    };
    return POST(access_token, '/items', body)
        .then(response => response.json())
        .then(json => dispatch(responseAddItem(json)));
}

export function changeSlotActive(dispatch, access_token, machine, slot, active, item_id) {
    dispatch(requestChangeSlotActive());
    const body = {
        active,
        item_id,
        machine,
        slot,
    };
    return PUT(access_token, '/slots', body)
        .then(response => response.json())
        .then(json => dispatch(responseChangeSlotActive(json)));
}
