import { Composition } from "remotion";
import { MyComponent, calculateMetadata } from "./Composition";
import { FPS, ShotList, calculateShotListMetadata } from "./ShotList";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComponent}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
        calculateMetadata={calculateMetadata}
      />
      <Composition
        id="ShotList"
        component={ShotList}
        durationInFrames={1}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          shots: [
            { text: "Scene 1", color: "#1e6b52", durationInSeconds: 2 },
            { text: "Scene 2", color: "#8a3b12", durationInSeconds: 3 },
            { text: "Scene 3", color: "#2b3a8c", durationInSeconds: 2 },
          ],
        }}
        calculateMetadata={calculateShotListMetadata}
      />
    </>
  );
};
