import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS, CERT_COLORS } from "../brand";
import { TrustUserCard } from "../components/TrustUserCard";
import { IntentionChips } from "../components/IntentionChips";

const TRUST_USERS = [
  { name: "passive-records.box", signals: 3, marketCap: "13.855", trustAmount: "1.036", rank: 1 },
  { name: "0x5038...F568", signals: 1, marketCap: "7.07K", trustAmount: "0.489", rank: 2 },
  { name: "alice.eth", signals: 7, marketCap: "24.2K", trustAmount: "2.15", rank: 3 },
];

const FEED_ITEMS = [
  {
    member: "vitalik.eth",
    action: "trusted",
    target: "GitHub React",
    intention: "work",
    time: "1h ago",
    votes: 12,
  },
  {
    member: "sofia.eth",
    action: "learned",
    target: "Ethereum ZK Proofs",
    intention: "learning",
    time: "2d ago",
    votes: 8,
  },
  {
    member: "alice.eth",
    action: "explored",
    target: "Uniswap v4 Hooks",
    intention: "inspiration",
    time: "3d ago",
    votes: 5,
  },
  {
    member: "bob.eth",
    action: "certified for work",
    target: "OpenZeppelin v5",
    intention: "work",
    time: "4d ago",
    votes: 15,
  },
];

export const CommunityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Trust Circle (0→90)
  // Phase 2: Resonance Feed (90→180)
  const phase2Start = 90;
  const inPhase2 = frame >= phase2Start;

  // Phase 1 fade
  const phase1Op = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 entrance
  const phase2Op = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Filter tabs for trust circle
  const filterOp = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const filterY = interpolate(frame, [5, 20], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Search bar
  const searchOp = interpolate(frame, [15, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: GRADIENTS.iridescence,
          filter: "blur(180px)",
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
          Connect with{" "}
          <span
            style={{
              background: GRADIENTS.iridescence,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            trusted users
          </span>
        </span>
      </div>

      {/* Phase 1: Trust Circle */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 680,
          opacity: phase1Op,
        }}
      >
        {/* Filter tabs: Trust Circle | Following | Followers | Explore */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            opacity: filterOp,
            transform: `translateY(${filterY}px)`,
          }}
        >
          {["Trust Circle", "Following", "Followers", "Explore"].map((t, i) => (
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

        {/* Search bar */}
        <div
          style={{
            opacity: searchOp,
            padding: "10px 16px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${COLORS.borderGlass}`,
            marginBottom: 16,
          }}
        >
          <span style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.textPlaceholder }}>
            Search all accounts on Intuition...
          </span>
        </div>

        {/* Trust user cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TRUST_USERS.map((user, i) => (
            <TrustUserCard key={i} user={user} delay={25 + i * 15} />
          ))}
        </div>
      </div>

      {/* Phase 2: Resonance Feed */}
      {inPhase2 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 680,
            opacity: phase2Op,
          }}
        >
          {/* Category filter chips */}
          <div style={{ marginBottom: 16 }}>
            <IntentionChips delay={phase2Start} activeIndex={-1} />
          </div>

          {/* Feed cards grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEED_ITEMS.map((item, i) => {
              const cardEntrance = spring({
                frame: frame - (phase2Start + 10 + i * 12),
                fps,
                config: { damping: 14, stiffness: 100, mass: 1 },
              });
              const cardY = interpolate(cardEntrance, [0, 1], [30, 0]);
              const cardOp = interpolate(cardEntrance, [0, 0.3], [0, 1], {
                extrapolateRight: "clamp",
              });
              const intentionColor = CERT_COLORS[item.intention] || COLORS.textMuted;

              return (
                <div
                  key={i}
                  style={{
                    opacity: cardOp,
                    transform: `translateY(${cardY}px)`,
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: "rgba(0, 0, 0, 0.14)",
                    border: `1px solid ${COLORS.borderGlass}`,
                    gap: 14,
                  }}
                >
                  {/* Favicon placeholder */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.15)" }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textPrimary }}>
                      <span style={{ fontWeight: 600, color: COLORS.info }}>{item.member}</span>
                      {" "}
                      <span style={{ color: COLORS.textMuted }}>{item.action}</span>
                      {" "}
                      <span style={{ fontWeight: 600 }}>{item.target}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 16,
                        color: COLORS.textMuted,
                        marginTop: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: `${intentionColor}22`,
                          color: intentionColor,
                          fontSize: 14,
                        }}
                      >
                        {item.intention}
                      </span>
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Vote arrows */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: 14, color: COLORS.textMuted }}>▲</span>
                    <span style={{ fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.textPrimary }}>
                      {item.votes}
                    </span>
                    <span style={{ fontSize: 14, color: COLORS.textMuted }}>▼</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
