import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import GridCanvas from '../components/GridCanvas';
import Button from '../components/Button';
import NetworkViz from '../components/NetworkViz';

const Viewer = () => {
    const [model, setModel] = useState(null);
    const [pixels, setPixels] = useState(new Array(64).fill(0));
    const [result, setResult] = useState(null);
    const [activations, setActivations] = useState(null);
    const [weights, setWeights] = useState(null);

    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length < 2) {
            alert("Please upload both model.json and weights.bin");
            return;
        }

        let jsonFile = files.find(f => f.name.endsWith('.json'));
        let weightsFile = files.find(f => f.name.endsWith('.bin'));

        if (!jsonFile || !weightsFile) {
             alert("Could not identify .json and .bin files.");
             return;
        }

        try {
            const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([jsonFile, weightsFile]));
            setModel(loadedModel);
            
            const layers = loadedModel.layers;
            const extractedWeights = [];
            
            for (let i = 0; i < layers.length; i++) {
                const w = layers[i].getWeights()[0]?.dataSync();
                if (w) extractedWeights.push(w);
            }
            
            setWeights(extractedWeights);
            alert(`Model Loaded! Detected ${extractedWeights.length} Dense layers.`);
        } catch (err) {
            console.error(err);
            alert("Failed to load model. Ensure you selected both files.");
        }
    };

    const loadSampleModel = async () => {
        try {
            const modelPath = '/samplemodel/hai-lite-model.json';
            const loadedModel = await tf.loadLayersModel(modelPath);
            setModel(loadedModel);
            
            const layers = loadedModel.layers;
            const extractedWeights = [];
            
            for (let i = 0; i < layers.length; i++) {
                const w = layers[i].getWeights()[0]?.dataSync();
                if (w) extractedWeights.push(w);
            }
            
            setWeights(extractedWeights);
            alert('Sample model loaded successfully!');
        } catch (error) {
            console.error('Error loading sample model:', error);
            alert('Failed to load sample model.');
        }
    };

    const handlePredict = () => {
        if (!model) return;

        tf.tidy(() => {
            const inputTensor = tf.tensor2d([pixels], [1, 64]);
            
            const layers = model.layers;
            const computedActivations = { input: pixels };
            let currentTensor = inputTensor;
            let finalVal = 0;

            for (let i = 0; i < layers.length; i++) {
                 currentTensor = layers[i].apply(currentTensor);
                  const data = currentTensor.dataSync();
                  
                  if (i === layers.length - 1) {
                      finalVal = data[0];
                      computedActivations.output = [finalVal];
                  } else {
                      computedActivations[`hidden${i + 1}`] = Array.from(data);
                  }
            }

            setActivations(computedActivations);
            setResult(finalVal);
        });
    };
    
    const handleClear = () => {
        setPixels(new Array(64).fill(0));
        setResult(null);
        setActivations(null);
    };

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', flex: 1, width: '100%', margin: '0' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>💡 Viewer Tool</h1>
                <p style={{ color: 'var(--text-dimary)', fontSize: '1.1rem' }}>Upload your trained model and visualize the prediction.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', justifyContent: 'center', width: '100%', minHeight: '75vh', paddingTop: '0.5rem'}}>
                {/* Left Panel - Compact Input */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '2rem', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex: '0 0 auto',
                    transform: 'scale(0.9)',
                    transformOrigin: 'top center',
                    background: 'var(--cardBg)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '2px solid var(--cardBorder)'
                }}>
                    <GridCanvas value={pixels} onChange={setPixels} />
                    
                    <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center'}}>
                        <Button variant="secondary" onClick={handleClear}>Clear</Button>
                        {model && (
                            <Button onClick={handlePredict} variant="primary">
                                Predict!
                            </Button>
                        )}
                    </div>

                    {!model && (
                        <div style={{ 
                            marginTop: '0.5rem', 
                            textAlign: 'center', 
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ 
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '2px dashed rgba(255, 255, 255, 0.2)'
                            }}>
                                <label 
                                    htmlFor="file-upload" 
                                    style={{ 
                                        display: 'block',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(0, 229, 255, 0.1)',
                                        border: '2px solid #00e5ff',
                                        borderRadius: '6px',
                                        color: '#00e5ff',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        marginBottom: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.2)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    >
                                        📁 Upload Model Files
                                    </div>
                                    <p style={{ 
                                        fontSize: '0.75rem', 
                                        color: '#888',
                                        margin: 0
                                    }}>
                                        Select model.json & weights.bin
                                    </p>
                                </label>
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    multiple 
                                    onChange={handleFileUpload} 
                                    accept=".json,.bin"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                color: '#666',
                                fontSize: '0.85rem'
                            }}>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <span>OR</span>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            </div>
                            
                            <Button variant="secondary" onClick={loadSampleModel} style={{ width: '100%' }}>
                                🎯 Load Sample Model
                            </Button>
                        </div>
                    )}

                    {result !== null && (
                         <div style={{ marginTop: '0.5rem', textAlign: 'center', background: 'var(--bgTertiary)', border: '1px solid var(--border)', padding: '0.8rem', borderRadius: '8px', width: '100%' }}>
                             <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>Prediction: {result > 0.5 ? '1' : '0'}</h3>
                             <p style={{ margin: 0, fontSize: '0.85rem' }}>Confidence: {(result * 100).toFixed(1)}%</p>
                         </div>
                    )}
                </div>

                {/* Right Panel - Large Visualization */}
                <div style={{ 
                    flex: '1', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    background: 'var(--cardBg)',
                    padding: '0',
                    borderRadius: '12px',
                    border: '2px solid var(--cardBorder)'
                }}>
                    {model && weights && activations ? (
                        <NetworkViz 
                            input={activations.input} 
                            hidden1={activations.hidden1} 
                            hidden2={activations.hidden2} 
                            output={activations.output} 
                            weights={weights} 
                        />
                    ) : (
                         <div style={{color: '#555', textAlign: 'center', fontSize: '1.2rem', margin: 'auto', height: '70vh', lineHeight: '70vh'}}>
                            {model ? "Click Predict to visualize" : "Upload or Load Sample Model"}
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Viewer;
