import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONTS } from "../brand";

const TABS = [
  { label: "GitHub - solidity/sol...", color: "#24292f" },
  { label: "Ethereum Docs - EIP...", color: "#627EEA" },
  { label: "YouTube - How to Au...", color: "#FF0000" },
  { label: "Twitter / @vitalik...", color: "#1DA1F2" },
  { label: "Uniswap - Swap To...", color: "#FF007A" },
  { label: "Aave - Lending Pro...", color: "#B6509E" },
  { label: "OpenZeppelin Docs...", color: "#4E5EE4" },
  { label: "Etherscan - Contract...", color: "#21325B" },
  { label: "DefiLlama - TVL An...", color: "#6366F1" },
  { label: "Notion - Research N...", color: "#000000" },
  { label: "Discord - Ethereum...", color: "#5865F2" },
  { label: "Stack Overflow - So...", color: "#F48024" },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const browserOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeInt = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 0.8) * 3 * shakeInt;
  const shakeY = Math.cos(frame * 1.2) * 2 * shakeInt;
  const blurAmt = interpolate(frame, [100, 140], [0, 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text1Op = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text2Op = interpolate(frame, [155, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [120, 145], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Browser window */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          right: 120,
          bottom: 300,
          opacity: browserOpacity,
          transform: `translate(${shakeX}px, ${shakeY}px)`,
          filter: `blur(${blurAmt}px)`,
        }}
      >
        {/* Title bar with dots */}
        <div
          style={{
            height: 40,
            background: "rgba(255,255,255,0.04)",
            borderRadius: "12px 12px 0 0",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "none",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        </div>
        {/* Tab bar */}
        <div
          style={{
            height: 36,
            background: "rgba(255,255,255,0.02)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {TABS.map((tab, i) => {
            const enterF = i * 8;
            const prog = interpolate(frame, [enterF, enterF + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <div
                key={i}
                style={{
                  opacity: prog,
                  transform: `translateY(${(1 - prog) * -20}px)`,
                  height: 36,
                  minWidth: 0,
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "0 8px",
                  overflow: "hidden",
                  marginRight: 2,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: tab.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* Content area */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            height: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ opacity: 0.12, display: "flex", flexDirection: "column", gap: 12, width: "80%" }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                style={{
                  height: i === 0 ? 24 : 12,
                  width: `${60 + ((i * 17) % 40)}%`,
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: 4,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          transform: `translateY(${textY}px)`,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 46, color: COLORS.textPrimary, opacity: text1Op }}>
          Dozens of tabs. Hours of research.
        </span>
        <span style={{ fontFamily: FONTS.body, fontSize: 26, color: COLORS.textMuted, opacity: text2Op }}>
          But where does all that knowledge go?
        </span>
      </div>
    </AbsoluteFill>
  );
};
