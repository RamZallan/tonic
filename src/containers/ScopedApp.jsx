import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = state => ({
  isDrinkAdmin: (((state.oidc.user || {}).profile || {}).groups || []).includes("webmaster"),
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);