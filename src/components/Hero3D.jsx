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
  ? { pos: [0, 0.4, -2.4], scale: 0.55 }
  : { pos: [2.35, 0.1, -0.6], scale: 0.92 };

const CAMERA_Z = IS_MOBILE ? 9.2 : 7;

const STAR_COUNT = IS_MOBILE ? 650 : 1400;

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
        size={0.026}
        color="#5ea7ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const HUB_COUNT = 12;
const HUB_RADII = [1.0, 1.05, 1.12, 1.18, 1.0, 1.16, 1.08, 1.2, 1.02, 1.14, 1.1, 1.22];

function buildHubNodes() {
  const nodes = [];
  for (let i = 0; i < HUB_COUNT; i += 1) {
    const g = i * 2.399963;
    const v = Math.acos(1 - (2 * (i + 0.5)) / HUB_COUNT);
    const R = HUB_RADII[i];
    nodes.push([
      Math.cos(g) * Math.sin(v) * R,
      Math.cos(v) * R,
      Math.sin(g) * Math.sin(v) * R * 0.8,
    ]);
  }
  return nodes;
}

function buildHubLinks(nodes) {
  const pairs = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < 2.05) pairs.push(i, j);
    }
  }
  const arr = new Float32Array(pairs.length * 3);
  pairs.forEach((idx, k) => {
    arr[k * 3] = nodes[idx][0];
    arr[k * 3 + 1] = nodes[idx][1];
    arr[k * 3 + 2] = nodes[idx][2];
  });
  return arr;
}

const ORBITERS = [
  { rx: 2.45, ry: 1.4, rz: 1.1, speed: 0.5, phase: 0.6, size: 0.1, color: "#60a5fa", kind: "sphere" },
  { rx: 2.9, ry: 1.8, rz: 1.5, speed: -0.42, phase: 2.1, size: 0.08, color: "#22d3ee", kind: "octa" },
  { rx: 3.25, ry: 1.2, rz: 1.9, speed: 0.34, phase: 4.0, size: 0.11, color: "#93c5fd", kind: "sphere" },
  { rx: 2.3, ry: 2.0, rz: 1.0, speed: 0.58, phase: 1.3, size: 0.07, color: "#3b82f6", kind: "sphere" },
  { rx: 3.5, ry: 1.5, rz: 2.2, speed: -0.3, phase: 3.2, size: 0.09, color: "#38bdf8", kind: "octa" },
  { rx: 2.68, ry: 1.1, rz: 1.4, speed: 0.52, phase: 5.12, size: 0.08, color: "#7cc0ff", kind: "sphere" },
];

const DUST_RINGS = [
  { radius: 2.2, tilt: 0.35, count: 44, speed: 0.22, phase: 0.3, color: "#7cc0ff" },
  { radius: 2.95, tilt: -0.5, count: 34, speed: -0.16, phase: 1.9, color: "#4d8dff" },
  { radius: 3.4, tilt: 1.2, count: 26, speed: 0.26, phase: 0.8, color: "#9fd8ff" },
];

const DUST_TOTAL = DUST_RINGS.reduce((sum, r) => sum + r.count, 0);

