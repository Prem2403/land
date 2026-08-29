import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ExtrudeGeometry } from 'three';
import { INDIA_PATH } from '@/data/indiaPath';
import { PROJECTS, RISK_COLORS, type ProjectMarker } from '@/data/projects';

/* ---------- Geometry helpers ---------- */

function buildShape(pathData: string): THREE.Shape {
  const shape = new THREE.Shape();
  const commands = pathData.match(/[MLZmlz][^MLZmlz]*/g) || [];
  commands.forEach((cmd) => {
    const type = cmd[0];
    const nums = cmd.slice(1).trim().split(/\s+/).map(Number);
    if (type === 'M' || type === 'L') {
      const [x, y] = nums;
      if (type === 'M') shape.moveTo(x, y);
      else shape.lineTo(x, y);
    } else if (type === 'Z') {
      shape.closePath();
    }
  });
  return shape;
}

// Deterministic pseudo-random based on coordinates for stable height variation
function terrainHeight(x: number, y: number): number {
  return (
    Math.sin(x * 0.12) * 2.2 +
    Math.cos(y * 0.15) * 1.8 +
    Math.sin((x + y) * 0.08) * 1.4 +
    2
  );
}

/* ---------- Terrain extruded map with per-vertex height ---------- */

function createSatelliteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);

  const gradient = context.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#5c765b');
  gradient.addColorStop(0.45, '#a68c57');
  gradient.addColorStop(1, '#315f50');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 140; i++) {
    const x = (Math.sin(i * 13.7) * 0.5 + 0.5) * 512;
    const y = (Math.cos(i * 8.3) * 0.5 + 0.5) * 512;
    const radius = 4 + (i % 7) * 3;
    context.fillStyle = i % 3 === 0 ? 'rgba(32,86,67,0.34)' : 'rgba(196,177,112,0.28)';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = 'rgba(219,226,172,0.28)';
  context.lineWidth = 3;
  for (let i = 0; i < 9; i++) {
    context.beginPath();
    context.moveTo(i * 64, 0);
    context.quadraticCurveTo(160 + i * 12, 210, 512 - i * 30, 512);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function IndiaTerrain({ satellite }: { satellite: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const satelliteTexture = useMemo(() => createSatelliteTexture(), []);

  const { topGeo, sideGeo, shape } = useMemo(() => {
    const s = buildShape(INDIA_PATH);
    const baseDepth = 10;

    // Build extruded geometry, then displace top vertices for terrain feel
    const extrudeSettings = {
      depth: baseDepth,
      bevelEnabled: true,
      bevelThickness: 1.2,
      bevelSize: 1.0,
      bevelSegments: 2,
      curveSegments: 24,
    };
    const geo = new ExtrudeGeometry(s, extrudeSettings);

    // Displace z (depth) of top-facing vertices to create height variation
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      // Only push the top surface (positive z after extrude) upward
      if (z > baseDepth * 0.5) {
        const h = terrainHeight(x, y);
        posAttr.setZ(i, z + h);
      }
    }
    geo.computeVertexNormals();

    // Flat top shape for wireframe overlay
    const flatGeo = new THREE.ShapeGeometry(s);

    return { topGeo: geo, sideGeo: flatGeo, shape: s };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.16) * 0.2 - 0.12;
      groupRef.current.rotation.x = -0.38 + Math.sin(t * 0.1) * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={0.042} position={[0, 0.4, 0]}>
      {/* Main terrain body */}
      <mesh geometry={topGeo} position={[0, 0, -5]}>
        <meshStandardMaterial
          color="#0B5D3B"
          metalness={0.35}
          roughness={0.5}
          flatShading
          transparent
          opacity={0.97}
        />
      </mesh>

      {satellite && (
        <mesh geometry={sideGeo} position={[0, 0, 7.8]} scale={0.99}>
          <meshBasicMaterial map={satelliteTexture} transparent opacity={0.92} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Wireframe overlay on top surface */}
      <mesh geometry={topGeo} position={[0, 0, -5]}>
        <meshBasicMaterial color="#2E9B68" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Emerald outline */}
      <mesh geometry={sideGeo} position={[0, 0, 7]}>
        <meshBasicMaterial color="#2E9B68" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Glow plane behind */}
      <mesh geometry={sideGeo} position={[0, 0, -12]}>
        <meshBasicMaterial color="#087F5B" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ---------- Vertical light beam markers ---------- */

function Marker({ project, index, onSelect, selected }: { project: ProjectMarker; index: number; onSelect: (i: number) => void; selected: boolean }) {
  const beamRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const color = RISK_COLORS[project.status];
  const scale = 0.042;
  const x = (project.x - 50) * 100 * scale;
  const y = -(project.y - 50) * 100 * scale;
  const beamHeight = 0.8 + (project.riskScore / 100) * 2.2;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beamRef.current) {
      const pulse = 0.7 + Math.sin(t * 2.5 + project.x) * 0.3;
      beamRef.current.scale.y = pulse;
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity = selected ? 0.9 : 0.35 + pulse * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      const rs = 1 + Math.sin(t * 2 + index) * 0.15;
      ringRef.current.scale.setScalar(rs * (selected ? 1.6 : 1));
    }
  });

  return (
    <group position={[x, y, 0.7]} onClick={(e) => { e.stopPropagation(); onSelect(index); }}>
      {/* Vertical light beam */}
      <mesh ref={beamRef} position={[0, 0, beamHeight / 2]}>
        <cylinderGeometry args={[0.04, 0.04, beamHeight, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Glowing sphere on top */}
      <mesh position={[0, 0, beamHeight]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>

      {/* Rotating ring at base */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.2, 24]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.8 : 0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Point light */}
      <pointLight position={[0, 0, beamHeight]} color={color} intensity={selected ? 1.2 : 0.5} distance={2.5} />

      {/* HTML label when selected */}
      {selected && (
        <Html position={[0, 0, beamHeight + 0.4]} center distanceFactor={6} occlude={false}>
          <div style={{
            background: 'rgba(255,255,255,0.96)',
            border: '1px solid #D8E5DE',
            borderRadius: 10,
            padding: '8px 12px',
            boxShadow: '0 4px 16px rgba(6,59,39,0.15)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#60756B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.id}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#10231A', marginTop: 2 }}>{project.name}</div>
            <div style={{ fontSize: 11, color: color, fontWeight: 600, marginTop: 2 }}>Risk {project.riskScore} · {project.status}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ---------- Animated arc connections ---------- */

function DataArcs() {
  const arcs = useMemo(() => {
    const result: { points: [number, number, number][]; color: string; delay: number }[] = [];
    const pairs: [number, number][] = [
      [0, 7], [1, 4], [2, 9], [3, 10], [5, 11], [6, 12], [8, 13], [14, 15], [16, 17],
    ];
    const scale = 0.042;
    pairs.forEach(([a, b], idx) => {
      const pa = PROJECTS[a];
      const pb = PROJECTS[b];
      if (!pa || !pb) return;
      const xa = (pa.x - 50) * 100 * scale;
      const ya = -(pa.y - 50) * 100 * scale;
      const xb = (pb.x - 50) * 100 * scale;
      const yb = -(pb.y - 50) * 100 * scale;
      const midX = (xa + xb) / 2;
      const midY = (ya + yb) / 2;
      const dist = Math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2);
      const arcHeight = 1.5 + dist * 0.4;
      // Quadratic bezier with 12 segments
      const segments = 16;
      const pts: [number, number, number][] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = (1 - t) ** 2 * xa + 2 * (1 - t) * t * midX + t ** 2 * xb;
        const y = (1 - t) ** 2 * ya + 2 * (1 - t) * t * midY + t ** 2 * yb;
        const z = 0.7 + 4 * t * (1 - t) * arcHeight;
        pts.push([x, y, z]);
      }
      result.push({ points: pts, color: '#2E9B68', delay: idx * 0.3 });
    });
    return result;
  }, []);

  return (
    <>
      {arcs.map((arc, i) => (
        <ArcLine key={i} points={arc.points} color={arc.color} delay={arc.delay} />
      ))}
    </>
  );
}

function ArcLine({ points, color, delay }: { points: [number, number, number][]; color: string; delay: number }) {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime + delay) % 4;
      const progress = t / 4;
      ref.current.material.opacity = 0.2 + Math.sin(progress * Math.PI) * 0.5;
    }
  });
  return (
    <Line ref={ref} points={points} color={color} lineWidth={1.2} transparent opacity={0.5} dashed dashScale={0.3} />
  );
}

