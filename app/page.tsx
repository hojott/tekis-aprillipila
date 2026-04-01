import React from 'react';
import Chatbox from './components/Chatbox';

const Home: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Chatbox />
    </div>
  );
};

export default Home;