function OrbitDust() {
  const geomRef = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(DUST_TOTAL * 3);
    let off = 0;
    for (const ring of DUST_RINGS) {
      const sa = Math.sin(ring.tilt);
      const ca = Math.cos(ring.tilt);
      for (let i = 0; i < ring.count; i += 1) {
        const a = (i / ring.count) * Math.PI * 2 + ring.phase;
        const x = Math.cos(a) * ring.radius;
        const z = Math.sin(a) * ring.radius;
        const id = (off + i) * 3;
        arr[id] = x;
        arr[id + 1] = -z * sa;
        arr[id + 2] = z * ca;
      }
      off += ring.count;
    }
    return arr;
  });

  useFrame((state) => {
    if (REDUCED) return;
    const geom = geomRef.current;
    if (!geom) return;
    const arr = geom.attributes.position.array;
    const t = state.clock.elapsedTime;
    let off = 0;
    for (const ring of DUST_RINGS) {
      const rot = t * ring.speed + ring.phase;
      const sa = Math.sin(ring.tilt);
      const ca = Math.cos(ring.tilt);
      for (let i = 0; i < ring.count; i += 1) {
        const a = (i / ring.count) * Math.PI * 2 + rot;
        const x = Math.cos(a) * ring.radius;
        const z = Math.sin(a) * ring.radius;
        const id = (off + i) * 3;
        arr[id] = x;
        arr[id + 1] = -z * sa;
        arr[id + 2] = z * ca;
      }
      off += ring.count;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={IS_MOBILE ? 0.038 : 0.05}
        color="#8cc3ff"
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function orbitPosition(o, t) {
  const a = t * o.speed + o.phase;
  return [
    Math.cos(a) * o.rx,
    Math.sin(a * 0.85) * o.ry,
    Math.sin(a * 0.6 + 1.2) * o.rz,
  ];
}

function Constellation() {
  const groupRef = useRef();
  const nodeRefs = useRef([]);
  const hubNodes = useMemo(() => buildHubNodes(), []);
  const hubLinks = useMemo(() => buildHubLinks(hubNodes), [hubNodes]);
  const linkPositions = useMemo(() => {
    const arr = new Float32Array(ORBITERS.length * 6);
    ORBITERS.forEach((o, i) => {
      const p = orbitPosition(o, 0);
      arr[i * 6] = p[0];
      arr[i * 6 + 1] = p[1];
      arr[i * 6 + 2] = p[2];
      arr[i * 6 + 3] = 0;
      arr[i * 6 + 4] = 0.1;
      arr[i * 6 + 5] = 0.5;
    });
    return arr;
  }, []);
  const linksGeom = useRef();

  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (REDUCED) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    if (REDUCED) {
      g.rotation.y = -0.18;
      g.rotation.x = 0.12;
      return;
    }

    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.34 + Math.sin(t * 0.1) * 0.08, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.current.y * 0.22, 0.05);

    const arr = linkPositions;
    ORBITERS.forEach((o, i) => {
      const p = orbitPosition(o, t);
      const mesh = nodeRefs.current[i];
      if (mesh) {
        mesh.position.set(p[0], p[1] + Math.sin(t * 1.6 + o.phase) * 0.08, p[2]);
        mesh.rotation.y += o.speed * 0.05;
        mesh.rotation.x += o.speed * 0.02;
      }
      arr[i * 6] = p[0];
      arr[i * 6 + 1] = p[1];
      arr[i * 6 + 2] = p[2];
      arr[i * 6 + 3] = 0;
      arr[i * 6 + 4] = 0.1;
      arr[i * 6 + 5] = 0.5;
    });
    linksGeom.current.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0.5, 1.4]} intensity={18} color="#3b82f6" />

      <mesh>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color="#eaf4ff"
          emissive="#8fc1ff"
          emissiveIntensity={2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {hubNodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07 + (i % 3) * 0.02, 16, 16]} />
          <meshStandardMaterial
            color="#7fb0ff"
            emissive="#3b82f6"
            emissiveIntensity={1.6}
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubLinks, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4d8dff"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <lineSegments>
        <bufferGeometry ref={linksGeom}>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <OrbitDust />

      {ORBITERS.map((o, i) => {
        const p = orbitPosition(o, 0);
        return (
          <mesh
            key={i}
            ref={(m) => {
              nodeRefs.current[i] = m;
            }}
            position={p}
          >
            {o.kind === "octa" ? (
              <octahedronGeometry args={[o.size * 1.35, 0]} />
            ) : (
              <sphereGeometry args={[o.size, 16, 16]} />
            )}
            <meshStandardMaterial
              color={o.color}
              emissive={o.color}
              emissiveIntensity={1.7}
              metalness={0.5}
              roughness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContent() {
  const outer = useRef();

  return (
    <group ref={outer}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[-5, 3, -4]} intensity={1.6} color="#22d3ee" />
      <Constellation />
      <Starfield />
      <Sparkles count={IS_MOBILE ? 40 : 90} scale={[15, 8.5, 9]} size={2.2} speed={0.28} color="#7cc0ff" />
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