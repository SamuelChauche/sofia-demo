import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { OrganizeScene } from "./scenes/OrganizeScene";
import { CertifyScene } from "./scenes/CertifyScene";
import { PulseScene } from "./scenes/PulseScene";
import { ProfileScene } from "./scenes/ProfileScene";
import { CommunityScene } from "./scenes/CommunityScene";
import { ClosingScene } from "./scenes/ClosingScene";

const FADE_FRAMES = 12;

const SCENES = [
  { id: "hook", duration: 210, Component: HookScene },
  { id: "problem", duration: 210, Component: ProblemScene },
  { id: "organize", duration: 240, Component: OrganizeScene },
  { id: "certify", duration: 270, Component: CertifyScene },
  { id: "pulse", duration: 360, Component: PulseScene },
  { id: "profile", duration: 270, Component: ProfileScene },
  { id: "community", duration: 240, Component: CommunityScene },
  { id: "closing", duration: 210, Component: ClosingScene },
];

export const SofiaDemo: React.FC = () => {
  return (
    <TransitionSeries>
      {SCENES.map((scene, i) => (
        <>
          <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.duration}>
            <scene.Component />
          </TransitionSeries.Sequence>
          {i < SCENES.length - 1 && (
            <TransitionSeries.Transition
              key={`t-${scene.id}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: FADE_FRAMES })}
            />
          )}
        </>
      ))}
    </TransitionSeries>
  );
};
