import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { getVimeoId } from "../utils/getVimeoId";
import { motion } from "motion/react";

export default function Intro({ videoUrl, setIntroEnded }) {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(1);
  const [count, setCount] = useState(1);
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(videoUrl);

  useEffect(() => {
    if (videoRef.current && !player) {
      const vimeoPlayer = new Player(videoRef.current);

      vimeoPlayer.on("play", () => {
        setRotate(90 + 360);
      });

      vimeoPlayer.on("timeupdate", () => {
        vimeoPlayer.getCurrentTime().then((time) => {
          vimeoPlayer.getDuration().then((dur) => {
            setCount(Math.floor((time / dur) * 100));
            if (time > dur * 0.4) {
              setScale(0);
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
    <div className="fixed z-400 flex h-screen w-full items-center justify-center bg-black">
      <motion.div
        animate={{
          rotate: rotate,
          transition: { duration: 3, loop: Infinity },
        }}
        className="relative z-1000 size-[2px] w-2/4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: scale, transition: { duration: 5 } }}
          exit={{ scale: 0, transition: { duration: 0.23 } }}
          className="absolute top-0 left-0 h-full w-full bg-white"
        />
        {/* <motion.div>{count}</motion.div> */}
      </motion.div>
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
