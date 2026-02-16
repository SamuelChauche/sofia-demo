import { interpolate, useCurrentFrame } from "remotion";

const Particle: React.FC<{
  index: number;
  frame: number;
  speedMul: number;
}> = ({ index, frame, speedMul }) => {
  const seed = index * 137.5;
  const baseX = (seed * 7.3) % 1920;
  const baseY = (seed * 3.1) % 1080;
  const speed = (0.3 + (index % 5) * 0.15) * speedMul;
  const phase = (seed * 2.7) % (Math.PI * 2);
  const x = baseX + Math.sin(frame * speed * 0.02 + phase) * 40;
  const y = baseY + Math.cos(frame * speed * 0.015 + phase * 0.7) * 30;
  const size = 2 + (index % 4) * 1.2;
  const opacity = interpolate(
    Math.sin(frame * 0.04 + phase),
    [-1, 0, 1],
    [0.02, 0.1, 0.02],
  );
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "rotate(45deg)",
        backgroundColor: "rgba(255,255,255,0.12)",
        opacity: opacity * fadeIn,
      }}
    />
  );
};

export const ParticleBackground: React.FC<{
  count?: number;
  speedMultiplier?: number;
}> = ({ count = 35, speedMultiplier = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Particle key={i} index={i} frame={frame} speedMul={speedMultiplier} />
      ))}
    </>
  );
};
