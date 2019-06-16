import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;
        return authenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: location } }} />;
      }}
    />
  );
}

export default PrivateRoute;
