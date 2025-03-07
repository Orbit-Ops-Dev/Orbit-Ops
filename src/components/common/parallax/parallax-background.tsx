import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import styled from 'styled-components';
import { twinkle } from '../../../styles/animation';

// Types
export interface ParallaxLayerType {
  speed: number;
  direction?: 'x' | 'y';
  type?: 'linear' | 'easing' | 'cyber' | 'space';
  opacity?: number;
  starsCount?: number;
  starsColor?: string;
  twinkleSpeed?: number;
}

export interface ParallaxBackgroundProps {
  children: ReactNode;
  layers?: ParallaxLayerType[];
  enabled?: boolean;
  className?: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  twinkleDuration: number;
  twinkleDelay: number;
}

interface ParallaxTransform {
  transform: string;
  opacity?: number;
}

// Star colors with a cyberpunk/space theme
const STAR_COLORS = [
  '#ffffff', // White
  '#e0fbfc', // Light cyan
  '#c2f0fc', // Sky blue
  '#a2d6f9', // Light blue
  '#fcf6bd', // Light yellow
  '#d1cffa', // Light purple
  '#ff9fb0', // Pink
  '#ffc2d1', // Light pink
  '#01cdfe', // Neon blue
  '#05ffa1', // Neon green
  '#fffb96'  // Neon yellow
];

// Styled Components
const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const ParallaxLayer = styled.div.attrs<{ transform: string; opacity?: number }>(props => ({
  style: {
    transform: props.transform,
    opacity: props.opacity !== undefined ? props.opacity : 1
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const StarElement = styled.div.attrs<{
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  twinkleDuration: number;
}>(props => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    backgroundColor: props.color,
    opacity: props.opacity,
    animationDuration: `${props.twinkleDuration}s`
  },
}))`
  position: absolute;
  border-radius: 50%;
  animation: ${twinkle} ease-in-out infinite;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
`;

// Component
const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  layers = [
    { speed: 0.1, direction: 'y', type: 'cyber' },
    { speed: 0.05, direction: 'y', type: 'linear', opacity: 0.5 }
  ],
  enabled = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Store state and refs
  const [transforms, setTransforms] = useState<ParallaxTransform[]>([]);
  const [stars, setStars] = useState<Star[][]>([]);
  
  const layersRef = useRef(layers);
  const animationFrameId = useRef<number | null>(null);
  
  // Initialize enhanced layers
  const enhancedLayersRef = useRef(
    layersRef.current.map(layer => ({
      ...layer,
      starsCount: layer.starsCount ?? (layer.type === 'space' ? 150 : 0),
      twinkleSpeed: layer.twinkleSpeed ?? 3
    }))
  );

  // Generate stars for a layer
  const generateStars = useCallback((
    layerIndex: number, 
    count: number, 
    width: number, 
    height: number
  ): Star[] => {
    const layer = enhancedLayersRef.current[layerIndex];
    if (!layer || !count) return [];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5, // 0.5 to 2.5px
      opacity: Math.random() * 0.7 + 0.3, // 0.3 to 1.0
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      twinkleDuration: (Math.random() * 3 + 2) * (layer.twinkleSpeed ?? 1), // 2-5 seconds, adjusted by speed
      twinkleDelay: Math.random() * 5, // Random start delay
    }));
  }, []);

  // Calculate parallax effect
  const calculateParallaxEffect = useCallback(() => {
    if (!containerRef.current || !enabled) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if element is in view
    const isInView = 
      rect.top < windowHeight &&
      rect.bottom > 0;

    if (!isInView) return;

    // Calculate relative position of element in viewport
    const scrollProgress = 1 - (rect.top / windowHeight);

    // Calculate transforms for each layer
    const newTransforms = enhancedLayersRef.current.map((layer) => {
      const { 
        speed, 
        direction = 'y', 
        type = 'linear', 
        opacity
      } = layer;

      // Calculate offset based on scroll progress and layer speed
      let offset;
      switch (type) {
        case 'easing':
          offset = Math.sin(scrollProgress * Math.PI) * speed * 100;
          break;
        case 'cyber':
          offset = (
            Math.sin(scrollProgress * 10) * 
            Math.cos(scrollProgress * 7) * 
            speed * 50
          );
          break;
        case 'space':
          offset = (
            Math.sin(scrollProgress * 5) * 
            speed * 75
          );
          break;
        default:
          offset = scrollProgress * speed * 100;
      }

      // Determine transform direction
      const transform = direction === 'x'
        ? `translateX(${offset}px) rotate(${offset / 10}deg)`
        : `translateY(${offset}px) perspective(500px) rotateX(${offset / 20}deg)`;

      return {
        transform,
        ...(opacity !== undefined ? { opacity } : {})
      };
    });

    setTransforms(newTransforms);
  }, [enabled]);

  // Initialize stars and set up animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const { width, height } = rect;
    
    // Initialize layers ref
    layersRef.current = layers;
    enhancedLayersRef.current = layers.map(layer => ({
      ...layer,
      starsCount: layer.starsCount ?? (layer.type === 'space' ? 150 : 0),
      twinkleSpeed: layer.twinkleSpeed ?? 3
    }));
    
    // Initialize initial transforms
    setTransforms(enhancedLayersRef.current.map(() => ({ transform: 'none' })));
    
    // Initialize stars for each layer
    const initialStars = enhancedLayersRef.current.map((layer, index) => {
      if (layer.type === 'space' && layer.starsCount) {
        return generateStars(index, layer.starsCount, width, height);
      }
      return [];
    });
    
    setStars(initialStars);
    
    // Animation loop
    const animate = () => {
      calculateParallaxEffect();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newRect = containerRef.current.getBoundingClientRect();
      const { width: newWidth, height: newHeight } = newRect;
      
      // Regenerate stars based on new dimensions
      const resizedStars = enhancedLayersRef.current.map((layer, index) => {
        if (layer.type === 'space' && layer.starsCount) {
          return generateStars(index, layer.starsCount, newWidth, newHeight);
        }
        return [];
      });
      
      setStars(resizedStars);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [layers, generateStars, calculateParallaxEffect]);

  return (
    <Container ref={containerRef} className={className}>
      {/* Render parallax layers */}
      {transforms.map((transform, index) => (
        <ParallaxLayer key={`layer-${index}`} transform={transform.transform} opacity={transform.opacity}>
          {/* Render stars */}
          {stars[index]?.map(star => (
            <StarElement
              key={`star-${index}-${star.id}`}
              x={star.x}
              y={star.y}
              size={star.size}
              opacity={star.opacity}
              color={star.color}
              twinkleDuration={star.twinkleDuration}
            />
          ))}
        </ParallaxLayer>
      ))}
      
      {/* Content container */}
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default ParallaxBackground;