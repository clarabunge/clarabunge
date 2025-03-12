import { NavLink } from "react-router";

export default function Home() {
  const videos = ["1047919336", "1047919663", "1011376077"];
  return (
    <>
      <VideoCentered videoId={videos[2]} />
      {/* <VideoFullscreen videoId={videos[1]} /> */}
      <div className="flex h-screen w-full flex-col justify-center p-4 text-xs">
        <NavLink to="/project">
          <div className="grid w-full grid-cols-4">
            <h2>YA PASO - Gregorio</h2>
            <div>2024</div>
            <div>{`34°36′14″S 58°22′54″O`}</div>
            <div className="place-self-end">Music Video</div>
          </div>
        </NavLink>
        <div className="opacity-50">NUNCA TE VAYAS DE CASA - CHECHI</div>
        <div className="opacity-50">
          Creo en el tiempo como en una margarita
        </div>
      </div>
    </>
  );
}

function VideoCentered({ videoId }) {
  return (
    <div className="fixed inset-0 -z-10 h-screen px-32 py-8">
      <div
        style={{ padding: "56.25% 0 0 0" }}
        className="relative flex h-full items-center"
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&transparent=0`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          title="IMG_6023"
        ></iframe>
      </div>
    </div>
  );
}

function VideoFullscreen({ videoId }) {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full bg-black/30">
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
        <iframe
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
          title="IMG_6023"
        ></iframe>
      </div>
    </div>
  );
}
