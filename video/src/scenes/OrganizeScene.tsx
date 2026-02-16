import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";
import { SofiaOrb } from "../components/SofiaOrb";
import { GroupBentoCard } from "../components/GroupBentoCard";
import { IntentionChips } from "../components/IntentionChips";

const MINI_TABS = [
  { label: "GitHub", color: "#24292f" },
  { label: "Ethereum", color: "#627EEA" },
  { label: "YouTube", color: "#FF0000" },
  { label: "Twitter", color: "#1DA1F2" },
  { label: "Uniswap", color: "#FF007A" },
  { label: "Aave", color: "#B6509E" },
];

const CARDS = [
  {
    domain: "github.com", urls: 15, onChain: 8, time: "2h12", level: 4,
    certs: [{ type: "work", count: 12 }, { type: "learning", count: 3 }],
    progressPercent: 67, certsToNext: 10,
  },
  {
    domain: "ethereum.org", urls: 7, onChain: 3, time: "45m", level: 2,
    certs: [{ type: "learning", count: 5 }, { type: "work", count: 2 }],
    progressPercent: 43, certsToNext: 4,
  },
  {
    domain: "youtube.com", urls: 42, onChain: 0, time: "0m", level: 1,
    certs: [],
    progressPercent: 0, certsToNext: 3,
  },
];

export const OrganizeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const tabPhase = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const tabsGone = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOp = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [90, 115], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: GRADIENTS.iridescence,
          filter: "blur(160px)",
          opacity: interpolate(frame, [0, 50], [0, 0.07], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          borderRadius: "50%",
        }}
      />

      {/* Flying mini tabs */}
      {MINI_TABS.map((tab, i) => {
        const angle = (i / MINI_TABS.length) * Math.PI * 2;
        const startX = 960 + Math.cos(angle) * 550;
        const startY = 420 + Math.sin(angle) * 320;
        const x = interpolate(tabPhase, [0, 1], [startX, 960]);
        const y = interpolate(tabPhase, [0, 1], [startY, 420]);
        const tabScale = interpolate(tabPhase, [0.7, 1], [1, 0.2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const tabOpacity = tabsGone * interpolate(frame, [0, 15 + i * 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 48,
              top: y - 14,
              opacity: tabOpacity,
              width: 96,
              height: 28,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0 8px",
              transform: `scale(${tabScale})`,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 3, background: tab.color, flexShrink: 0 }} />
            <span style={{ fontFamily: FONTS.body, fontSize: 14, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>
              {tab.label}
            </span>
          </div>
        );
      })}

      {/* Orb center */}
      <div style={{ position: "absolute", left: "50%", top: 420, transform: "translate(-50%, -50%)" }}>
        <SofiaOrb size={64} delay={5} pulseIntensity={1.5} />
      </div>

      {/* Intention chips */}
      <div style={{ position: "absolute", top: 180, left: "50%", transform: "translateX(-50%)" }}>
        <IntentionChips delay={85} activeIndex={0} />
      </div>

      {/* Bento cards */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {CARDS.map((card, i) => (
          <GroupBentoCard key={i} data={card} delay={88 + i * 14} />
        ))}
      </div>

      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOp,
          transform: `translateY(${textY}px)`,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 38, color: COLORS.textPrimary }}>
          Sofia organizes your browsing into{" "}
          <span
            style={{
              background: GRADIENTS.iridescence,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Domain groups
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
