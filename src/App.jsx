import { useState, useEffect } from "react";
import { useLocation, Routes, Route, NavLink } from "react-router";
import Header from "./components/Header.jsx";
import Project from "./components/Project.jsx";
import Info from "./components/Info.jsx";
import { useIntroUrl, useMainContent } from "./utils/useData.js";
import useLanguage from "./utils/useLanguage.js";
import VimeoBackground from "./components/VimeoBackground.jsx";
import Intro from "./components/Intro.jsx";
import { AnimatePresence, motion } from "motion/react";
import useIsMobile from "./utils/useIsMobile.jsx";

const listVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.7,
    },
  },
};

const headerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1, type: "tween", delay: 0.3 },
  },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

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
  const location = useLocation();
  const isMobile = useIsMobile();

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
    if (!isAutoplayEnabled || isHovering || location.pathname !== "/") return;

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

  useEffect(() => {
    setTimeout(() => setIntroEnded(true), 15000);
  }, [setIntroEnded]);

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
            className="pointer-events-none"
          >
            <Intro
              videoUrl={introUrlData?.introUrl}
              setIntroEnded={setIntroEnded}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* {!allVideosLoaded && (
            <div className="absolute inset-0 z-100 flex items-center justify-center bg-black">
              LOADING {loadedVideos}/{data.projects?.length}
            </div>
          )} */}
          <section
            className={`fixed top-0 left-0 -z-10 w-full uppercase ${location.pathname === "/" ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
          >
            <div className={`${allVideosLoaded ? "" : "hidden"}`}>
              {data.projects?.map((video, index) => (
                <VimeoBackground
                  key={video._id}
                  videoUrl={video.videoUrl}
                  imgUrl={video.image.url}
                  handleOnLoad={handleOnLoad}
                  hidden={currentVideo?._id !== video._id}
                />
              ))}
            </div>
            {introEnded && (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="fixed bottom-0 flex w-full flex-col justify-end p-4 text-base md:p-8 md:text-xs"
              >
                {data.projects?.map((video, index) => (
                  <motion.div variants={itemVariants} key={video._id}>
                    <NavLink
                      to={video.slug.current}
                      className="group relative grid w-full pb-[1px] md:grid-cols-4"
                      onMouseEnter={() => {
                        if (!isMobile) {
                          setIsHovering(true);
                          handleVideoSelect(video, index);
                        }
                      }}
                      onMouseLeave={() => {
                        setIsHovering(false);
                      }}
                    >
                      <div className="hidden font-[detail] text-white md:block">
                        {currentVideo?._id === video._id
                          ? video.location.coordinates
                          : ""}
                      </div>
                      <h2
                        className={
                          currentVideo?._id === video._id
                            ? "border-b border-white text-white md:border-none"
                            : "text-secondary-dim"
                        }
                      >
                        {video.title[language] || video.title.es}
                      </h2>
                      <div className="hidden font-[detail] text-white md:block">
                        {currentVideo?._id === video._id
                          ? video.date.split("-")[0]
                          : ""}
                      </div>
                      <div className="hidden font-[detail] text-white md:block">
                        {currentVideo?._id === video._id
                          ? video.typeOfProject.type[language] ||
                            video.typeOfProject.type.es
                          : ""}
                      </div>
                      <motion.div
                        variants={lineVariants}
                        animate={
                          isHovering && currentVideo?._id === video._id
                            ? "visible"
                            : "hidden"
                        }
                        className="absolute bottom-0 h-[1px] w-0 bg-white group-hover:w-full"
                      />
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
          {introEnded && (
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              <Header infoIsOpen={infoIsOpen} setInfoIsOpen={setInfoIsOpen} />
            </motion.div>
          )}
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={null} />
              <Route path="/:slug" element={<Project />} />
            </Routes>
          </AnimatePresence>
          <AnimatePresence>{infoIsOpen && <Info key="info" />}</AnimatePresence>
        </>
      )}
    </>
  );
}

export default App;
