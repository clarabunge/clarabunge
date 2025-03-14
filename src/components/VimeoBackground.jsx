import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function VimeoBackground({
  videoId,
  hidden = true,
  handleOnLoad,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);

    const handleMessage = (event) => {
      if (!event.origin.includes("vimeo.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === "ready") {
          setTimeout(() => setIsLoaded(true), 1000);
        }
      } catch (error) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videoId]);

  return (
    <div
      className={`absolute inset-0 -z-10 h-screen w-full bg-black/30 ${hidden ? "hidden" : ""}`}
    >
      <div
        style={{
          padding: "0",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
        className="relative h-full w-full object-cover"
      >
        <motion.iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{
            boxSizing: "border-box",
            width: "177.77777778vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          title={videoId}
          onLoad={handleOnLoad}
        ></motion.iframe>
      </div>
    </div>
  );
}
