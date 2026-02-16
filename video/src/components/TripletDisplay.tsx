import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, TRIPLET_COLORS } from "../brand";

export const TripletDisplay: React.FC<{
  subject: string;
  predicate: string;
  object: string;
  delay?: number;
  fontSize?: number;
}> = ({ subject, predicate, object, delay = 0, fontSize = 22 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parts = [
    { text: subject, color: TRIPLET_COLORS.subject },
    { text: predicate, color: TRIPLET_COLORS.predicate },
    { text: object, color: TRIPLET_COLORS.object },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {parts.map((part, i) => {
        const d = delay + i * 8;
        const entrance = spring({
          frame: frame - d,
          fps,
          config: { damping: 14, stiffness: 120, mass: 0.8 },
        });
        const opacity = interpolate(entrance, [0, 0.4], [0, 1], {
          extrapolateRight: "clamp",
        });
        const y = interpolate(entrance, [0, 1], [16, 0]);

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                padding: "8px 18px",
                borderRadius: 10,
                background: `${part.color}18`,
                border: `1px solid ${part.color}33`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize,
                  fontWeight: 600,
                  color: part.color,
                }}
              >
                {part.text}
              </span>
            </div>
            {i < 2 && (
              <span
                style={{
                  opacity,
                  fontFamily: FONTS.body,
                  fontSize: fontSize + 4,
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
