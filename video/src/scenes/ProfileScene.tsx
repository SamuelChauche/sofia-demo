import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";

const SOCIAL_ICONS = [
  { icon: "𝕏", color: "#1DA1F2" },
  { icon: "🦋", color: "#0085FF" },
  { icon: "◆", color: "#5865F2" },
  { icon: "⬡", color: "#FF4500" },
  { icon: "◉", color: "#8B5CF6" },
];

const QUESTS = [
  { name: "Follow Quest", desc: "Follow 3 members", icon: "👥", complete: true },
  { name: "Pulse Quest", desc: "Run 5 pulse analyses", icon: "💜", complete: true },
  { name: "Signal Quest", desc: "Send 10 signals", icon: "📡", complete: true },
  { name: "Trust Quest", desc: "Trust 3 members", icon: "🤝", complete: false },
];

export const ProfileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tab bar
  const tabOp = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Profile header entrance
  const headerEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 },
  });
  const headerX = interpolate(headerEntrance, [0, 1], [200, 0]);
  const headerOp = interpolate(headerEntrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Avatar bounce
  const avatarScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.8 },
  });

  // Social icons stagger
  const socialBase = 30;

  // Stats section
  const statsOp = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sub-tabs
  const subTabsOp = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subTabsX = interpolate(frame, [70, 90], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Quests entrance (switch to "Success" tab at frame 110)
  const questsActive = frame >= 110;
  const questsOp = interpolate(frame, [110, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleOp = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "35%",
          width: "30%",
          height: "30%",
          background: GRADIENTS.iridescence,
          filter: "blur(160px)",
          opacity: 0.05,
          borderRadius: "50%",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOp,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 40, color: COLORS.textPrimary }}>
          Build your{" "}
          <span
            style={{
              background: GRADIENTS.iridescence,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            on-chain reputation
          </span>
        </span>
      </div>

      {/* Profile card container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translateX(${headerX}px)`,
          opacity: headerOp,
          width: 600,
          borderRadius: 16,
          background: COLORS.bgGlass,
          border: `1px solid ${COLORS.borderGlass}`,
          overflow: "hidden",
        }}
      >
        {/* Tab bar: Account | Community | Activity */}
        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            gap: 8,
            opacity: tabOp,
            borderBottom: `1px solid ${COLORS.borderGlass}`,
          }}
        >
          {["Account", "Community", "Activity"].map((t, i) => (
            <div
              key={i}
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                border: `1px solid ${i === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
                fontFamily: FONTS.body,
                fontSize: 18,
                color: i === 0 ? COLORS.textPrimary : COLORS.textMuted,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Avatar + Name + Wallet */}
        <div style={{ padding: "24px 20px 12px", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(206,162,253,0.3), rgba(215,144,199,0.3))",
              border: "2px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              transform: `scale(${avatarScale})`,
              flexShrink: 0,
            }}
          >
            🧑‍💻
          </div>
          <div>
            <div style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 700, color: COLORS.textPrimary }}>
              Wieedze
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.textMuted, marginTop: 2 }}>
              0xc634...d551
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div style={{ padding: "0 20px 16px", display: "flex", gap: 10 }}>
          {SOCIAL_ICONS.map((s, i) => {
            const iconEntrance = spring({
              frame: frame - (socialBase + i * 6),
              fps,
              config: { damping: 12, stiffness: 150, mass: 0.6 },
            });
            return (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  transform: `scale(${iconEntrance})`,
                  opacity: interpolate(iconEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                {s.icon}
              </div>
            );
          })}
        </div>

        {/* Stats: Level / XP / Signals */}
        <div
          style={{
            padding: "0 20px 16px",
            display: "flex",
            gap: 12,
            opacity: statsOp,
          }}
        >
          {[
            { label: "Level", value: 8, color: COLORS.primary },
            { label: "Total XP", value: 3005, color: COLORS.textPrimary },
            { label: "Signals", value: 203, color: COLORS.info },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: 10,
                border: `1px solid ${COLORS.borderGlass}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONTS.body, fontSize: 22, fontWeight: 700, color: stat.color }}>
                {Math.round(interpolate(frame, [55, 95], [0, stat.value], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }))}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 14,
                  color: COLORS.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* XP Progress bar */}
        <div style={{ padding: "0 20px 16px", opacity: statsOp }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.primary }}>Level 8</span>
            <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>505 XP to Level 9</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
            <div
              style={{
                width: `${interpolate(frame, [60, 90], [0, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}%`,
                height: "100%",
                borderRadius: 3,
                background: GRADIENTS.progress,
              }}
            />
          </div>
        </div>

        {/* Sub-tabs: Stats | Success | Interest | Socials */}
        <div
          style={{
            padding: "0 20px 12px",
            display: "flex",
            gap: 8,
            opacity: subTabsOp,
            transform: `translateX(${subTabsX}px)`,
          }}
        >
          {["Stats", "Success", "Interest", "Socials"].map((t, i) => {
            const isActive = questsActive ? i === 1 : i === 0;
            return (
              <div
                key={i}
                style={{
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  color: isActive ? COLORS.textPrimary : COLORS.textMuted,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>

        {/* Quests / Achievements */}
        {questsActive && (
          <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8, opacity: questsOp }}>
            {QUESTS.map((q, i) => {
              const qEntrance = spring({
                frame: frame - (115 + i * 12),
                fps,
                config: { damping: 12, stiffness: 120, mass: 0.8 },
              });
              const qScale = interpolate(qEntrance, [0, 1], [0.85, 1]);
              const qOp = interpolate(qEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
              const shimmer = interpolate(frame % 90, [0, 90], [0, 100]);

              return (
                <div
                  key={i}
                  style={{
                    opacity: qOp,
                    transform: `scale(${qScale})`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${q.complete ? "rgba(34, 197, 94, 0.2)" : COLORS.borderGlass}`,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{q.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>
                      {q.name}
                    </div>
                    <div style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>{q.desc}</div>
                  </div>
                  {q.complete ? (
                    <div
                      style={{
                        background: GRADIENTS.iridescence,
                        backgroundSize: "200% 200%",
                        backgroundPosition: `${shimmer}% 50%`,
                        borderRadius: 8,
                        padding: "5px 14px",
                      }}
                    >
                      <span style={{ fontFamily: FONTS.body, fontSize: 16, fontWeight: 700, color: "#fff" }}>
                        Claim XP
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>
                        In progress
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
