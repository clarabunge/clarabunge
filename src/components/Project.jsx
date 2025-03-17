import { useState } from "react";
import { useMainContent } from "../utils/useData";
import VideoPlayer from "./VideoPlayer";
import ImageGallery from "./ImageGallery";
import { PortableText } from "@portabletext/react";
import useLanguage from "../utils/useLanguage";
import { AnimatePresence, motion } from "motion/react";

const SLUG = "ya-paso-gregorio";

export default function Project() {
  const [playerIsOpen, setPlayerIsOpen] = useState(false);
  const { data, isLoading } = useMainContent();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const projectData = data?.projects?.find(
    (project) => project.slug.current === SLUG,
  );

  return (
    <>
      <AnimatePresence>
        {playerIsOpen && (
          <motion.div
            className="fixed top-0 left-0 z-100 flex h-screen w-full items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-2 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black p-2 font-[Nimbus-Cond] text-sm text-white uppercase"
              onClick={() => setPlayerIsOpen(false)}
            >
              close
            </button>
            <VideoPlayer videoUrl={projectData?.videoUrl} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.section
          className="flex flex-col gap-8 px-4 py-32 pb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-[1fr_1fr_3fr_1fr] gap-8">
            <div className="text-end opacity-70">
              <div className="font-[Nimbus-Cond]">
                {projectData?.typeOfProject?.type?.[language]}
              </div>
              <div className="font-[Nimbus-Cond]">
                {projectData?.date?.split("-")[0]}
              </div>
            </div>

            <h2 className="text-2xl uppercase">
              Creo en el tiempo como en una margarita
            </h2>

            <div
              className="group relative cursor-pointer"
              onClick={() => setPlayerIsOpen(true)}
            >
              <img
                src={projectData?.image?.url + "?h=1080&fm=webp"}
                alt=""
                className="rounded-md"
              />
              <div className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-center font-[Nimbus-Cond] leading-none opacity-0 transition-opacity group-hover:opacity-100">
                PLAY
              </div>
            </div>

            <div className="opacity-70">
              <div className="col-start-2 font-[Nimbus-Cond]">
                {projectData?.location?.city}, {projectData?.location?.country}
              </div>
              <div className="font-[Nimbus-Cond]">
                {projectData?.location?.coordinates}
              </div>
            </div>

            <div className="col-span-2 col-start-2 flex flex-col gap-4 py-16">
              <PortableText value={projectData?.description?.[language]} />
            </div>

            <div className="col-span-2 col-start-2">
              <ImageGallery slug={projectData?.slug?.current} />
            </div>
          </div>

          {/* <div className="text-end font-[Nimbus-Cond]"></div> */}

          {/* {projectData?.links && (
          <ul className="py-8">
            {projectData.links.map((link) => (
              <li key={link._key}>
                <a href={link.url} target="_blank">
                  {link.title[language]}
                </a>
              </li>
            ))}
          </ul>
        )} */}
        </motion.section>
      </AnimatePresence>
    </>
  );
}
