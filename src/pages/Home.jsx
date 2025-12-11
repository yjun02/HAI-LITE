import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>HAI-LITE</h1>
      <p>Handong AI Literacy & Highlight Project</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/builder" style={{ padding: '10px 20px', background: '#333', borderRadius: '4px' }}>
          🛠️ Builder Tool
        </Link>
        <Link to="/viewer" style={{ padding: '10px 20px', background: '#00e5ff', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
          💡 Viewer Tool
        </Link>
      </div>
    </div>
  ); // Fixed syntax error here
};

export default Home;
