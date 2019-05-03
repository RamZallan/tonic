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

function GET(access_token, route) {
    return fetch('https://mizu-dev.cs.house' + route, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    }).catch(error => console.log(error));
}

function POST(access_token, route, body) {
    return fetch('https://mizu-dev.cs.house' + route, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(error => console.log(error));
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

export function requestDropDrink() {
    return {
        type: REQUEST_DROP,
    };
}

export function responseDropDrink(json) {
    return {
        type: RECEIVE_DROP,
        drop: json,
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
    dispatch(requestDropDrink());
    const body = {
        machine,
        slot,
    };
    return POST(access_token, '/drinks/drop', body)
        .then(response => response.json())
        .then(json => dispatch(responseDropDrink(json)));
}