/* ---------- Floating particles ---------- */

function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.random() * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      const pos = ref.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const z = pos.getZ(i);
        pos.setZ(i, z + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#2E9B68" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ---------- Scanning plane ---------- */

function ScanPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.4;
      ref.current.position.z = ((Math.sin(t) + 1) / 2) * 4 + 0.5;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + Math.abs(Math.sin(t)) * 0.06;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial color="#2E9B68" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ---------- Grid floor ---------- */

function GridFloor() {
  return (
    <gridHelper args={[16, 32, '#2E9B68', '#BFE3D0']} position={[0, -3.2, 0]}>
      <meshBasicMaterial transparent opacity={0.2} />
    </gridHelper>
  );
}

/* ---------- Main exported component ---------- */

interface IndiaMap3DProps {
  markers?: boolean;
  className?: string;
  interactive?: boolean;
  onSelectProject?: (index: number) => void;
  selectedProject?: number | null;
  satellite?: boolean;
}

function Scene({ markers, interactive, onSelectProject, selectedProject, satellite }: Required<Omit<IndiaMap3DProps, 'className'>>) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 7, 6]} intensity={0.85} color="#E8F5EE" />
      <pointLight position={[-5, 3, 4]} intensity={0.5} color="#2E9B68" />
      <pointLight position={[0, -2, 5]} intensity={0.3} color="#087F5B" />

      <Stars radius={20} depth={30} count={800} factor={2} fade speed={0.5} />

      <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.3}>
        <IndiaTerrain satellite={satellite} />
        {markers && (
          <>
            {PROJECTS.map((p, i) => (
              <Marker
                key={p.id}
                project={p}
                index={i}
                onSelect={onSelectProject}
                selected={selectedProject === i}
              />
            ))}
            <DataArcs />
          </>
        )}
      </Float>

      <Particles count={70} />
      <ScanPlane />
      <GridFloor />

      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={12}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={!selectedProject && selectedProject !== 0}
          autoRotateSpeed={0.4}
        />
      )}
    </>
  );
}

export function IndiaMap3D({ markers = true, className, interactive = false, onSelectProject, selectedProject = null, satellite = false }: IndiaMap3DProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.8, 7.5], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene
            markers={markers}
            interactive={interactive}
            onSelectProject={onSelectProject ?? (() => {})}
            selectedProject={selectedProject}
            satellite={satellite}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
