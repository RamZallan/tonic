# Tonic (WebDrink Re-Reloaded)

![GitHub](https://img.shields.io/github/license/ramzallan/tonic.svg)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ramzallan/tonic/react.svg)
![GitHub top language](https://img.shields.io/github/languages/top/ramzallan/tonic.svg?color=green)

A modern, fast, React-Redux-y web frontend for [Computer Science House](https://csh.rit.edu)'s networked vending machines that ties into [Mizu](https://github.com/zthart/mizu), and replaces [WebDrink](https://github.com/computersciencehouse/webdrink-2.0).


## Overview

Tonic is a [single page web app](https://en.wikipedia.org/wiki/Single-page_application) allowing members of CSH to use our Drink machines. Users can view current stock and drop drinks using their credits. Drink Admins can perform several operations like editing item names and prices, updating member credit balances, and updating machine stocks.

Built on Node.js and using React, Redux, and React Router, Tonic interfaces asynchronously with the Drink Server through the JavaScript Fetch API.


## Related Projects

- [Mizu](https://github.com/zthart/mizu) - A set of RESTful, public APIs used to interface with underlying databases and the Drink Machines.
- [Potion Seller](https://github.com/ramzallan/potion-seller) - An application to control the Drink machine hardware, built to run on a Raspberry Pi.

## Screenshots
Tonic, like most CSH sites, is behind member authentication, but below are screenshots that show most of the current functionality.

#### Homepage
Users can view the items stocked in each vending machine along with their respective price, and can drop the items, given they have enough credits. Admins can edit slots in machines, changing what item is stocked in each slot, as shown below.

![The homepage of Tonic](https://csh.rit.edu/~ram/tonic/tonic-homepage.jpg)

#### Editing a slot
When editing a slot on the stock list, Admins can select an item from a dropdown, and manually toggle the active state of a slot. Slots are automatically disabled when the machine deems them empty.

![Editing a slot in Tonic](https://csh.rit.edu/~ram/tonic/tonic-homepage-edit.jpg)

#### Item list
Admins can view a list of all items in the database, with an optional search query. They can edit the details of or delete the items, as well as add new items given a name and price.

![The Items List in Tonic](https://csh.rit.edu/~ram/tonic/tonic-items.jpg)

#### Editing an item
Admins are presented a modal when editing items, similar to the one for editing slots, which allows them to update the name and price of the item in the underlying database.

![Editing an item in Tonic](https://csh.rit.edu/~ram/tonic/tonic-items-edit.jpg)

#### User list
Admins can search through CSH users given a search query, and set, increment, or decrement their drink balances given a number and selected operation.

![The User List in Tonic](https://csh.rit.edu/~ram/tonic/tonic-users.jpg)


## Developing locally

### Prerequisites
- [Node.js](https://nodejs.org)
- [npm](https://npmjs.com)
- [Yarn](https://www.npmjs.com/package/yarn)

### Steps
- `yarn install`
- `yarn start`
