import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAdminRoute = ({ component, ...rest }: any) => {
  let hasPermission = false;
  const role = localStorage.getItem('role');

  if (role === 'admin') {
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
