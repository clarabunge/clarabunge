import { getVimeoId } from "../utils/getVimeoId";

export default function VideoPlayer({ videoUrl }) {
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(videoUrl);

  return (
    <div className="relative pt-[56.25%]">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}badge=0&autopause=0&player_id=0&app_id=58479&transparent=1&autoplay=1&loop=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        className="absolute top-0 left-0 h-full w-full"
      ></iframe>
    </div>
  );
}
