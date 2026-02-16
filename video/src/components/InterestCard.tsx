import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, CERT_COLORS } from "../brand";

// Faithful reproduction of extension InterestCard — scaled for 1920x1080

interface InterestData {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  certs: number;
  domains: string[];
  certBreakdown: { type: string; count: number }[];
  reasoning: string;
}

const LEVEL_COLORS = ["#F59E0B", "#F97316", "#EF4444", "#EC4899", "#8B5CF6", "#6366F1", "#3B82F6", "#06B6D4", "#10B981", "#22C55E"];

export const InterestCard: React.FC<{
  data: InterestData;
  delay?: number;
}> = ({ data, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
  });
  const slideX = interpolate(entrance, [0, 1], [200, 0]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const levelColor = LEVEL_COLORS[Math.min(data.level - 1, LEVEL_COLORS.length - 1)] || LEVEL_COLORS[0];
  const progressPct = data.xpToNext > 0
    ? Math.min(100, (data.xp / (data.xp + data.xpToNext)) * 100)
    : 100;

  const localFrame = Math.max(0, frame - delay);
  const barFill = interpolate(localFrame, [15, 45], [0, progressPct], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const statsOpacity = interpolate(localFrame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotsOpacity = interpolate(localFrame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reasoningOpacity = interpolate(localFrame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dominantCert = data.certBreakdown.length > 0
    ? CERT_COLORS[data.certBreakdown[0].type] || levelColor
    : levelColor;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        width: 640,
        padding: 28,
        borderRadius: 16,
        background: "rgba(0, 0, 0, 0.14)",
        backdropFilter: "blur(50px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* Title + LVL badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.textPrimary,
          }}
        >
          {data.name}
        </span>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            background: levelColor,
            padding: "6px 14px",
            borderRadius: 10,
          }}
        >
          LVL {data.level}
        </span>
      </div>

      {/* XP progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>
            {data.xp} XP
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>
            {data.xpToNext > 0 ? `${data.xpToNext} to LVL ${data.level + 1}` : "Max!"}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 8,
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${barFill}%`,
              height: "100%",
              borderRadius: 4,
              background: `linear-gradient(90deg, ${dominantCert}, ${levelColor})`,
            }}
          />
        </div>
      </div>

      {/* Certs / Domains stats */}
      <div style={{ display: "flex", gap: 32, opacity: statsOpacity }}>
        <div>
          <span style={{ fontFamily: FONTS.body, fontSize: 28, fontWeight: 700, color: COLORS.textPrimary }}>
            {data.certs}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, marginLeft: 8 }}>
            Certs
          </span>
        </div>
        <div>
          <span style={{ fontFamily: FONTS.body, fontSize: 28, fontWeight: 700, color: COLORS.textPrimary }}>
            {data.domains.length}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, marginLeft: 8 }}>
            Domains
          </span>
        </div>
      </div>

      {/* Certification breakdown dots */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: dotsOpacity }}>
        {data.certBreakdown.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: CERT_COLORS[c.type] || COLORS.primary,
              }}
            />
            <span style={{ fontFamily: FONTS.body, fontSize: 16, color: CERT_COLORS[c.type] || COLORS.textMuted }}>
              {c.type.charAt(0).toUpperCase() + c.type.slice(1)} {c.count}
            </span>
          </div>
        ))}
      </div>

      {/* Domain favicons */}
      <div style={{ display: "flex", gap: 10, opacity: dotsOpacity }}>
        {data.domains.slice(0, 3).map((d, i) => (
          <div
            key={i}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.textMuted,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.15)" }} />
            {d}
          </div>
        ))}
      </div>

      {/* AI reasoning */}
      <div style={{ opacity: reasoningOpacity }}>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.textMuted,
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          {data.reasoning}
        </span>
      </div>
    </div>
  );
};
