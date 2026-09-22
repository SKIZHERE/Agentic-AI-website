import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import "../styles/hero3d.css";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IS_MOBILE =
  typeof window !== "undefined" && window.innerWidth <= 760;

const SCENE_SETTINGS = IS_MOBILE
  ? { pos: [0, 0.3, -2.4], scale: 0.5 }
  : { pos: [0, 0.1, -0.6], scale: 1.2 };

const CAMERA_Z = IS_MOBILE ? 11 : 7;

const STAR_COUNT = IS_MOBILE ? 400 : 750;

function Starfield() {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (REDUCED) return;
    ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#5ea7ff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HolographicGlobe() {
  const groupRef = useRef();
  const shellRef = useRef();
  const coreRef = useRef();

  const gridGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.9, 1), []);
  const innerGeometry = useMemo(() => new THREE.OctahedronGeometry(1.35, 0), []);
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(1.72, 32, 24), []);

  const pointer = useRef({ x: 0, y: 0 });
  const yaw = useRef(0);
  const pitch = useRef(0);
  const yawTarget = useRef(0);
  const lastActivity = useRef(0);

  const STALL_MS = 2000;
  const AUTO_SPEED = 0.16;
  const MOUSE_YAW = 0.6;
  const PITCH_RANGE = 0.2;

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
    const g = groupRef.current;
    if (!g) return;

    if (REDUCED) {
      g.rotation.y = -0.3;
      g.rotation.x = 0.1;
      g.rotation.z = 0.12;
      return;
    }

    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const active = performance.now() - lastActivity.current < STALL_MS;

    if (active) {
      yawTarget.current = THREE.MathUtils.clamp(pointer.current.x, -1, 1) * MOUSE_YAW;
      const pitchTarget = -pointer.current.y * PITCH_RANGE;
      const pk = 1 - Math.exp(-d * 2.2);
      pitch.current += (pitchTarget - pitch.current) * pk;
    } else {
      yawTarget.current += AUTO_SPEED * d;
      const pk = 1 - Math.exp(-d * 1.6);
      pitch.current += (0 - pitch.current) * pk;
    }

    let diff = yawTarget.current - yaw.current;
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    const yk = active ? 1 - Math.exp(-d * 3.4) : 1 - Math.exp(-d * 2.2);
    yaw.current += diff * yk;

    g.rotation.y = yaw.current;
    g.rotation.x = pitch.current;

    g.rotation.z += d * 0.05;

    if (shellRef.current) {
      shellRef.current.rotation.y += d * 0.18;
      shellRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
      const pulse = 1 + Math.sin(t * 1.1) * 0.025;
      shellRef.current.scale.setScalar(pulse);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= d * 0.3;
      const glow = 1.5 + Math.sin(t * 1.1 + 1) * 0.35;
      coreRef.current.material.emissiveIntensity = glow;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0.5, 1.4]} intensity={6} color="#22d3ee" />
      <pointLight position={[0, -0.6, -1.2]} intensity={3} color="#3b82f6" />

      <group ref={shellRef}>
        <lineSegments>
          <edgesGeometry args={[gridGeometry, 0]} />
          <lineBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        <lineSegments>
          <edgesGeometry args={[innerGeometry, 0]} />
          <lineBasicMaterial
            color="#7cc0ff"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        <mesh geometry={glowGeometry}>
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={coreRef}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshStandardMaterial
            color="#eaf8ff"
            emissive="#22d3ee"
            emissiveIntensity={1.5}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

function SceneContent() {
  return (
    <group>
      <ambientLight intensity={0.45} />
      <directionalLight position={[-5, 3, -4]} intensity={1.6} color="#22d3ee" />
      <HolographicGlobe />
      <Starfield />
      <Sparkles
        count={IS_MOBILE ? 24 : 55}
        scale={[9, 6, 6]}
        size={1.5}
        speed={0.22}
        color="#7cc0ff"
        opacity={0.5}
      />
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