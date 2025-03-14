import { getVimeoId } from "../utils/getVimeoId";

export default function VideoPlayer({ videoUrl }) {
  const vimeoId = getVimeoId(videoUrl);
  return (
    <div className="relative h-[90%] w-[90%] overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;transparent=0`}
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
