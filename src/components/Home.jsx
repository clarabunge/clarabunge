import { useState, useEffect } from "react";
import { NavLink } from "react-router";

import VimeoBackground from "./VimeoBackground.jsx";

export default function Home() {
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);

  const videos = [
    {
      id: "1047919663",
      title: "YA PASO - Gregorio",
      typeOfProject: "Music Video",
      year: "2024",
      location: "Buenos Aires, Argentina",
      coordinates: "34°36′14′′S 58°22′54′′O",
    },
    {
      id: "1047919336",
      title: "NUNCA TE VAYAS DE CASA - CHECHI",
      typeOfProject: "Music Video",
      year: "2024",
      location: "Buenos Aires, Argentina",
      coordinates: "34°36′14′′S 58°22′54′′O",
    },
    {
      id: "1011376077",
      title: "Creo en el tiempo como en una margarita",
      typeOfProject: "Music Video",
      year: "2024",
      location: "Buenos Aires, Argentina",
      coordinates: "34°36′14′′S 58°22′54′′O",
    },
  ];

  const handleOnLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    console.log(loadedVideos);
  };

  useEffect(() => {
    if (loadedVideos === videos.length) {
      setTimeout(() => setAllVideosLoaded(true), 1000);
    }
  }, [loadedVideos]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isAutoplayEnabled || isHovering) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % videos.length;
      setCurrentIndex(nextIndex);
      setCurrentVideo(videos[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoplayEnabled, isHovering, videos.length]);

  const handleVideoSelect = (video, index) => {
    setCurrentIndex(index);
    setCurrentVideo(video);
    setIsAutoplayEnabled(false);
    setTimeout(() => setIsAutoplayEnabled(true), 15000);
  };

  return (
    <>
      {!allVideosLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          LOADING {loadedVideos}/{videos.length}
        </div>
      )}

      <div className={`${allVideosLoaded ? "" : "hidden"}`}>
        {videos.map((video, index) => (
          <VimeoBackground
            key={video.id}
            videoId={video.id}
            handleOnLoad={handleOnLoad}
            hidden={currentVideo.id !== video.id}
          />
        ))}
      </div>

      <div className="flex h-screen w-full flex-col justify-end p-4 font-[Nimbus-Cond] text-xs">
        {videos.map((video, index) => (
          <NavLink
            to="/project"
            key={video.id}
            className="grid w-full grid-cols-4 hover:bg-white/10 hover:font-[Nimbus-CondItal]"
            onMouseEnter={() => {
              setIsHovering(true);
              handleVideoSelect(video, index);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
          >
            <div className="">
              {currentVideo.id === video.id ? video.coordinates : ""}
            </div>
            <h2>{video.title}</h2>
            <div className="">
              {currentVideo.id === video.id ? video.year : ""}
            </div>
            <div className="">
              {currentVideo.id === video.id ? video.typeOfProject : ""}
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}
