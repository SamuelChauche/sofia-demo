import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";

interface TrustUser {
  name: string;
  signals: number;
  marketCap: string;
  trustAmount: string;
  rank: number;
}

export const TrustUserCard: React.FC<{
  user: TrustUser;
  delay?: number;
}> = ({ user, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const y = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const shimmer = interpolate(frame % 90, [0, 90], [0, 100]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        padding: "20px 24px",
        borderRadius: 14,
        background: "rgba(0, 0, 0, 0.14)",
        backdropFilter: "blur(50px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        gap: 20,
      }}
    >
      {/* Rank */}
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: COLORS.textMuted,
          minWidth: 28,
        }}
      >
        {user.rank}
      </span>

      {/* Avatar */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(206,162,253,0.3), rgba(215,144,199,0.3))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        👤
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.textPrimary,
          }}
        >
          {user.name}
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.textMuted,
            marginTop: 4,
          }}
        >
          Signals: <span style={{ color: COLORS.info }}>{user.signals}</span>
          {" · "}Market Cap: <span style={{ color: COLORS.info }}>{user.marketCap}</span>
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.textMuted,
            marginTop: 2,
          }}
        >
          {user.trustAmount} TRUST
        </div>
      </div>

      {/* Trust button */}
      <div
        style={{
          background: GRADIENTS.iridescence,
          backgroundSize: "200% 200%",
          backgroundPosition: `${shimmer}% 50%`,
          borderRadius: 12,
          padding: "10px 28px",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Trust
        </span>
      </div>
    </div>
  );
};
