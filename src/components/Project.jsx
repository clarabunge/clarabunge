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
      <motion.section
        className="flex flex-col gap-8 bg-black px-8 py-32 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="grid grid-cols-6 gap-x-8 gap-y-16">
          <div className="text-end font-[Nimbus-Cond] text-[var(--secondary)]">
            <div className="">
              {projectData?.typeOfProject?.type?.[language] ?? "-"}
            </div>
            <div>{projectData?.date.slice(0, 4) ?? "-"}</div>
          </div>

          <div className="group relative col-span-4 w-full overflow-hidden rounded-md">
            <VideoPlayer videoUrl={projectData?.videoUrl} />
          </div>

          <div className="">
            <div className="col-start-2 font-[Nimbus-Cond] text-[var(--secondary)]">
              {projectData?.location?.city ?? "-"},{" "}
              {projectData?.location?.country ?? "-"}
            </div>
            <div className="font-[Nimbus-Cond] text-[var(--secondary)]">
              {projectData?.location?.coordinates ?? "-"}
            </div>
            {projectData?.links && (
              <ul className="">
                {projectData?.linksSectionTitle && (
                  <li className="pt-8 font-[Nimbus-Cond] text-xs text-[var(--secondary)] uppercase">
                    {projectData?.linksSectionTitle[language]}
                  </li>
                )}
                {projectData.links.map((link) => (
                  <li key={link._key}>
                    <a
                      href={link.url}
                      target="_blank"
                      className="hover:text-[var(--primary)]"
                    >
                      {link.title[language]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-max -rotate-12 place-self-end">
            <img src="/img/asterisco.svg" alt="" className="size-16" />
          </div>

          <h2 className="col-span-5 col-start-2 font-[display] text-5xl">
            {projectData?.title?.[language] || projectData?.title?.es}
          </h2>

          <div className="col-span-3 col-start-3 flex flex-col gap-4 py-8 text-lg">
            <PortableText value={projectData?.description?.[language]} />
          </div>

          {projectData?.acknowledgements && (
            <div className="col-span-4 col-start-2 flex items-center justify-center gap-4">
              {projectData.acknowledgements.map((acknowledgement) => (
                <div key={acknowledgement._key}>
                  {acknowledgement.link ? (
                    <a href={acknowledgement.link} target="_blank">
                      {" "}
                      <img
                        src={acknowledgement.image.url + "?w20&fm=webp"}
                        alt=""
                        className="max-w-[150px] bg-white"
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

          <div className="col-span-6 col-start-1">
            <ImageGallery slug={projectData?.slug?.current} />
          </div>

          {projectData?.credits && (
            <div className="col-span-3 col-start-3 flex flex-col gap-4">
              {projectData.credits.map((credit) => (
                <div key={credit._key}>
                  <p className="font-[Nimbus-Cond] text-xs text-[var(--secondary)] uppercase">
                    {credit.role[language]}
                  </p>
                  <p>{credit.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* <div
        className="relative h-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 flex h-16 w-full items-center justify-between bg-white px-4 font-[Nimbus-Cond] text-sm text-black">
          <p>ANTERIOR</p>
          <p>INICIO</p>
          <p>SIGUIENTE</p>
        </div>
      </div> */}
    </>
  );
}
