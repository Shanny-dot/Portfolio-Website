import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Wireframe Node Sphere Component
function CoverageNodeNetwork({ color = "#10b981", accentColor = "#f59e0b" }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  // Generate node positions and line connections representing test coverage graph
  const { nodePositions, linePositions, pointColors } = useMemo(() => {
    const nodeCount = 80;
    const radius = 2.4;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const rawNodes = [];

    const baseColorObj = new THREE.Color(color);
    const accentColorObj = new THREE.Color(accentColor);

    // Golden spiral distribution on sphere surface
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / phi;
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      const px = x * radius;
      const py = y * radius;
      const pz = z * radius;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      rawNodes.push(new THREE.Vector3(px, py, pz));

      // Color variation: 20% accent nodes (alert/anomaly test nodes)
      const isAccent = Math.random() < 0.2;
      const c = isAccent ? accentColorObj : baseColorObj;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Connect nodes within a maximum distance to form a pipeline graph network
    const maxDist = 1.35;
    const lineCoords = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = rawNodes[i].distanceTo(rawNodes[j]);
        if (dist < maxDist) {
          lineCoords.push(
            rawNodes[i].x, rawNodes[i].y, rawNodes[i].z,
            rawNodes[j].x, rawNodes[j].y, rawNodes[j].z
          );
        }
      }
    }

    return {
      nodePositions: positions,
      linePositions: new Float32Array(lineCoords),
      pointColors: colors
    };
  }, [color, accentColor]);

  // Animation frame loop: subtle rotation & mouse reaction
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base slow rotation
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;

      // Mouse inertia tracking
      const targetX = state.pointer.y * 0.3;
      const targetY = state.pointer.x * 0.4;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Network Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Glowing Nodes (Points) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={pointColors.length / 3}
            array={pointColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Inner Core Pulse Ring */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

// Fallback component when WebGL is unavailable or disabled
function StaticGradientFallback() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#0b101d] via-[#070a11] to-[#04060b] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 scanline-grid opacity-30"></div>
      
      {/* Glowing Static SVG Graph Fallback */}
      <div className="relative w-72 h-72 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.15)] animate-pulse-glow">
        <div className="w-48 h-48 rounded-full border border-dashed border-emerald-400/30 flex items-center justify-center animate-spin-slow">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-400/50 flex items-center justify-center">
            <span className="font-mono text-[10px] text-emerald-400">QA_NODES_OK</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 font-mono text-[11px] text-slate-500">
        [WEBGL_DISABLED // MATRIX_FALLBACK_ACTIVE]
      </div>
    </div>
  );
}

export default function Hero3DCanvas() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [density, setDensity] = useState('NORMAL');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return <StaticGradientFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[420px] md:min-h-[550px]">
      <Suspense fallback={<StaticGradientFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
          <CoverageNodeNetwork />
        </Canvas>
      </Suspense>

      {/* 3D Telemetry Overlay Badge */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-[#0d1322]/80 backdrop-blur border border-emerald-500/30 px-3 py-1.5 rounded font-mono text-[11px] text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>R3F_TEST_GRAPH // 80 NODES CONNECTED</span>
      </div>
    </div>
  );
}
