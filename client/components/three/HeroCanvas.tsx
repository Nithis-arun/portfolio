import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Floating geometric shapes ── */
function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: "torus" | "octahedron" | "icosahedron" | "box";
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.2 * speed;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return new THREE.TorusGeometry(0.6, 0.2, 12, 32);
      case "octahedron":
        return new THREE.OctahedronGeometry(0.5, 0);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(0.5, 0);
      case "box":
        return new THREE.BoxGeometry(0.6, 0.6, 0.6);
    }
  }, [geometry]);

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} geometry={geo}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          roughness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ── Particle field ── */
function ParticleField({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      siz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, siz];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Mouse-reactive camera ── */
function MouseCamera() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  // Attach mouse listener
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}

/* ── Main Hero Canvas ── */
export default function HeroCanvas() {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 100 : 300;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#06B6D4" />

        {/* Stars background */}
        <Stars
          radius={50}
          depth={50}
          count={isMobile ? 500 : 1500}
          factor={3}
          saturation={0.3}
          fade
          speed={0.5}
        />

        {/* Floating shapes */}
        {!isMobile && (
          <>
            <FloatingShape position={[-3, 2, -2]} geometry="torus" color="#8B5CF6" speed={0.8} />
            <FloatingShape position={[3.5, -1, -3]} geometry="octahedron" color="#06B6D4" speed={1.2} />
            <FloatingShape position={[-2, -2.5, -1]} geometry="icosahedron" color="#F43F5E" speed={0.6} />
            <FloatingShape position={[2, 2.5, -4]} geometry="box" color="#6366F1" speed={1} />
          </>
        )}

        {/* Particles */}
        <ParticleField count={particleCount} />

        {/* Mouse camera */}
        <MouseCamera />
      </Canvas>
    </div>
  );
}
