import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, staticFile } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";
import { ParticleBackground } from "../components/ParticleBackground";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 100, mass: 1 },
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.6, 1]);
  const logoOp = interpolate(logoEntrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glowSize = interpolate(frame, [5, 60], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Sofia" text
  const sofiaOp = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline parts: stagger 12f each
  const tagParts = ["Your browsing.", "Your proof.", "Your reputation."];

  // CTA button
  const ctaEntrance = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, stiffness: 100, mass: 1 },
  });
  const ctaShimmer = interpolate(frame % 60, [0, 60], [0, 100]);

  // Particle speed increase
  const particleSpeed = interpolate(frame, [80, 150], [1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Particles (faster toward end) */}
      <ParticleBackground count={40} speedMultiplier={particleSpeed} />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Iridescent ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: GRADIENTS.iridescence,
          filter: "blur(180px)",
          opacity: interpolate(frame, [0, 50], [0, 0.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          borderRadius: "50%",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 ${glowSize}px rgba(215,144,199,0.5))`,
          }}
        >
          <img
            src={staticFile("Logo.png")}
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
            }}
          />
        </div>

        {/* "Sofia" text with iridescent gradient */}
        <div style={{ opacity: sofiaOp }}>
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 72,
              fontWeight: 700,
              background: GRADIENTS.iridescence,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${glowSize * 0.5}px rgba(215,144,199,0.3))`,
            }}
          >
            Sofia
          </span>
        </div>

        {/* Tagline — 3 parts, staggered */}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {tagParts.map((part, i) => {
            const partOp = interpolate(frame, [40 + i * 12, 55 + i * 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const partY = interpolate(frame, [40 + i * 12, 55 + i * 12], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <span
                key={i}
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 24,
                  color: COLORS.textPrimary,
                  opacity: partOp,
                  transform: `translateY(${partY}px)`,
                  display: "inline-block",
                }}
              >
                {part}
              </span>
            );
          })}
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 20,
            transform: `scale(${interpolate(ctaEntrance, [0, 1], [0.8, 1])})`,
            opacity: interpolate(ctaEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: GRADIENTS.iridescence,
              backgroundSize: "200% 200%",
              backgroundPosition: `${ctaShimmer}% 50%`,
              borderRadius: 14,
              padding: "14px 48px",
              boxShadow: "0 8px 32px rgba(215, 144, 199, 0.3)",
            }}
          >
            <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: "#000000" }}>
              Try the demo → sofia-demo.vercel.app
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
