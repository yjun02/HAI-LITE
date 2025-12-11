import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>HAI-LITE</h1>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Handong AI Literacy & Highlight Project</p>

      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5rem' }}>github: <a style={{ textDecoration: 'underline' }} href="https://github.com/yjun02/HAI-LITE">yjun02/HAI-LITE</a></p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
        
        <Link to="/builder" style={{ padding: '30px 50px', background: 'var(--bgSecondary)', color: 'var(--textPrimary)', borderRadius: '10px', fontWeight: 'bold', fontSize: '3rem', border: '3px solid var(--borderLight)' }}>
          🛠️ Builder Tool
        </Link>
        <Link to="/viewer" style={{ padding: '30px 50px', background: 'var(--bgSecondary)', color: 'var(--textPrimary)', borderRadius: '10px', fontWeight: 'bold', fontSize: '3rem', border: '3px solid var(--borderLight)' }}>
          💡 Viewer Tool
        </Link>
      </div>
    </div>
  );
};

export default Home;
