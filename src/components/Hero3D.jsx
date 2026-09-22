import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import "../styles/hero3d.css";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IS_MOBILE =
  typeof window !== "undefined" && window.innerWidth <= 760;

const SCENE_SETTINGS = IS_MOBILE
  ? { pos: [0, 0.3, -2.4], scale: 0.8 }
  : { pos: [0, 0.1, -0.6], scale: 1.2 };

const CAMERA_Z = IS_MOBILE ? 11 : 7;

const STAR_COUNT = IS_MOBILE ? 200 : 700;

function Starfield() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
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


function SceneContent() {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const yaw = useRef(0);
  const pitch = useRef(0);
  const accumYaw = useRef(0);
  const lastActivity = useRef(0);

  const STALL_MS = 1500;
  const AUTO_SPEED = 0.16;

  useEffect(() => {
    if (REDUCED) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      lastActivity.current = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (REDUCED) return;
    const g = group.current;
    if (!g) return;

    const d = Math.min(delta, 0.05);
    const active = performance.now() - lastActivity.current < STALL_MS;

    if (!active) {
      accumYaw.current += AUTO_SPEED * d;
    }

    const yawTarget = accumYaw.current + pointer.current.x * 0.3;
    const pitchTarget = active ? -pointer.current.y * 0.2 : 0;

    const pk = active ? 1 - Math.exp(-d * 2.2) : 1 - Math.exp(-d * 1.6);
    pitch.current += (pitchTarget - pitch.current) * pk;

    let diff = yawTarget - yaw.current;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    const yk = active ? 1 - Math.exp(-d * 3.4) : 1 - Math.exp(-d * 2.2);
    yaw.current += diff * yk;

    g.rotation.y = yaw.current;
    g.rotation.x = pitch.current;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-5, 3, -4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[5, 4, 5]} intensity={70} color="#3b82f6" />
      <Core />
      <Starfield />
      <Sparkles count={IS_MOBILE ? 10 : 30} scale={[10, 7, 8]} size={2.2} speed={0.15} color="#7cc0ff" />
    </group>
  );
}

function SceneTransform() {
  return (
    <group position={SCENE_SETTINGS.pos} scale={SCENE_SETTINGS.scale}>
      <SceneContent />
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
      <CanvasBoundary fallback={<FallbackScene />}>
        <Canvas
          dpr={[1, IS_MOBILE ? 1.4 : 1.8]}
          camera={{ position: [0, 0, CAMERA_Z], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <SceneTransform />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}