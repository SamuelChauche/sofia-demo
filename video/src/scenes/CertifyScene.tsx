import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS, CERT_COLORS } from "../brand";

const URLS = [
  "Solidity Documentation",
  "EVM Deep Dive - Ethereum",
  "OpenZeppelin Contracts v5",
  "EIP-4337: Account Abstraction",
  "OpenZeppelin Docs - Upgradeable",
];

const INTENTIONS = [
  { label: "work", color: CERT_COLORS.work },
  { label: "learning", color: CERT_COLORS.learning },
  { label: "fun", color: CERT_COLORS.fun },
  { label: "inspiration", color: CERT_COLORS.inspiration },
  { label: "buying", color: CERT_COLORS.buying },
];

export const CertifyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card zoom-in
  const cardScale = interpolate(frame, [0, 30], [0.65, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Intention bubbles appear at frame 130
  const bubblesOp = interpolate(frame, [130, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // "work" selected at frame 155
  const workSelected = frame >= 155;

  // Certify button
  const btnEntrance = spring({ frame: frame - 170, fps, config: { damping: 14, stiffness: 100, mass: 1 } });
  const shimmer = interpolate(frame % 90, [0, 90], [0, 100]);

  // Confirm check
  const checkOp = interpolate(frame, [200, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkScale = spring({ frame: frame - 205, fps, config: { damping: 10, stiffness: 150, mass: 0.6 } });
  const rippleSize = interpolate(frame, [205, 235], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOp = interpolate(frame, [205, 235], [0.4, 0], {
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
      {/* Title */}
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center", opacity: titleOp }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 42, color: COLORS.textPrimary }}>
          Level up on each {" "}
          <span style={{ background: GRADIENTS.iridescence, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            domain
          </span>
        </span>
      </div>

      {/* Detail view card */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${cardScale})`,
          opacity: cardOp,
          width: 760,
          borderRadius: 20,
          background: COLORS.bgGlass,
          border: `1px solid ${COLORS.borderGlass}`,
          overflow: "hidden",
        }}
      >
        {/* Header: Back + domain + level */}
        <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              padding: "6px 18px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              fontFamily: FONTS.body,
              fontSize: 18,
              color: COLORS.textMuted,
            }}
          >
            Back
          </div>
          <span style={{ fontFamily: FONTS.display, fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, flex: 1 }}>
            github.com
          </span>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              padding: "6px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Level 4
          </span>
        </div>

        {/* Stats row: URLS / ON-CHAIN / TO CERTIFY */}
        <div style={{ display: "flex", padding: "0 28px 20px", gap: 16 }}>
          {[
            { value: "31", label: "URLS", highlight: false },
            { value: "8", label: "ON-CHAIN", highlight: false },
            { value: "23", label: "TO CERTIFY", highlight: true },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                border: `1px solid ${s.highlight ? COLORS.primary + "60" : COLORS.borderGlass}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: FONTS.body, fontSize: 28, fontWeight: 700, color: s.highlight ? COLORS.primary : COLORS.textPrimary }}>
                {s.value}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div style={{ padding: "0 28px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.primary }}>Level 4</span>
            <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>10 certs to Level 5</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
            <div
              style={{
                width: `${interpolate(frame, [40, 70], [0, 67], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}%`,
                height: "100%",
                borderRadius: 3,
                background: GRADIENTS.progress,
              }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ padding: "0 28px 16px", display: "flex", gap: 10 }}>
          {["All (31)", "Uncertified (23)"].map((t, i) => (
            <div
              key={i}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                border: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)",
                fontFamily: FONTS.body,
                fontSize: 16,
                color: i === 0 ? COLORS.textPrimary : COLORS.textMuted,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* URL list */}
        <div style={{ padding: "0 28px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
          {URLS.map((url, i) => {
            const urlOp = interpolate(frame, [50 + i * 10, 50 + i * 10 + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const urlX = interpolate(frame, [50 + i * 10, 50 + i * 10 + 15], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isTarget = i === 0;

            return (
              <div key={i}>
                <div
                  style={{
                    opacity: urlOp,
                    transform: `translateX(${urlX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: isTarget && bubblesOp > 0 ? "rgba(255,255,255,0.04)" : "transparent",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                  <span style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.textPrimary, flex: 1 }}>
                    {url}
                  </span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted }}>Jan 29  &lt;1m</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 20, color: COLORS.textMuted }}>⋮</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 18, color: COLORS.textMuted }}>×</span>
                </div>
                {/* Intention bubbles on first URL */}
                {isTarget && bubblesOp > 0 && (
                  <div style={{ opacity: bubblesOp, padding: "10px 16px 6px 52px", display: "flex", gap: 10 }}>
                    <span style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textPlaceholder, marginRight: 6, alignSelf: "center" }}>
                      I visit this page for
                    </span>
                    {INTENTIONS.map((int, j) => {
                      const isSelected = workSelected && j === 0;
                      return (
                        <div
                          key={j}
                          style={{
                            padding: "6px 16px",
                            borderRadius: 24,
                            background: isSelected ? int.color : "transparent",
                            border: `1px solid ${isSelected ? int.color : "rgba(255,255,255,0.15)"}`,
                            fontFamily: FONTS.body,
                            fontSize: 16,
                            color: isSelected ? "#fff" : COLORS.textMuted,
                          }}
                        >
                          {int.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certify button */}
      {frame >= 170 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(btnEntrance, [0, 1], [0.8, 1])})`,
            opacity: interpolate(btnEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: GRADIENTS.iridescence,
              backgroundSize: "200% 200%",
              backgroundPosition: `${shimmer}% 50%`,
              borderRadius: 14,
              padding: "14px 48px",
              boxShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
            }}
          >
            <span style={{ fontFamily: FONTS.body, fontSize: 20, fontWeight: 700, color: "#fff" }}>
              Certify
            </span>
          </div>
        </div>
      )}

      {/* Confirm effect */}
      {frame >= 200 && (
        <div style={{ position: "absolute", bottom: 130, left: "50%", transform: "translate(-50%, 0)" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: rippleSize,
              height: rippleSize,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `2px solid rgba(34, 197, 94, ${rippleOp})`,
            }}
          />
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.15)",
              border: "2px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${checkScale})`,
              opacity: checkOp,
            }}
          >
            <span style={{ fontSize: 28, color: "#22c55e" }}>✓</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
