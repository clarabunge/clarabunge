import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { getVimeoId } from "../utils/getVimeoId";

export default function Intro({ videoUrl, setIntroEnded }) {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(videoUrl);

  useEffect(() => {
    if (videoRef.current && !player) {
      const vimeoPlayer = new Player(videoRef.current);

      vimeoPlayer.on("ended", () => {
        setIntroEnded(true);
      });

      setPlayer(vimeoPlayer);
    }

    return () => {
      if (player) {
        player.off("ended");
        player.destroy();
      }
    };
  }, [videoRef, player]);

  return (
    <div className="fixed z-400 flex h-screen w-full items-center justify-center bg-black">
      <div className="relative size-4 animate-ping rounded-full border" />
      <iframe
        ref={videoRef}
        src={`https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&quality=720p&loop=0`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        className="absolute top-0 left-0 h-full w-full"
      ></iframe>
    </div>
  );
}
