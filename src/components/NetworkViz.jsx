import React, { useEffect, useRef, useState } from 'react';

const NetworkViz = ({ input, hidden1, hidden2, output, weights }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [animationProgress, setAnimationProgress] = useState(0);
    const [mousePos, setMousePos] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoverTransition, setHoverTransition] = useState(1);
    const hoverTransitionRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !input || !weights) return;
        startAnimation();
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [input, hidden1, hidden2, output, weights]);

    useEffect(() => {
        drawVisualization();
    }, [scale, offset, animationProgress, hoveredNode, hoverTransition]);

    // Animate hover transition
    useEffect(() => {
        if (hoveredNode) {
            // Fade in highlight
            const startTime = Date.now();
            const duration = 200;
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setHoverTransition(progress);
                
                if (progress < 1) {
                    hoverTransitionRef.current = requestAnimationFrame(animate);
                }
            };
            
            animate();
        } else {
            // Fade out highlight
            const startTime = Date.now();
            const duration = 200;
            const startValue = hoverTransition;
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                setHoverTransition(startValue * (1 - progress));
                
                if (progress < 1) {
                    hoverTransitionRef.current = requestAnimationFrame(animate);
                }
            };
            
            animate();
        }
        
        return () => {
            if (hoverTransitionRef.current) {
                cancelAnimationFrame(hoverTransitionRef.current);
            }
        };
    }, [hoveredNode]);

    const startAnimation = () => {
        setAnimationProgress(0); // Reset progress
        const startTime = Date.now();
        const duration = 7000; // 7 seconds total animation
        
        // Cancel any existing animation
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setAnimationProgress(progress);
            
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };
        
        animate();
    };

    const resetZoom = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
    };

    const handleWheel = (e) => {
        e.preventDefault();
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        
        // Mouse position relative to canvas
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate zoom
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.5, Math.min(3, scale * delta));
        
        // Adjust offset to zoom towards mouse position
        const scaleChange = newScale / scale;
        const newOffsetX = mouseX - (mouseX - offset.x) * scaleChange;
        const newOffsetY = mouseY - (mouseY - offset.y) * scaleChange;
        
        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Transform mouse position to canvas coordinates
        const canvasX = (mouseX - offset.x) / scale;
        const canvasY = (mouseY - offset.y) / scale;
        
        setMousePos({ x: canvasX, y: canvasY });
        
        // Detect hovered node immediately (only after animation completes)
        if (animationProgress === 1 && input && hidden1 && output && weights) {
            const hasHidden2 = !!hidden2;
            
            // Recreate node positions (same as in draw function)
            const inputNodes = input.map((val, i) => ({
                id: `i${i}`,
                layer: 'input',
                x: 150 + (i % 8) * 35,
                y: 200 + Math.floor(i / 8) * 35
            }));
            
            const h1Nodes = hidden1.map((val, i) => ({
                id: `h1-${i}`,
                layer: 'hidden1',
                x: hasHidden2 ? 500 : 700,
                y: 120 + i * (hidden1.length > 8 ? 35 : 60)
            }));
            
            const h2Nodes = hasHidden2 ? hidden2.map((val, i) => ({
                id: `h2-${i}`,
                layer: 'hidden2',
                x: 850,
                y: 220 + i * 50
            })) : [];
            
            const outputNode = {
                id: 'output',
                layer: 'output',
                x: 1100,
                y: 350
            };
            
            const allNodes = [...inputNodes, ...h1Nodes, ...h2Nodes, outputNode];
            
            // Find hovered node
            let foundNode = null;
            for (const node of allNodes) {
                let radius;
                if (node.layer === 'input') radius = 16;
                else if (node.layer === 'hidden1') radius = 22;
                else if (node.layer === 'hidden2') radius = 24;
                else radius = 34;
                
                const dx = canvasX - node.x;
                const dy = canvasY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= radius) {
                    foundNode = node;
                    break;
                }
            }
            
            // Update hovered node if changed
            if (foundNode?.id !== hoveredNode?.id) {
                setHoveredNode(foundNode);
            }
        }
        
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setMousePos(null);
        setHoveredNode(null);
    };

    const drawVisualization = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // Set canvas size
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        const width = rect.width;
        const height = rect.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Apply transformations
        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);
        
        const hasHidden2 = !!hidden2;
        
        // Setup node positions
        const inputNodes = input.map((val, i) => ({
            id: `i${i}`,
            layer: 'input',
            layerIndex: 0,
            value: val,
            x: 150 + (i % 8) * 35,
            y: 200 + Math.floor(i / 8) * 35
        }));
        
        const h1Nodes = hidden1.map((val, i) => ({
            id: `h1-${i}`,
            layer: 'hidden1',
            layerIndex: 1,
            value: val,
            x: hasHidden2 ? 500 : 700,
            y: 120 + i * (hidden1.length > 8 ? 35 : 60)
        }));
        
        const h2Nodes = hasHidden2 ? hidden2.map((val, i) => ({
            id: `h2-${i}`,
            layer: 'hidden2',
            layerIndex: 2,
            value: val,
            x: 850,
            y: 220 + i * 50
        })) : [];
        
        const outputNode = {
            id: 'output',
            layer: 'output',
            layerIndex: hasHidden2 ? 3 : 2,
            value: output[0],
            x: 1100,
            y: 350
        };
        
        const allNodes = [...inputNodes, ...h1Nodes, ...h2Nodes, outputNode];
        
        // Create links with target layer info
        const allLinks = [];
        
        // Input -> Hidden1
        inputNodes.forEach((src, i) => {
            h1Nodes.forEach((tgt, h) => {
                const w = weights[0][i * h1Nodes.length + h];
                allLinks.push({
                    source: src,
                    target: tgt,
                    weight: w,
                    strength: Math.abs(src.value * w),
                    targetLayer: 1
                });
            });
        });
        
        // Hidden1 -> Hidden2 or Output
        if (hasHidden2) {
            h1Nodes.forEach((src, i) => {
                h2Nodes.forEach((tgt, h) => {
                    const w = weights[1][i * h2Nodes.length + h];
                    allLinks.push({
                        source: src,
                        target: tgt,
                        weight: w,
                        strength: Math.abs(src.value * w),
                        targetLayer: 2
                    });
                });
            });
            
            h2Nodes.forEach((src, i) => {
                const w = weights[2][i];
                allLinks.push({
                    source: src,
                    target: outputNode,
                    weight: w,
                    strength: Math.abs(src.value * w),
                    targetLayer: 3
                });
            });
        } else {
            h1Nodes.forEach((src, i) => {
                const w = weights[1][i];
                allLinks.push({
                    source: src,
                    target: outputNode,
                    weight: w,
                    strength: Math.abs(src.value * w),
                    targetLayer: 2
                });
            });
        }
        
        // Find incoming links for hovered node
        const incomingLinks = hoveredNode 
            ? allLinks.filter(link => link.target.id === hoveredNode.id)
            : [];
        
        // Animation timing
        const maxLayer = hasHidden2 ? 3 : 2;
        const layerDuration = 1 / (maxLayer + 1);
        
        // Draw nodes FIRST (so links will be on top)
        allNodes.forEach(node => {
            const nodeStartTime = node.layerIndex * layerDuration;
            const nodeEndTime = nodeStartTime + layerDuration * 0.3;
            const nodeProgress = Math.max(0, Math.min(1, (animationProgress - nodeStartTime) / (nodeEndTime - nodeStartTime)));
            
            if (nodeProgress <= 0) return;
            
            let radius;
            if (node.layer === 'input') radius = 16;
            else if (node.layer === 'hidden1') radius = 16;
            else if (node.layer === 'hidden2') radius = 22;
            else radius = 32;
            
            // Pulse effect for output
            if (node.layer === 'output' && nodeProgress === 1 && animationProgress > 0.9) {
                const pulse = Math.sin((animationProgress - 0.9) * 20) * 4;
                radius += pulse;
            }
            
            // Hover effect: dim non-related nodes
            let nodeAlpha = nodeProgress;
            if (hoveredNode && animationProgress === 1 && hoverTransition > 0) {
                const isHovered = node.id === hoveredNode.id;
                const isSource = incomingLinks.some(link => link.source.id === node.id);
                if (!isHovered && !isSource) {
                    // Smoothly transition to 30% opacity
                    nodeAlpha *= (1 - 0.7 * hoverTransition);
                }
            }
            
            ctx.globalAlpha = nodeAlpha;
            
            // Fill
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius * nodeProgress, 0, Math.PI * 2);
            
            if (node.layer === 'input') {
                ctx.fillStyle = node.value > 0 ? '#fff' : '#222';
            } else if (node.layer === 'output') {
                ctx.fillStyle = node.value > 0.5 ? '#00e5ff' : '#ff007a';
            } else {
                const intensity = Math.floor(node.value * 255);
                ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
            }
            ctx.fill();
            
            // Stroke - highlight hovered node
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius * nodeProgress, 0, Math.PI * 2);
            if (node.layer === 'input') {
                ctx.strokeStyle = node.value > 0 ? '#fff' : '#555';
            } else if (node.layer === 'output') {
                ctx.strokeStyle = '#fff';
            } else {
                ctx.strokeStyle = '#aaa';
            }
            
            // Thicker stroke for hovered node with smooth transition
            if (hoveredNode && node.id === hoveredNode.id && hoverTransition > 0) {
                const strokeWidth = 2 + 2 * hoverTransition;
                ctx.lineWidth = strokeWidth;
                ctx.strokeStyle = '#fff';
            } else {
                ctx.lineWidth = 2;
            }
            ctx.stroke();
            
            ctx.globalAlpha = 1;
        });
        
        // Draw links ON TOP of nodes
        allLinks.forEach(link => {
            const linkStartTime = (link.targetLayer - 0.5) * layerDuration;
            const linkEndTime = linkStartTime + layerDuration * 0.6;
            const linkProgress = Math.max(0, Math.min(1, (animationProgress - linkStartTime) / (linkEndTime - linkStartTime)));
            
            if (linkProgress <= 0) return;
            
            const currentX = link.source.x + (link.target.x - link.source.x) * linkProgress;
            const currentY = link.source.y + (link.target.y - link.source.y) * linkProgress;
            
            // Hover effect: highlight incoming links with smooth transition
            let linkAlpha = Math.min(0.7, link.strength * 2.5) * linkProgress;
            let linkWidth = Math.max(0.5, link.strength * 4);
            
            if (hoveredNode && animationProgress === 1 && hoverTransition > 0) {
                const isIncoming = incomingLinks.some(l => l.source.id === link.source.id && l.target.id === link.target.id);
                if (isIncoming) {
                    // Smoothly transition to full opacity and thicker width
                    const targetAlpha = 1;
                    const targetWidth = Math.max(3, link.strength * 6);
                    linkAlpha = linkAlpha + (targetAlpha - linkAlpha) * hoverTransition;
                    linkWidth = linkWidth + (targetWidth - linkWidth) * hoverTransition;
                } else {
                    // Smoothly transition to 20% opacity
                    linkAlpha *= (1 - 0.8 * hoverTransition);
                }
            }
            
            ctx.beginPath();
            ctx.moveTo(link.source.x, link.source.y);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = link.weight > 0 ? '#00e5ff' : '#ff007a';
            ctx.lineWidth = linkWidth;
            ctx.globalAlpha = linkAlpha;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
        
        // Draw labels
        if (animationProgress > 0.5) {
            const labelAlpha = Math.min(1, (animationProgress - 0.5) * 2);
            ctx.globalAlpha = labelAlpha;
            
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'start';
            ctx.fillStyle = '#fff';
            
            [...h1Nodes, ...h2Nodes, outputNode].forEach(node => {
                if (node.layer === 'output') {
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 18px Inter, sans-serif';
                    ctx.fillText(node.value.toFixed(3), node.x, node.y + 6);
                    ctx.font = '14px Inter, sans-serif';
                } else {
                    ctx.textAlign = 'start';
                    ctx.fillText(node.value.toFixed(3), node.x + 30, node.y + 5);
                }
            });
            
            ctx.globalAlpha = 1;
        }
        
        // Draw layer labels
        if (animationProgress > 0.3) {
            ctx.globalAlpha = Math.min(1, (animationProgress - 0.3) * 1.5);
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillStyle = '#888';
            
            ctx.textAlign = 'start';
            ctx.fillText('Input Layer (8×8)', 220, 150);
            
            ctx.textAlign = 'center';
            ctx.fillText(`Hidden Layer 1 (${h1Nodes.length} units)`, h1Nodes[0].x, 80);
            
            if (hasHidden2) {
                ctx.fillText(`Hidden Layer 2 (${h2Nodes.length} units)`, h2Nodes[0].x, 180);
            }
            
            ctx.fillText('Output', 1100, 300);
            
            ctx.globalAlpha = 1;
        }
        
        ctx.restore();
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '70vh' }}>
            <div 
                ref={containerRef} 
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%', 
                    overflow: 'hidden', 
                    marginBottom: '10px',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <canvas 
                    ref={canvasRef}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px'
                    }}
                />
            </div>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'end',
                alignItems: 'center',
                gap: '15px',
                padding: '0px 10px'
            }}>
                <button 
                    onClick={() => startAnimation()}
                    style={{ 
                        padding: '8px 16px', 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        color: '#aaa', 
                        border: '2px solid rgba(255, 255, 255, 0.2)', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.color = '#aaa';
                    }}
                >
                    Replay Animation
                </button>
                <button 
                    onClick={resetZoom}
                    style={{ 
                        padding: '8px 16px', 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        color: '#aaa', 
                        border: '2px solid rgba(255, 255, 255, 0.2)', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.color = '#aaa';
                    }}
                >
                    Reset Zoom
                </button>
            </div>
        </div>
    );
};

export default NetworkViz;
