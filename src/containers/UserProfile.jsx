import { connect } from "react-redux";
import Profile from "../components/NavBar/Profile";

const mapStateToProps = state => ({
  name: ((state.oidc.user || {}).profile || {}).name,
  username: ((state.oidc.user || {}).profile || {}).preferred_username,
  isDrinkAdmin: (((state.oidc.user || {}).profile || {}).groups || []).includes("webmaster"),
  drink_balance: (state.apis.credits.user || {}).drinkBalance,
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);