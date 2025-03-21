import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router";
import Header from "./components/Header.jsx";
import Project from "./components/Project.jsx";
import Info from "./components/Info.jsx";
import { useIntroUrl, useMainContent } from "./utils/useData.js";
import useLanguage from "./utils/useLanguage.js";
import VimeoBackground from "./components/VimeoBackground.jsx";
import Intro from "./components/Intro.jsx";
import { AnimatePresence, motion } from "motion/react";

function App() {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const {
    data: introUrlData,
    isLoading: isIntroUrlLoading,
    error: introUrlError,
  } = useIntroUrl();
  const { data, isLoading, error } = useMainContent();
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);
  const { language } = useLanguage();
  const [introEnded, setIntroEnded] = useState(false);

  const handleOnLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === data?.projects?.length) {
      setTimeout(() => setAllVideosLoaded(true), 1000);
    }
  }, [loadedVideos]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
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
  }, [currentIndex, isAutoplayEnabled, isHovering, data?.projects?.length]);

  const handleVideoSelect = (video, index) => {
    setCurrentIndex(index);
    setCurrentVideo(video);
    setIsAutoplayEnabled(false);
    setTimeout(() => setIsAutoplayEnabled(true), 15000);
  };

  useEffect(() => {
    if (!isLoading) {
      setCurrentVideo(data?.projects?.[0]);
    }
  }, [isLoading]);

  if (error || introUrlError) {
    return (
      <div className="flex items-center justify-center">
        <p>＞﹏＜</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {introUrlData?.introUrl && !introEnded && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            <Intro
              videoUrl={introUrlData?.introUrl}
              setIntroEnded={setIntroEnded}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className={`${introEnded ? "" : "hidden"}`}>
          {/* {!allVideosLoaded && (
            <div className="absolute inset-0 z-100 flex items-center justify-center bg-black">
              LOADING {loadedVideos}/{data.projects?.length}
            </div>
          )} */}
          <section className="fixed top-0 left-0 -z-10 w-full">
            <div className={`${allVideosLoaded ? "" : "hidden"}`}>
              {data.projects?.map((video, index) => (
                <VimeoBackground
                  key={video._id}
                  videoUrl={video.videoUrl}
                  handleOnLoad={handleOnLoad}
                  hidden={currentVideo?._id !== video._id}
                />
              ))}
            </div>
            <div className="flex h-screen w-full flex-col justify-end p-8 font-[Nimbus-Cond] text-sm">
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
                    {currentVideo?._id === video._id
                      ? video.location.coordinates
                      : ""}
                  </div>
                  <h2
                    className={
                      currentVideo?._id === video._id
                        ? ""
                        : "text-[var(--secondary)]"
                    }
                  >
                    {video.title[language] || video.title.es}
                  </h2>
                  <div className="">
                    {currentVideo?._id === video._id
                      ? video.date.split("-")[0]
                      : ""}
                  </div>
                  <div className="">
                    {currentVideo?._id === video._id
                      ? video.typeOfProject.type[language] ||
                        video.typeOfProject.type.es
                      : ""}
                  </div>
                </NavLink>
              ))}
            </div>
          </section>
          <Header infoIsOpen={infoIsOpen} setInfoIsOpen={setInfoIsOpen} />
          <Routes>
            <Route path="/" element={null} />
            <Route path="/:slug" element={<Project />} />
          </Routes>
          {infoIsOpen && <Info />}
        </div>
      )}
    </>
  );
}

export default App;
