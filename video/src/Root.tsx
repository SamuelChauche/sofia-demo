import { Composition } from "remotion";
import { SofiaDemo } from "./SofiaDemo";
import { FPS, WIDTH, HEIGHT } from "./brand";

// 8 scenes: 210+210+240+270+360+270+240+210 = 2010
// 7 fade transitions × 12 frames = 84 overlap
// Total: 2010 - 84 = 1926 frames (~64.2s)
const DURATION = 1926;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SofiaDemo"
      component={SofiaDemo}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
