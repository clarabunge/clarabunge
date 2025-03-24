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
          className="bg-background flex flex-col gap-8 px-8 py-24 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-12 gap-x-4 gap-y-12">
            <div className="text-secondary flex rotate-180 flex-col justify-end gap-2 justify-self-end font-[detail] uppercase [writing-mode:vertical-rl]">
              {/* <div className="text-secondary">
                {projectData?.date.slice(0, 4) ?? "-"}
              </div> */}

              {/* <div className="w-max self-start bg-secondary px-1 leading-none text-black">
                {projectData?.typeOfProject?.type?.[language] ?? "-"}
              </div> */}

              <div className="flex justify-between">
                <div className="text-secondary font-[detail]">
                  <div className="bg-primary mb-2 inline-block size-3 rounded-full blur-[2px]" />
                  {projectData?.location?.city ?? "-"},{" "}
                  {projectData?.location?.country ?? "-"}
                </div>
                <div className="text-secondary font-[detail]">
                  {projectData?.location?.coordinates ?? "-"}
                </div>
              </div>
            </div>

            <div className="group relative col-span-10 col-start-2 w-full overflow-hidden rounded-md select-none">
              <VideoPlayer videoUrl={projectData?.videoUrl} />
            </div>

            <div className="col-start-1 flex flex-col items-end font-[detail] uppercase">
              <div className="text-secondary w-max">
                {projectData?.date.slice(0, 4) ?? "-"}
              </div>

              <div className="bg-secondary text-background w-max leading-none">
                {projectData?.typeOfProject?.type?.[language] ?? "-"}
              </div>
            </div>

            <div className="col-span-10 col-start-2 flex flex-col items-start gap-4">
              <h2 className="font-[display] text-5xl tracking-tighter uppercase">
                {projectData?.title?.[language] || projectData?.title?.es}
              </h2>
              {/* <div className="w-max self-start bg-secondary px-1 font-[detail] leading-none text-background uppercase">
                {projectData?.typeOfProject?.type?.[language] ?? "-"}
              </div> */}
            </div>

            <div className="text-secondary col-span-8 col-start-4 flex flex-col gap-4 pb-16 text-lg">
              <PortableText value={projectData?.description?.[language]} />
            </div>

            <div className="w-max -rotate-12 justify-self-center select-none">
              <img
                src="/img/asterisco.svg"
                alt=""
                className="size-16 blur-[0.5px]"
              />
            </div>

            {projectData?.acknowledgements && (
              <div className="col-span-8 col-start-3 flex items-center justify-center gap-4">
                {projectData.acknowledgements.map((acknowledgement) => (
                  <div key={acknowledgement._key}>
                    {acknowledgement.link ? (
                      <a href={acknowledgement.link} target="_blank">
                        {" "}
                        <img
                          src={acknowledgement.image.url + "?w20&fm=webp"}
                          alt=""
                          className="bg-background max-w-[150px]"
                        />
                      </a>
                    ) : (
                      <img
                        src={acknowledgement.image.url + "?h=500&fm=webp"}
                        alt=""
                        className="bg-background max-w-[300px]"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {projectData?.links && (
              <div className="col-span-4 col-start-8 text-end">
                {projectData?.linksSectionTitle && (
                  <li className="text-secondary flex items-center justify-end gap-2 font-[detail] text-xs uppercase">
                    {projectData?.linksSectionTitle[language]}
                    <span className="bg-secondary inline-block h-[1px] w-6" />
                  </li>
                )}
                {projectData.links.map((link) => (
                  <a
                    key={link._key}
                    className="uppercase"
                    href={link.url}
                    target="_blank"
                  >
                    <span className="hover:bg-text hover:text-background">
                      {link.title[language]}
                    </span>
                  </a>
                ))}
              </div>
            )}

            <div className="col-span-12 col-start-1">
              <ImageGallery slug={projectData?.slug?.current} />
            </div>

            {projectData?.credits && (
              <div className="col-span-12 flex max-w-3xl flex-col items-center gap-4 place-self-center text-center uppercase">
                {projectData.credits.map((credit) => (
                  <div key={credit._key}>
                    <p className="text-secondary font-[detail] text-xs">
                      {credit.role[language]}
                    </p>
                    <p>{credit.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <img
            src="/img/linea.svg"
            alt=""
            className="mx-auto w-32 select-none"
          />
        </motion.section>
      </AnimatePresence>

      {/* <div
        className="relative h-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 flex h-16 w-full items-center justify-between bg-secondary px-4 font-[detail] text-xs text-black">
          <p>ANTERIOR</p>
          <p>INICIO</p>
          <p>SIGUIENTE</p>
        </div>
      </div> */}
    </>
  );
}
