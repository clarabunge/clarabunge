export default function Project() {
  return (
    <div className="px-4">
      <div className="py-16">
        <VideoPlayer />
      </div>
      <div className="flex justify-between">
        <h2 className="text-4xl">YA PASO - Gregorio</h2>
        <div className="text-end">
          <div>Music Video</div>
          <div>2024</div>
        </div>
      </div>
      <div className="py-16">
        “Ya Paso” delves into themes of self-discovery, passion, and the passage
        of time. The story follows a young man at a career crossroads, torn
        between the stability of a corporate job and the childhood passion that
        still burns within him. As he wrestles with ambition and instinct, he
        must choose between following convention or embracing the path his heart
        truly desires, roller hockey.
      </div>
      <div className="text-end">
        <div>Buenos Aires, Argentina</div>
        <div>{`34°36′14″S 58°22′54″O`}</div>
      </div>
    </div>
  );
}

function VideoPlayer() {
  return (
    <div style={{ padding: "56.25% 0 0 0" }} className="relative">
      <iframe
        src="https://player.vimeo.com/video/1047919336?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;transparent=0"
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
  );
}
