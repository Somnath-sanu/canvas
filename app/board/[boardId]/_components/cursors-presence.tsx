"use client";

import { memo } from "react";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        return (
          <Path
            key={key}
            x={0}
            y={0}
            points={other.pencilDraft!}
            fill={other.penColor ? colorToCss(other.penColor) : "#000"}
          />
        );
      })}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorsPresence";
