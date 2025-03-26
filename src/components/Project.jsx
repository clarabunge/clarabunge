import { useMainContent } from "../utils/useData";
import VideoPlayer from "./VideoPlayer";
import ImageGallery from "./ImageGallery";
import { PortableText } from "@portabletext/react";
import useLanguage from "../utils/useLanguage";
import { AnimatePresence, motion } from "motion/react";
import { NavLink, useLocation, useParams } from "react-router";
import { useEffect } from "react";
import Line from "./Line";
import Footer from "./Footer";

export default function Project() {
  const { data, isLoading } = useMainContent();
  const { language } = useLanguage();
  const { slug } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const nextProject =
    data?.projects[
      data?.projects.indexOf(projectData) + 1 > data?.projects.length - 1
        ? 0
        : data?.projects.indexOf(projectData) + 1
    ];

  const prevProject =
    data?.projects[
      data?.projects.indexOf(projectData) - 1 < 0
        ? data?.projects.length - 1
        : data?.projects.indexOf(projectData) - 1
    ];

  return (
    <>
      <AnimatePresence>
        <motion.section
          className="bg-background flex flex-col gap-8 p-4 py-16 text-xs md:px-8 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-4 md:gap-y-12">
            <div className="text-secondary flex flex-col justify-end gap-2 justify-self-end font-[detail] uppercase md:rotate-180 md:[writing-mode:vertical-rl]">
              <div className="flex flex-col items-end md:flex-row md:justify-between">
                <div>
                  <div className="bg-primary mr-2 inline-block size-3 rounded-full blur-[2px] md:m-0 md:mb-2" />
                  {projectData?.location?.city ?? "-"},{" "}
                  {projectData?.location?.country ?? "-"}
                </div>

                <div>{projectData?.location?.coordinates ?? "-"}</div>
              </div>
            </div>

            <div className="group relative w-full overflow-hidden rounded-md drop-shadow-[0_0_4px_#070707] select-none md:col-span-10 md:col-start-2">
              <VideoPlayer videoUrl={projectData?.videoUrl} />
            </div>

            <div className="row-span-2 flex flex-col items-end font-[detail] uppercase md:col-start-1">
              <div className="text-secondary w-max">
                {projectData?.date.slice(0, 4) ?? "-"}
              </div>

              <div className="bg-secondary text-background w-max leading-none">
                {projectData?.typeOfProject?.type?.[language] ?? "-"}
              </div>
            </div>

            <div className="flex items-start justify-between md:col-span-10 md:col-start-2">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className="font-[display] text-4xl tracking-tighter uppercase md:text-5xl"
              >
                {projectData?.title?.[language] || projectData?.title?.es}
              </motion.h2>

              <div className="flex flex-wrap gap-1 pt-4">
                {projectData?.roles?.map((role) => (
                  <div
                    className="border-secondary-dim text-secondary rounded-full border px-2 font-[detail] leading-none lowercase"
                    key={role._id}
                  >
                    {role.role[language]}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-secondary flex columns-2 flex-col gap-4 pb-16 text-base md:col-span-6 md:col-start-2">
              <Line className="-ml-4" wobbliness={0.2} />
              <PortableText value={projectData?.description?.[language]} />
            </div>

            <div className="text-end md:col-span-4 md:col-start-8">
              {projectData?.links && projectData?.linksSectionTitle && (
                <li className="text-secondary flex items-center justify-end gap-2 font-[detail] text-xs uppercase">
                  {projectData?.linksSectionTitle[language]}
                  <span className="w-6">
                    <Line wobbliness={0.02} />
                  </span>
                </li>
              )}
              {projectData?.links &&
                projectData.links.map((link) => (
                  <a
                    key={link._key}
                    className="uppercase"
                    href={link.url}
                    target="_blank"
                  >
                    <span className="hover:bg-text hover:text-background transition-colors">
                      {link.title[language]}
                    </span>
                  </a>
                ))}

              <img
                src="/img/asterisco.svg"
                alt=""
                className="ml-auto size-14 -rotate-12 blur-[0.5px]"
              />
            </div>

            {projectData?.acknowledgements && (
              <div className="flex flex-wrap items-center justify-center gap-4 md:col-span-8 md:col-start-3">
                {projectData.acknowledgements.map((acknowledgement) => (
                  <div key={acknowledgement._key}>
                    {acknowledgement.link ? (
                      <a href={acknowledgement.link} target="_blank">
                        {" "}
                        <img
                          src={acknowledgement.image.url + "?w20&fm=webp"}
                          alt=""
                          className="w-[150px] bg-white md:max-w-[200px]"
                        />
                      </a>
                    ) : (
                      <img
                        src={acknowledgement.image.url + "?h=500&fm=webp"}
                        alt=""
                        className="w-[150px] bg-white md:max-w-[200px]"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="md:col-span-12 md:col-start-1">
              <ImageGallery slug={projectData?.slug?.current} />
            </div>

            {projectData?.credits && (
              <motion.div className="flex max-w-3xl flex-col items-center gap-4 place-self-center text-center uppercase md:col-span-12">
                {projectData.credits.map((credit) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 1 } }}
                    key={credit._key}
                  >
                    <p className="text-secondary font-[detail] text-xs">
                      {credit.role[language]}
                    </p>
                    <p>{credit.name}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="mx-auto w-40">
            <Line height={"12"} wobbliness={0.15} />
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer prevProject={prevProject} nextProject={nextProject} />
    </>
  );
}
