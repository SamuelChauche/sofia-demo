import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";
import { ParticleBackground } from "../components/ParticleBackground";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const line1Opacity = interpolate(frame, [15, 40, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(frame, [15, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const line2Opacity = interpolate(frame, [60, 85, 170, 205], [0, 1, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [60, 85], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sofiaGlow = interpolate(frame, [85, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 210], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <div style={{ width: "100%", height: "100%", transform: `scale(${scale})`, transformOrigin: "center" }}>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: "40%",
            height: "40%",
            background: GRADIENTS.iridescence,
            filter: "blur(180px)",
            opacity: 0.03 + sofiaGlow * 0.05,
            borderRadius: "50%",
          }}
        />
        <ParticleBackground count={35} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
            <span style={{ fontFamily: FONTS.display, fontSize: 68, color: COLORS.textPrimary }}>
              Your browsing tells a story.
            </span>
          </div>
          <div style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}>
            <span style={{ fontFamily: FONTS.display, fontSize: 68, color: COLORS.textPrimary }}>
              <span
                style={{
                  background: GRADIENTS.iridescence,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  filter: `drop-shadow(0 0 ${sofiaGlow * 30}px rgba(215,144,199,0.4))`,
                }}
              >
                Sofia
              </span>{" "}
              reads it.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
