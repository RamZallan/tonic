import React, {Component} from 'react';
import User from './User';
import {Form, FormGroup, Input, Table} from "reactstrap";

const UserData = [
        {
            "cn": "James Forcier",
            "drinkBalance": 18500,
            "uid": "jmf"
        },
        {
            "cn": "Paul Ugolini",
            "drinkBalance": 686,
            "uid": "pau"
        },
        {
            "cn": "Ram Zallan",
            "drinkBalance": -275,
            "uid": "ram"
        },
        {
            "cn": "Tim",
            "drinkBalance": 0,
            "uid": "tim"
        },
        {
            "cn": "Warren R Carithers",
            "drinkBalance": 0,
            "uid": "wrc"
        },
        {
            "cn": "Eero Kelly",
            "drinkBalance": 623,
            "uid": "eero"
        },
        {
            "cn": "Julien Eid",
            "drinkBalance": 7359,
            "uid": "jeid"
        },
        {
            "cn": "Leul Behane-Meskel",
            "drinkBalance": 5073,
            "uid": "leul"
        },
        {
            "cn": "Nick Depinet",
            "drinkBalance": 7520,
            "uid": "nick"
        },
        {
            "cn": "Owen Sullivan",
            "drinkBalance": 5,
            "uid": "owen"
        },
        {
            "cn": "Russ Harmon",
            "drinkBalance": 2001,
            "uid": "russ"
        },
        {
            "cn": "Ryan Boyd",
            "drinkBalance": 220,
            "uid": "ryan"
        },
        {
            "cn": "Eric Schumann",
            "drinkBalance": 905,
            "uid": "schu"
        },
        {
            "cn": "Zach Hart",
            "drinkBalance": 42069,
            "uid": "zach"
        },
        {
            "cn": "Ayush Goel",
            "drinkBalance": 481,
            "uid": "agoel"
        },
        {
            "cn": "Andy Potter",
            "drinkBalance": 298,
            "uid": "andyp"
        },
        {
            "cn": "Aruna Sooknarine",
            "drinkBalance": 0,
            "uid": "aruna"
        },
        {
            "cn": "Aryeh Lieberman",
            "drinkBalance": 25,
            "uid": "aryeh"
        },
        {
            "cn": "Audra Pawlak",
            "drinkBalance": 0,
            "uid": "audra"
        },
        {
            "cn": "Brent A. Daigle",
            "drinkBalance": 0,
            "uid": "bagel"
        },
        {
            "cn": "Barry Culhane",
            "drinkBalance": 0,
            "uid": "barry"
        },
        {
            "cn": "Brandon Chiu",
            "drinkBalance": 1,
            "uid": "bchiu"
        },
        {
            "cn": "Grant Cohoe",
            "drinkBalance": 635,
            "uid": "cohoe"
        },
        {
            "cn": "Corry Haines",
            "drinkBalance": 619,
            "uid": "corry"
        },
        {
            "cn": "Drew Gottlieb",
            "drinkBalance": 538,
            "uid": "dag10"
        },
        {
            "cn": "Nicholas Mercadante",
            "drinkBalance": 0,
            "uid": "dante"
        },
        {
            "cn": "Stephen Demos",
            "drinkBalance": 41,
            "uid": "demos"
        },
        {
            "cn": "Owen Miller",
            "drinkBalance": 3,
            "uid": "euler"
        },
        {
            "cn": "Jeff Mahoney",
            "drinkBalance": 0,
            "uid": "jeffm"
        },
        {
            "cn": "Linus",
            "drinkBalance": 0,
            "uid": "linus"
        },
        {
            "cn": "Mihir Singh",
            "drinkBalance": 56,
            "uid": "mihir"
        },
];

class UserList extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            filterStr: "",
        };
    }

    render() {
        const filterLen = this.state.filterStr.length;
        const users = UserData
            .filter(user => (filterLen > 0
                ? (this.state.filterStr === user.uid.substring(0, filterLen)
                    || this.state.filterStr === user.cn.substring(0, filterLen))
                : false)
            )
            .sort((a, b) => a.uid > b.uid)
            .map((user, index) => {
                return (
                    <User
                        key={index}
                        {...user}
                    />
                );
            });
        return (
            <div>
                <h1>Users</h1>
                <Form>
                    <FormGroup>
                        <Input onChange={e => this.setState({filterStr: e.target.value })} type="search" placeholder="Search"/>
                    </FormGroup>
                </Form>
                {users.length ?
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Credits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </Table>
                :
                    (<div>
                        {this.state.filterStr.length ?
                            "No results found for filter '" + this.state.filterStr + "'."
                        :   "Enter a search query to find users."
                        }
                    </div>)
                }
            </div>
        )
    }
}

export default UserList;
