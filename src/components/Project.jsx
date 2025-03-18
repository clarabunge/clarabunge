import { useMainContent } from "../utils/useData";
import VideoPlayer from "./VideoPlayer";
import ImageGallery from "./ImageGallery";
import { PortableText } from "@portabletext/react";
import useLanguage from "../utils/useLanguage";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "react-router";

export default function Project() {
  const { data, isLoading } = useMainContent();
  const { language } = useLanguage();
  const { slug } = useParams();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const projectData = data?.projects?.find(
    (project) => project.slug.current === slug,
  );

  return (
    <>
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
              {projectData?.title?.[language] || projectData?.title?.es}
            </h2>

            <div className="group relative h-[200px] w-full lg:h-[500px]">
              <VideoPlayer videoUrl={projectData?.videoUrl} />
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

            {projectData?.acknowledgements && (
              <div className="col-span-2 col-start-2 flex items-center justify-center gap-4 py-16">
                {projectData.acknowledgements.map((acknowledgement) => (
                  <div key={acknowledgement._key}>
                    {acknowledgement.link ? (
                      <a href={acknowledgement.link} target="_blank">
                        {" "}
                        <img
                          src={acknowledgement.image.url + "?w20&fm=webp"}
                          alt=""
                          className="max-w-[200px] bg-white"
                        />
                      </a>
                    ) : (
                      <img
                        src={acknowledgement.image.url + "?h=500&fm=webp"}
                        alt=""
                        className="max-w-[300px] bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

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
