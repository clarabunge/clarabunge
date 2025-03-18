import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useMainContent } from "../utils/useData.js";
import VimeoBackground from "./VimeoBackground.jsx";
import useLanguage from "../utils/useLanguage.js";

export default function Home() {
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);
  const { data } = useMainContent();
  const { language } = useLanguage();

  const handleOnLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    console.log(loadedVideos);
  };

  useEffect(() => {
    if (loadedVideos === data.projects?.length) {
      setTimeout(() => setAllVideosLoaded(true), 1000);
    }
  }, [loadedVideos]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(data.projects?.[0]);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isAutoplayEnabled || isHovering) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.projects?.length;
      setCurrentIndex(nextIndex);
      setCurrentVideo(data.projects?.[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoplayEnabled, isHovering, data.projects?.length]);

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
          LOADING {loadedVideos}/{data.projects?.length}
        </div>
      )}

      <div className={`${allVideosLoaded ? "" : "hidden"}`}>
        {data.projects?.map((video, index) => (
          <VimeoBackground
            key={video._id}
            videoUrl={video.videoUrl}
            handleOnLoad={handleOnLoad}
            hidden={currentVideo._id !== video._id}
          />
        ))}
      </div>

      <div className="flex h-screen w-full flex-col justify-end p-8 font-[Nimbus-Cond] text-xs">
        {data.projects?.map((video, index) => (
          <NavLink
            to={video.slug.current}
            key={video._id}
            className="grid w-full grid-cols-4 border-b border-transparent hover:border-white"
            onMouseEnter={() => {
              setIsHovering(true);
              handleVideoSelect(video, index);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
          >
            <div className="">
              {currentVideo._id === video._id ? video.location.coordinates : ""}
            </div>
            <h2
              className={
                currentVideo._id === video._id ? "opacity-100" : "opacity-70"
              }
            >
              {video.title[language] || video.title.es}
            </h2>
            <div className="">
              {currentVideo._id === video._id ? video.date.split("-")[0] : ""}
            </div>
            <div className="">
              {currentVideo._id === video._id
                ? video.typeOfProject.type[language] ||
                  video.typeOfProject.type.es
                : ""}
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}
