import React, { useState, useRef, useEffect } from 'react';
import GridCanvas from '../components/GridCanvas';
import Button from '../components/Button';
import { createModel, trainModel } from '../utils/model';
import * as tf from '@tensorflow/tfjs';

import MiniGrid from '../components/MiniGrid';

const Builder = () => {
    const [pixels, setPixels] = useState(new Array(64).fill(0));
    const [dataset, setDataset] = useState([]);
    const [counts, setCounts] = useState({ 0: 0, 1: 0 });
    const [trainingStatus, setTrainingStatus] = useState('Idle'); // Idle, Training, Complete
    const [logs, setLogs] = useState([]);
    const [model, setModel] = useState(null);

    // Initialize model on mount
    useEffect(() => {
        const m = createModel();
        setModel(m);
        // Load dataset from local storage if exists (Optional, ignoring for now for simplicity)
        return () => m.dispose();
    }, []);

    const handleClear = () => {
        setPixels(new Array(64).fill(0));
    };

    const addData = (label) => {
        // Validation: Don't add if empty? (Optional)
        const newItem = {
            pixels: [...pixels],
            label: label,
            id: Date.now() + Math.random() // unique ID
        };
        const newDataset = [...dataset, newItem];
        setDataset(newDataset);
        setCounts(prev => ({ ...prev, [label]: prev[label] + 1 }));
        handleClear();
    };

    const handleDelete = (index) => {
        const item = dataset[index];
         const newDataset = dataset.filter((_, i) => i !== index);
        setDataset(newDataset);
        setCounts(prev => ({ ...prev, [item.label]: prev[item.label] - 1 }));
    };

    const handleTrain = async () => {
        if (dataset.length < 4) {
            alert("Need at least 4 data points to train!");
            return;
        }
        setTrainingStatus('Training');
        setLogs([]);

        const inputs = dataset.map(d => d.pixels);
        const labels = dataset.map(d => d.label);

        await trainModel(model, inputs, labels, (epoch, log) => {
            setLogs(prev => [...prev, { epoch: epoch + 1, loss: log.loss.toFixed(4), acc: log.acc.toFixed(4) }]);
        });

        setTrainingStatus('Complete');
    };

    const handleDownload = async () => {
        if (!model) return;
        await model.save('downloads://hai-lite-model');
    };

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', flex: 1, width: '100%', margin: '0' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>🛠️ Builder Tool</h1>
                <p style={{ color: 'var(--text-dimary)', fontSize: '1.1rem' }}>Draw digits (0 or 1), label them, and train your model.</p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1.5fr 1fr', 
                gap: '1rem', 
                width: '100%', 
                maxWidth: '1800px',
                height: 'calc(100vh - 250px)',
                alignItems: 'stretch'
            }}>
                {/* Left Panel: Data Collection */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem', 
                    background: 'var(--cardBg)',
                    border: '2px solid var(--cardBorder)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    overflow: 'hidden',
                }}>
                    <h2 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>1. Data Collection</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <GridCanvas value={pixels} onChange={setPixels} />
                        
                        {/* UX 개선: 버튼 레이아웃 수정 및 글꼴 크기 조정 */}
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '0.75rem',
                            width: 'clamp(300px, 40vmin, 600px)',
                            maxWidth: '100%',
                            fontSize: '1.2rem'
                        }}>
                            {/* 1. Add Label 버튼 (2열) */}
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr', 
                                gap: '0.75rem',
                                width: '100%'
                            }}>
                                <Button onClick={() => addData(0)} style={{ width: '100%', fontSize: '1rem' }}>
                                    Add Label 0
                                </Button>
                                <Button onClick={() => addData(1)} style={{ width: '100%', fontSize: '1rem' }}>
                                    Add Label 1
                                </Button>
                            </div>

                            {/* 2. Clear 버튼 (단독 행) */}
                            <Button variant="secondary" onClick={handleClear} style={{ width: '100%', fontSize: '1rem' }}>
                                Clear Canvas
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Center Panel: Collected Data */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    background: 'var(--cardBg)',
                    border: '2px solid var(--cardBorder)',
                    borderRadius: '12px',
                    padding: '1.5rem 0rem',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ margin: 0, textAlign: 'center' }}>Collected Data</h2>
                    <p style={{ 
                        margin: 0, 
                        textAlign: 'center', 
                        fontSize: '1rem', 
                        color: 'var(--textDim)' 
                    }}>
                        (Click to delete)
                    </p>
                    
                    <div style={{ 
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1rem 0.5rem'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            gap: '2rem',
                            justifyContent: 'space-around'
                        }}>
                            {/* Label 0 Section */}
                            <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                    position: 'sticky', 
                                    top: 0, 
                                    background: 'var(--cardBg)', 
                                    padding: '0.5rem',
                                    margin: '0 0 1rem 0',
                                    zIndex: 1,
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}>
                                    Label 0 <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>({counts[0]} datas)</span>
                                </h4>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(4, 1fr)', 
                                    gap: '0.75rem',
                                    justifyItems: 'center'
                                }}>
                                    {dataset.map((d, idx) => d.label === 0 ? (
                                        <MiniGrid key={d.id} pixels={d.pixels} label="0" onClick={() => handleDelete(idx)} />
                                    ) : null)}
                                </div>
                            </div>
                            
                            {/* Label 1 Section */}
                            <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                    position: 'sticky', 
                                    top: 0, 
                                    background: 'var(--cardBg)', 
                                    padding: '0.5rem',
                                    margin: '0 0 1rem 0',
                                    zIndex: 1,
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}>
                                    Label 1 <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>({counts[1]} datas)</span>
                                </h4>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(4, 1fr)', 
                                    gap: '0.75rem',
                                    justifyItems: 'center'
                                }}>
                                    {dataset.map((d, idx) => d.label === 1 ? (
                                        <MiniGrid key={d.id} pixels={d.pixels} label="1" onClick={() => handleDelete(idx)} />
                                    ) : null)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Training */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    background: 'var(--cardBg)',
                    border: '2px solid var(--cardBorder)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ margin: '0 0 0.5rem 0', textAlign: 'center' }}>2. Training</h2>
                    
                    <div style={{ 
                        flex: 1,
                        background: 'var(--bgTertiary)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '8px',
                        overflowY: 'auto', 
                        padding: '1rem',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        minHeight: '200px'
                    }}>
                        {logs.length === 0 ? <p style={{ color: 'var(--textDim)', margin: 0, fontSize: '1rem' }}>Waiting to train...</p> : 
                            logs.map((log, i) => (
                                <div key={i} style={{ marginBottom: '0.25rem' }}>
                                    Ep {log.epoch}: Loss {log.loss} | Acc {log.acc}
                                </div>
                            ))
                        }
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Button 
                            onClick={handleTrain} 
                            disabled={trainingStatus === 'Training' || dataset.length === 0}
                            variant={trainingStatus === 'Complete' ? 'success' : 'primary'}
                            style={{ fontSize: '1rem' }}
                        >
                            {trainingStatus === 'Training' ? 'Training...' : 'Start Training'}
                        </Button>

                        {trainingStatus === 'Complete' && (
                            <Button variant="secondary" onClick={handleDownload}>
                                ⬇️ Download Model
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
