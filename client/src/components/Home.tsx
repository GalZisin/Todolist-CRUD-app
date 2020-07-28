import React, { useEffect } from 'react';
import store from '../flux/store';
import { loadUser } from '../flux/actions/authActions';
const Home = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'black' }}>wellcome</h1>
      <h1 style={{ textAlign: 'center', color: 'black' }}>Please login as admin to view all user tasks</h1>
      <h1 style={{ textAlign: 'center', color: 'black' }}>email: admin@gmail.com, password: admin</h1>
      <h1 style={{ textAlign: 'center', color: 'black' }}>Please register as user to view only users tasks</h1>
    </div>
  );
};
export default Home;
