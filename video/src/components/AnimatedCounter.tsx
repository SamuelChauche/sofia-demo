import { interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONTS } from "../brand";

export const AnimatedCounter: React.FC<{
  target: number;
  label: string;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
}> = ({ target, label, start = 0, duration = 40, prefix = "", suffix = "", fontSize = 42 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const value = Math.round(progress * target);
  const opacity = interpolate(frame, [start, start + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center", opacity }}>
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize,
          fontWeight: 700,
          color: COLORS.textPrimary,
          letterSpacing: -1,
        }}
      >
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 16,
          color: COLORS.textMuted,
          marginTop: 6,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};
