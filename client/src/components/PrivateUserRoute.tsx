import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateUserRoute = ({ component, ...rest }: any) => {
  let hasPermission = false;
  const role = localStorage.getItem('role');
  if (role === 'user') {
    hasPermission = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        hasPermission ? (
          React.createElement(component, props)
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};
