import { interpolate, useCurrentFrame } from "remotion";
import { FONTS, CERT_COLORS } from "../brand";

const CHIPS = [
  { label: "All", color: "rgba(255,255,255,0.4)" },
  { label: "Work", color: CERT_COLORS.work },
  { label: "Learning", color: CERT_COLORS.learning },
  { label: "Fun", color: CERT_COLORS.fun },
  { label: "Inspiration", color: CERT_COLORS.inspiration },
  { label: "Buying", color: CERT_COLORS.buying },
];

export const IntentionChips: React.FC<{
  delay?: number;
  activeIndex?: number;
}> = ({ delay = 0, activeIndex = 0 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {CHIPS.map((chip, i) => {
        const chipDelay = delay + i * 4;
        const opacity = interpolate(
          frame,
          [chipDelay, chipDelay + 10],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const isActive = i === activeIndex;

        return (
          <div
            key={i}
            style={{
              opacity,
              padding: "8px 20px",
              borderRadius: 24,
              background: isActive ? `${chip.color}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${isActive ? chip.color : "rgba(255,255,255,0.08)"}`,
              fontFamily: FONTS.body,
              fontSize: 18,
              fontWeight: 500,
              color: isActive ? chip.color : "rgba(255,255,255,0.5)",
            }}
          >
            {chip.label}
          </div>
        );
      })}
    </div>
  );
};
