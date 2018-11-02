import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { receiveAuth } from '../actions/auth';

class PrivateRoute extends React.Component {
  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    this.props.receiveAuth();
    /* eslint-enable react/destructuring-assignment */
  }

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={nextProps => (isAuthenticated ? (
          <Component {...nextProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/welcome',
              state: { from: nextProps.location },
            }}
          />
        ))
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    receiveAuth,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
