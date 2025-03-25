import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { getVimeoId } from "../utils/getVimeoId";
import { motion } from "motion/react";
import IntroAnimation from "./IntroAnimation";

const line = {
  initial: { opacity: 1, scale: 0 },
  loading: { opacity: 0.8, scale: 0.33, transition: { duration: 7 } },
  start: {
    opacity: 0,
    scale: 0,
    transition: { duration: 1 },
  },
  end: { opacity: 0, rotate: 180, scale: 0, transition: { duration: 1 } },
};

const videoIframe = {
  initial: { opacity: 0, scale: 0 },
  start: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  end: { opacity: 0, scale: 5, transition: { duration: 1 } },
};

export default function Intro({ videoUrl, setIntroEnded }) {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(videoUrl);
  const [animationStatus, setAnimationStatus] = useState("loading");

  useEffect(() => {
    if (videoRef.current && !player) {
      const vimeoPlayer = new Player(videoRef.current);

      vimeoPlayer.on("play", () => {
        setAnimationStatus("start");
      });

      vimeoPlayer.on("timeupdate", () => {
        vimeoPlayer.getCurrentTime().then((time) => {
          vimeoPlayer.getDuration().then((dur) => {
            if (time > dur * 0.9) {
              setAnimationStatus("end");
            }
          });
        });
      });

      vimeoPlayer.on("ended", () => {
        setIntroEnded(true);
      });

      setPlayer(vimeoPlayer);
    }

    return () => {
      if (player) {
        player.off("play");
        player.off("timeupdate");
        player.off("ended");
        player.destroy();
      }
    };
  }, [videoRef, player, setIntroEnded]);

  return (
    <div className="fixed z-400 flex h-screen w-full items-center justify-center bg-black select-none">
      <motion.div
        className="fixed top-0 z-1000 mx-auto h-full w-[1px] bg-white"
        variants={line}
        animate={animationStatus}
        initial="initial"
      />
      <motion.iframe
        animate={animationStatus}
        initial="initial"
        variants={videoIframe}
        ref={videoRef}
        src={`https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&quality=720p&loop=0`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        className="top-0 left-0 h-full w-1/3"
      ></motion.iframe>
      <IntroAnimation status={animationStatus} />
    </div>
  );
}
