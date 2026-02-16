import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONTS, GRADIENTS } from "../brand";
import { SofiaOrb } from "../components/SofiaOrb";
import { TripletDisplay } from "../components/TripletDisplay";
import { InterestCard } from "../components/InterestCard";

const TRIPLETS = [
  { subject: "I", predicate: "am learning", object: "Solidity" },
  { subject: "I", predicate: "use for work", object: "OpenZeppelin" },
  { subject: "I", predicate: "explore", object: "Account Abstraction" },
];

const INTERESTS = [
  {
    name: "Software Development",
    level: 4,
    xp: 155,
    xpToNext: 25,
    certs: 31,
    domains: ["github.com", "stackoverflow", "studio.apollo"],
    certBreakdown: [
      { type: "work", count: 21 },
      { type: "learning", count: 6 },
      { type: "inspiration", count: 4 },
    ],
    reasoning: "High activity on professional development platforms...",
  },
  {
    name: "Online Learning",
    level: 3,
    xp: 60,
    xpToNext: 40,
    certs: 12,
    domains: ["youtube.com", "thehackingp..."],
    certBreakdown: [
      { type: "learning", count: 2 },
      { type: "fun", count: 4 },
      { type: "inspiration", count: 6 },
    ],
    reasoning: "Significant visits for inspiration and learning...",
  },
  {
    name: "Blockchain Exploration",
    level: 2,
    xp: 35,
    xpToNext: 15,
    certs: 7,
    domains: ["metamask.io", "sofia.intuitio...", "portal.intuiti..."],
    certBreakdown: [
      { type: "work", count: 2 },
      { type: "learning", count: 2 },
      { type: "inspiration", count: 2 },
      { type: "buying", count: 1 },
    ],
    reasoning: "Visits for learning and work indicate interest...",
  },
];

export const PulseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Pulse (0→170) — orb + triplets (longer to breathe)
  // Phase 2: Interests (170→360) — InterestCards

  const phase2Start = 170;
  const inPhase2 = frame >= phase2Start;

  // Phase 1 opacity (fades out as phase 2 starts)
  const phase1Op = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 slide-in
  const phase2Op = interpolate(frame, [170, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2X = interpolate(frame, [170, 195], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Pulse Analysis" button
  const btnEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const btnActive = frame >= 40;
  const btnShimmer = interpolate(frame % 60, [0, 60], [0, 100]);

  // Session card
  const sessionOp = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleOp = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [10, 30], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: "40%",
          height: "40%",
          background: GRADIENTS.iridescence,
          filter: "blur(180px)",
          opacity: 0.06,
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
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontSize: 40, color: COLORS.textPrimary }}>
          AI-powered analysis reveals your{" "}
          <span
            style={{
              background: GRADIENTS.iridescence,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            expertise patterns
          </span>
        </span>
      </div>

      {/* Phase 1: Pulse with orb + triplets */}
      <div style={{ opacity: phase1Op }}>
        {/* Orb center */}
        <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)" }}>
          <SofiaOrb size={64} delay={0} pulseIntensity={2.5} />
        </div>

        {/* Pulse Analysis button */}
        <div
          style={{
            position: "absolute",
            top: 150,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(btnEntrance, [0, 1], [0.8, 1])})`,
            opacity: interpolate(btnEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 10,
              background: btnActive ? GRADIENTS.iridescence : "rgba(255,255,255,0.08)",
              backgroundSize: btnActive ? "200% 200%" : undefined,
              backgroundPosition: btnActive ? `${btnShimmer}% 50%` : undefined,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 18,
                fontWeight: 600,
                color: btnActive ? "#000000" : COLORS.textMuted,
              }}
            >
              Pulse Analysis
            </span>
          </div>
        </div>

        {/* Session card */}
        <div
          style={{
            position: "absolute",
            top: 540,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: sessionOp,
            width: 720,
            padding: "16px 20px",
            borderRadius: 12,
            background: COLORS.bgGlass,
            border: `1px solid ${COLORS.borderGlass}`,
          }}
        >
          <div style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, marginBottom: 12 }}>
            Session — Feb 16, 2026 · 2h 12m
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TRIPLETS.map((t, i) => (
              <TripletDisplay
                key={i}
                subject={t.subject}
                predicate={t.predicate}
                object={t.object}
                delay={55 + i * 15}
                fontSize={16}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phase 2: Interest cards */}
      {inPhase2 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            right: 0,
            opacity: phase2Op,
            transform: `translateX(${phase2X}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {INTERESTS.map((interest, i) => (
            <InterestCard key={i} data={interest} delay={phase2Start + 15 + i * 25} />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
