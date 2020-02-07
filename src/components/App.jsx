import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { history } from '../store';
import ProtectedRoute from '../containers/ProtectedRoute';
import OidcCallback from '../containers/OidcCallback';
import {
    Home,
    NavBar,
    ItemList,
    UserList,
    /*
    LogList,
    Temperatures,
    */
    PageNotFound,
} from './index';

class App extends Component {
    componentDidUpdate() {
        if (this.props.oidc.user && !this.props.stock) {
            this.props.getStock(this.props.oidc.user.access_token);
        }
        if (this.props.oidc.user && !this.props.credits) {
            this.props.getCredits(
                this.props.oidc.user.access_token,
                this.props.oidc.user.profile.preferred_username
            );
        }
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <Container className="main" fluid>
                    <NavBar isDrinkAdmin={this.props.isDrinkAdmin} />
                    <Container>
                        <Switch>
                            <Route
                                exact
                                path="/callback"
                                component={OidcCallback}
                            />
                            <ProtectedRoute exact path="/" component={Home} />
                            <ProtectedRoute
                                exact
                                path="/users"
                                component={UserList}
                            />
                            <ProtectedRoute
                                exact
                                path="/items"
                                component={ItemList}
                            />
                            {/*
                            <ProtectedRoute exact path="/temps" component={Temperatures}/>
                            <ProtectedRoute exact path="/logs" component={LogList}/>
                            */}

                            <Route component={PageNotFound} />
                        </Switch>
                    </Container>
                </Container>
            </ConnectedRouter>
        );
    }
}

export default App;
