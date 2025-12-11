import React, { useState, useEffect, useRef } from 'react';
import styles from './GridCanvas.module.css';

const GridCanvas = ({ value, onChange, readOnly = false }) => {
  const isDrawing = useRef(false);
  const drawMode = useRef(1); // 1 = draw, 0 = erase

  // Initialize grid if value is not provided
  const gridData = value || new Array(64).fill(0);

  const handlePointerDown = (e, index) => {
    if (readOnly) return;
    e.preventDefault(); // Prevent default text selection/drag
    e.target.releasePointerCapture(e.pointerId); // Ensure enter events fire for other cells
    // Actually, for smooth painting across divs, we rely on PointerEnter. 
    // If we capture pointer, other elements won't get PointerOver/Enter events.
    // So we explicitly DO NOT capture pointer, but we prevent default.
    
    isDrawing.current = true;
    const currentVal = gridData[index];
    drawMode.current = currentVal === 1 ? 0 : 1;
    updatePixel(index, drawMode.current);
  };

  const handlePointerEnter = (e, index) => {
    if (readOnly || !isDrawing.current) return;
    updatePixel(index, drawMode.current);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const updatePixel = (index, newVal) => {
    const newData = [...gridData];
    if (newData[index] !== newVal) {
        newData[index] = newVal;
        if (onChange) onChange(newData);
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => {
        isDrawing.current = false;
    };
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  return (
    <div className={styles.gridContainer} onContextMenu={(e) => e.preventDefault()}>
      {gridData.map((val, idx) => (
        <div
          key={idx}
          className={`${styles.cell} ${val === 1 ? styles.active : ''}`}
          onPointerDown={(e) => handlePointerDown(e, idx)}
          onPointerEnter={(e) => handlePointerEnter(e, idx)}
        />
      ))}
    </div>
  );
};

export default GridCanvas;
