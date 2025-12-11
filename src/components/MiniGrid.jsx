import React from 'react';

// A lightweight read-only 8x8 grid for previews
const MiniGrid = ({ pixels, onClick, label }) => {
  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, 1fr)', 
        gridTemplateRows: 'repeat(8, 1fr)', 
        gap: '1px', 
        width: '64px', 
        height: '64px', 
        border: '1px solid #444', 
        cursor: 'pointer',
        backgroundColor: '#000',
        position: 'relative'
      }}
      title="Click to remove"
    >
      {pixels.map((val, i) => (
        <div 
          key={i} 
          style={{ 
            backgroundColor: val ? '#fff' : '#222' 
          }} 
        />
      ))}
      <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          fontSize: '10px',
          padding: '1px 3px',
          pointerEvents: 'none'
      }}>
        {label}
      </div>
    </div>
  );
};

export default MiniGrid;
