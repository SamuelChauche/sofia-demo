import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../brand";

const NAV_ITEMS = [
  { label: "Home", icon: "⌂" },
  { label: "Sofia", icon: "◆" },
  { label: "Resonance", icon: "◎" },
  { label: "Profile", icon: "●" },
  { label: "Settings", icon: "⚙" },
];

export const BottomNav: React.FC<{
  activeIndex?: number;
  delay?: number;
}> = ({ activeIndex = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [delay, delay + 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div style={{ display: "flex", gap: 48 }}>
        {NAV_ITEMS.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 14,
                  color: isActive ? COLORS.primary : COLORS.textMuted,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
