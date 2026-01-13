import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const HelloWorld = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Colors: Deep Violet, Vibrant Purple, Soft Cyan-Blue
  const colors = [
    '#2E004F', // Deep Violet (Base)
    '#9D00FF', // Vibrant Purple
    '#00FFFF', // Soft Cyan-Blue
    '#4B0082', // Indigo (Depth)
    '#7F00FF', // Violet
  ];

  // Generate Organic Blobs
  const blobs = useMemo(() => {
    return colors.map((color, i) => ({
      color,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.max(width, height) * 0.8, // Large blobs for smooth mesh
      speedX: 0.002 + Math.random() * 0.002,
      speedY: 0.002 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [width, height]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a0033', overflow: 'hidden' }}>
      
      {/* 1. The Mesh Gradient Layer */}
      <div style={{
        position: 'absolute',
        width: '100%', height: '100%',
        filter: 'blur(150px)', // High blur for "Mesh" effect
        opacity: 0.9,
        transform: 'scale(1.4)', // Zoom in to avoid edges
      }}>
        {blobs.map((blob, i) => {
          // Fluid liquid motion
          const moveX = Math.sin(frame * blob.speedX + blob.phase) * (width * 0.3);
          const moveY = Math.cos(frame * blob.speedY + blob.phase) * (height * 0.3);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (width / 2) - (blob.size / 2) + moveX,
                top: (height / 2) - (blob.size / 2) + moveY,
                width: blob.size,
                height: blob.size,
                backgroundColor: blob.color,
                borderRadius: '50%',
                opacity: 0.8,
                mixBlendMode: 'screen', // Smooth blending
              }}
            />
          );
        })}
      </div>

      {/* 2. Lighting Overlay (Brighter Top-Right, Darker Bottom-Left) */}
      <AbsoluteFill style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* 3. Subtle Grain for "Modern" Texture (Optional) */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%', opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none'
      }}/>

    </AbsoluteFill>
  );
};