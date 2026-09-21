import { Component, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import "../styles/hero3d.css";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAR_COUNT = 1500;

function Starfield() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (REDUCED) return;
    ref.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#5ea7ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const knot = useRef();
  const shell = useRef();

  useFrame((state) => {
    if (REDUCED) {
      knot.current.rotation.y = 0.6;
      return;
    }
    const t = state.clock.elapsedTime;
    knot.current.rotation.y = t * 0.35 + state.pointer.x * 0.55;
    knot.current.rotation.x = Math.sin(t * 0.2) * 0.18 + state.pointer.y * 0.28;
    shell.current.rotation.y = -t * 0.14;
    shell.current.rotation.z = t * 0.07;
  });

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.35, 1]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.15, 0.34, 220, 36]} />
        <meshStandardMaterial
          color="#1d4ed8"
          emissive="#2e6bff"
          emissiveIntensity={0.42}
          metalness={0.72}
          roughness={0.22}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#bfe4ff"
          emissive="#9fdbff"
          emissiveIntensity={2.2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

const ORBITERS = [
  { color: "#3b82f6", size: 0.26, pos: [3.2, 1.5, -1.2], speed: 1.6 },
  { color: "#60a5fa", size: 0.15, pos: [-3.4, -1.3, -0.6], speed: 2.1 },
  { color: "#22d3ee", size: 0.2, pos: [2.7, -2.0, -2.2], speed: 1.2 },
  { color: "#2563eb", size: 0.3, pos: [-2.9, 2.0, -1.4], speed: 1.9 },
  { color: "#93c5fd", size: 0.14, pos: [3.9, 0.1, -3.2], speed: 2.4 },
  { color: "#38bdf8", size: 0.2, pos: [-4.0, -0.2, -2.6], speed: 1.4 },
];

function Orbiters() {
  return ORBITERS.map((o, i) => (
    <Float key={i} speed={o.speed} rotationIntensity={1.4} floatIntensity={1.7}>
      <mesh position={o.pos}>
        <boxGeometry args={[o.size, o.size, o.size]} />
        <meshStandardMaterial
          color={o.color}
          emissive={o.color}
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  ));
}

function SceneContent() {
  const group = useRef();

  useFrame((state) => {
    if (REDUCED) return;
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.3, 0.045);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.2, 0.045);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-5, 3, -4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[5, 4, 5]} intensity={70} color="#3b82f6" />
      <Core />
      <Orbiters />
      <Starfield />
      <Sparkles count={100} scale={[16, 9, 10]} size={2.6} speed={0.32} color="#7cc0ff" />
    </group>
  );
}

class CanvasBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function FallbackScene() {
  return (
    <div className="hero3d-fallback" aria-hidden="true">
      <div className="fallback-orb fallback-orb--a" />
      <div className="fallback-orb fallback-orb--b" />
      <div className="fallback-grid" />
    </div>
  );
}

export default function Hero3D() {
  return (
    <div className="hero3d">
      <CanvasBoundary
        fallback={
          <FallbackScene />
        }
      >
        <Canvas
          dpr={[1, 1.8]}
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <SceneContent />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}