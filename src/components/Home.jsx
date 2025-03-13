import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { motion } from "motion/react";

export default function Home() {
  const videos = ["1047919336", "1047919663", "1011376077"];

  return (
    <>
      <VideoFullscreen videoId={videos[1]} />
      <div className="flex h-screen w-full flex-col justify-end p-4 font-[Nimbus-Cond] text-xs">
        <NavLink to="/project">
          <div className="grid w-full grid-cols-4 hover:bg-white/10 hover:font-[Nimbus-CondItal]">
            <div className="">{`34°36′14″S 58°22′54″O`}</div>
            <h2>YA PASO - Gregorio</h2>
            <div className="">2024</div>
            <div className="">Music Video</div>
          </div>
        </NavLink>
        <NavLink>
          <div className="grid w-full grid-cols-4">
            <div></div>
            <h2 className="opacity-50">NUNCA TE VAYAS DE CASA - CHECHI</h2>
            <div></div>
            <div className=""></div>
          </div>
        </NavLink>
        <NavLink>
          <div className="grid w-full grid-cols-4">
            <div></div>
            <h2 className="opacity-50">
              Creo en el tiempo como en una margarita
            </h2>
            <div></div>
            <div className=""></div>
          </div>
        </NavLink>
      </div>
    </>
  );
}

function VideoCentered({ videoId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);

    const handleMessage = (event) => {
      if (!event.origin.includes("vimeo.com")) return;

      try {
        const data = JSON.parse(event.data);

        if (data.event === "ready") {
          setTimeout(() => setIsLoaded(true), 1500);
        }
      } catch (error) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videoId]);

  return (
    <div className="fixed inset-0 -z-10 h-screen px-40 backdrop-blur-xl">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border border-white/40 border-t-transparent"></div>
        </div>
      )}
      <div
        style={{ padding: "56.25% 0 0 0" }}
        className="relative flex h-full items-center"
      >
        <motion.iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&transparent=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          title={videoId}
        ></motion.iframe>
      </div>
    </div>
  );
}

function VideoFullscreen({ videoId }) {
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
    <div className="absolute inset-0 -z-10 h-screen w-full bg-black/30">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border border-white/40 border-t-transparent"></div>
        </div>
      )}
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
        ></motion.iframe>
      </div>
    </div>
  );
}
