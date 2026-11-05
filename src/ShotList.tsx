// npx remotion render ShotList out/a.mp4 --props=./demo-a.json

import React from "react";
import {
  CalculateMetadataFunction,
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FPS = 30;

// Work out the video's length from the data, instead of hard-coding it
export const calculateShotListMetadata: CalculateMetadataFunction<
  ShotListProps
> = ({ props }) => {
  const totalFrames = props.shots.reduce(
    (sum, shot) => sum + Math.round(shot.durationInSeconds * FPS),
    0,
  );
  return { durationInFrames: totalFrames };
};

// One "shot": like a shot in David's manifest, but with a colour instead of a clip for now
export type Shot = { text: string; color: string; durationInSeconds: number };
export type ShotListProps = { shots: Shot[] };

// Draws ONE shot. useCurrentFrame() here counts from 0 at the start of THIS shot.
const ShotCard: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  // Fade text in over the first 15 frames (half a second at 30 fps), then stay at 1
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: shot.color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: 90,
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        {shot.text}
      </h1>
    </AbsoluteFill>
  );
};

// Plays all shots back to back, each for its own duration
export const ShotList: React.FC<ShotListProps> = ({ shots }) => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      {shots.map((shot, i) => (
        <Series.Sequence
          key={i}
          durationInFrames={Math.round(shot.durationInSeconds * fps)}
        >
          <ShotCard shot={shot} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

