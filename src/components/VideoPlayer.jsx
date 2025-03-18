import { getVimeoId } from "../utils/getVimeoId";

export default function VideoPlayer({ videoUrl }) {
  const vimeoId = getVimeoId(videoUrl);
  return (
    <div className="relative h-[100%] w-[100%] overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&transparent=1&autoplay=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  );
}
