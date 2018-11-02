import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signup, login, receiveAuth } from '../actions';
import WelcomePage from '../components/WelcomePage';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorSignInMessage: state.services.errors.auth,
  errorRegisterMessage: state.services.errors.signup,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signup,
    login,
    receiveAuth,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomePage);
