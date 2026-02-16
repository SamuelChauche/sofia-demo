import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, CERT_COLORS } from "../brand";

// Faithful reproduction of extension/components/ui/GroupBentoCard.tsx
// Scaled for 1920x1080 video

interface BentoCardData {
  domain: string;
  urls: number;
  onChain: number;
  time: string;
  level: number;
  certs: { type: string; count: number }[];
  progressPercent: number;
  certsToNext: number;
}

export const GroupBentoCard: React.FC<{
  data: BentoCardData;
  delay?: number;
}> = ({ data, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const dominantColor =
    data.certs.length > 0
      ? CERT_COLORS[data.certs[0].type] || COLORS.primary
      : COLORS.primary;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: 380,
        padding: 24,
        borderRadius: 16,
        background: "rgba(0, 0, 0, 0.14)",
        backdropFilter: "blur(50px)",
        border: `1px solid ${dominantColor}40`,
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header: favicon + domain + LVL badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Favicon placeholder */}
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontFamily: FONTS.body,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {data.domain.charAt(0).toUpperCase()}
          </div>
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 22,
              color: COLORS.textPrimary,
              fontWeight: 600,
            }}
          >
            {data.domain}
          </span>
        </div>
        {/* LVL badge */}
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            background: dominantColor,
            padding: "5px 12px",
            borderRadius: 8,
          }}
        >
          LVL {data.level}
        </span>
      </div>

      {/* Stats row: URLS / ON-CHAIN / TIME */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[
          { value: data.urls, label: "URLs" },
          { value: data.onChain, label: "On-chain" },
          { value: data.time, label: "Time" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.textPrimary,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: COLORS.textMuted,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${data.progressPercent}%`,
              height: "100%",
              borderRadius: 3,
              background: dominantColor,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            color: COLORS.textMuted,
            marginTop: 6,
            textAlign: "right",
          }}
        >
          {data.certsToNext} certs to LVL {data.level + 1}
        </div>
      </div>

      {/* Certification dots */}
      {data.certs.length > 0 && (
        <div style={{ display: "flex", gap: 8 }}>
          {data.certs.map((c, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: CERT_COLORS[c.type] || COLORS.primary,
              }}
              title={`${c.type}: ${c.count}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
