import { connect } from 'react-redux';
import App from '../components/App';
import { fetchStock, fetchCredits } from '../actions';

const mapStateToProps = state => ({
    isDrinkAdmin: (
        ((state.oidc.user || {}).profile || {}).groups || []
    ).includes('drink'),
    oidc: state.oidc,
    stock: state.apis.stock.machines,
    credits: (state.apis.credits.user || {}).drinkBalance,
});

const mapDispatchToProps = dispatch => ({
    getStock: access_token => fetchStock(dispatch, access_token),
    getCredits: (access_token, uid) =>
        fetchCredits(dispatch, access_token, uid),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
