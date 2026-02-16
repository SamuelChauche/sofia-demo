import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Faithful reproduction of extension/components/ui/orbanimation/PulseAnimation
 *
 * Original: CSS keyframe animations on .ball, .container-lines, .container-rings
 * Here: all converted to frame-based interpolation for Remotion rendering.
 *
 * Structure:
 *   .orb
 *     .ball (64px red circle + SVG gooey filter)
 *       .container-lines (radial gradient + animated clip-path)
 *       .container-rings (perspective container + two rotating gradient-border rings)
 */

// circle2 keyframes: 4.2s = 126 frames @30fps
// Scale values: 0%→1.5, 15%→1.53, 30%→1.48, 45%→1.44, 60%→1.47, 85%→1.53, 100%→1.5
const CIRCLE2_KEYFRAMES = [0, 0.15, 0.3, 0.45, 0.6, 0.85, 1];
const CIRCLE2_SCALES = [1.5, 1.53, 1.48, 1.44, 1.47, 1.53, 1.5];

// Clip-path keyframe states for container-lines (simplified subset)
const CLIP_STATES = [
  // 0% / 12% / resting
  "polygon(50% 25%, 65% 30%, 75% 42%, 75% 58%, 65% 70%, 50% 75%, 35% 70%, 26% 58%, 25% 42%, 35% 30%)",
  // 2%
  "polygon(50% 25%, 50% 0%, 75% 42%, 75% 58%, 65% 70%, 50% 75%, 35% 70%, 26% 58%, 25% 42%, 50% 0%)",
  // 4%
  "polygon(50% 25%, 70% 0%, 75% 42%, 85% 66%, 65% 100%, 50% 75%, 35% 100%, 15% 65%, 25% 42%, 30% 0%)",
  // 6%
  "polygon(50% 25%, 50% 15%, 75% 42%, 75% 58%, 65% 70%, 50% 75%, 35% 70%, 26% 58%, 25% 42%, 50% 15%)",
  // 7%/59%
  "polygon(50% 25%, 100% 12%, 75% 42%, 85% 66%, 65% 70%, 50% 75%, 35% 70%, 15% 65%, 25% 42%, 0% 12%)",
  // 9%/57%
  "polygon(50% 25%, 50% 0%, 75% 42%, 75% 58%, 65% 70%, 50% 75%, 35% 70%, 26% 58%, 25% 42%, 50% 0%)",
  // 12%/55%/61% — back to resting
  "polygon(50% 25%, 65% 30%, 75% 42%, 75% 58%, 65% 70%, 50% 75%, 35% 70%, 26% 58%, 25% 42%, 35% 30%)",
];

// Cycle through clip states over 20s = 600 frames
function getClipPath(frame: number): string {
  const cycle = 600;
  const f = frame % cycle;
  const idx = Math.floor((f / cycle) * CLIP_STATES.length) % CLIP_STATES.length;
  return CLIP_STATES[idx];
}

export const SofiaOrb: React.FC<{
  size?: number;
  delay?: number;
  pulseIntensity?: number;
}> = ({ size = 64, delay = 0, pulseIntensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 1.5 },
  });
  const entranceScale = interpolate(entrance, [0, 1], [0, 1]);
  const entranceOpacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // circle2 pulse: 4.2s = 126 frames
  const pulsePhase = ((frame % 126) / 126);
  const pulseScale = interpolate(
    pulsePhase,
    CIRCLE2_KEYFRAMES,
    CIRCLE2_SCALES,
  ) * pulseIntensity / 1.5; // normalize around 1.0

  // Ring rotations: 15s = 450 frames per cycle
  const ringPhase = (frame % 450) / 450; // 0→1
  // ring180: starts at 180deg, goes to 540deg (=+360deg)
  const ring1RotY = 180 + ringPhase * 360;
  const ring1RotX = 180 + ringPhase * 360;
  const ring1RotZ = 180 + ringPhase * 360;
  const ring1Scale = 1 + Math.sin(ringPhase * Math.PI) * 0.1; // scale to 1.1 at midpoint

  // ring90: starts at 90deg, goes to 450deg (=+360deg)
  const ring2RotY = 90 + ringPhase * 360;
  const ring2RotX = 90 + ringPhase * 360;
  const ring2RotZ = 90 + ringPhase * 360;
  const ring2Scale = 1 + Math.sin(ringPhase * Math.PI) * 0.1;

  // Clip-path for container-lines
  const clipPath = getClipPath(frame);

  // Unique SVG filter ID (avoid conflicts if multiple orbs)
  const filterId = `gooey-${delay}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transform: `scale(${entranceScale * pulseScale})`,
        opacity: entranceOpacity,
        filter: `drop-shadow(0 0 10px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 15px rgba(145, 71, 255, 0.4))`,
      }}
    >
      {/* SVG gooey filter (inline, hidden) */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
          </filter>
        </defs>
      </svg>

      {/* Ball — red circle with gooey filter */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 50,
          backgroundColor: "#ff0002",
          filter: `url(#${filterId})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Container-lines: radial gradient with animated clip-path */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size * 1.56, // 100/64 ratio from original
            height: size * 1.56,
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.75) 15%, #3b82f6 50%)",
            clipPath,
            pointerEvents: "none",
          }}
        />

        {/* Container-rings: perspective + two rotating gradient-border rings */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            perspective: "11rem",
          }}
        >
          {/* Ring 1 (before) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "6px solid transparent",
              backgroundImage: "linear-gradient(white, blue, magenta, violet, lightyellow)",
              backgroundOrigin: "border-box",
              backgroundClip: "border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude" as never,
              transform: `rotateY(${ring1RotY}deg) rotateX(${ring1RotX}deg) rotateZ(${ring1RotZ}deg) scale(${ring1Scale})`,
            }}
          />
          {/* Ring 2 (after) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "6px solid transparent",
              backgroundImage: "linear-gradient(white, blue, magenta, violet, lightyellow)",
              backgroundOrigin: "border-box",
              backgroundClip: "border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude" as never,
              transform: `rotateY(${ring2RotY}deg) rotateX(${ring2RotX}deg) rotateZ(${ring2RotZ}deg) scale(${ring2Scale})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
