import React from 'react';
import Button from '../components/Button/Button';

const Home = props => {
  return (
    <div
      style={{
        height: 300,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button />
    </div>
  );
};

export default Home;
