"use client";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubePlayer({
  id,
  start,
  end,
}: {
  id: string;
  start: number;
  end: number;
}) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log({ event });
    // access to player in all event handlers via event.target
    event.target.playVideoAt(19);
    // event.target.pauseVideo();
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start,
      end,
      width: "100%",
    },
  };

  return (
    <YouTube
      style={{
        width: "100%",
      }}
      iframeClassName="youtube-frame"
      opts={opts}
      onReady={onPlayerReady}
      id="music-quiz"
      videoId={id}
    />
  );
}
