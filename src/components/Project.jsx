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
                  <div className="bg-primary mr-2 inline-block size-2 rounded-full blur-[2px] md:m-0 md:mb-2" />
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

            <div className="flex flex-wrap items-start justify-between md:col-span-10 md:col-start-2">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className="font-[display] text-3xl tracking-tighter uppercase md:text-5xl"
              >
                {projectData?.title?.[language] || projectData?.title?.es}
              </motion.h2>

              <div className="flex flex-wrap gap-1 pt-4">
                <svg
                  id="Layer_2"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50.16 38.46"
                  fill="var(--color-secondary-dim)"
                  className="mr-1 size-3"
                >
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M11.62.5c7.31-2.15,9.34,3.23,13.45,3.47,3.74.21,8.03-2.53,13.95-1.75,26.28,3.48,1.55,42.05-27.41,35.49-17.25-3.91-13.6-33.22.01-37.21ZM20.17,4.17c-9.11-8.11-29.21,27.38-2.8,29.95,6.95.68,16.34-3.65,20.79-8.98-5.45-1.25-8.18,3.43-14.94,3.14-2.9-.12-8.62-1.65-10.12-4.09-4.72-7.7,9.93-17.47,7.06-20.02Z" />
                  </g>
                </svg>
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
                    className="group relative uppercase"
                    href={link.url}
                    target="_blank"
                  >
                    <div className="bg-text absolute bottom-0 left-0 h-full w-0 transition-all duration-400 group-hover:w-full" />
                    <span className="hover:text-background relative z-10 transition-colors">
                      {link.title[language]}
                    </span>
                  </a>
                ))}

              {/* <img
                src="/img/asterisco.svg"
                alt=""
                className="ml-auto size-14 -rotate-12 blur-[0.5px]"
              /> */}
              <svg
                className="ml-auto size-10 pt-2 blur-[0.5px]"
                id="Layer_2"
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 146.05 150.17"
                fill="var(--color-primary)"
              >
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M81.95,59.93l25.81-13.15,38.13-28.82c1.43,1.46-7.31,12.12-8.96,14.01-11.64,13.4-27.99,23.86-42.95,33.05-3.09,1.9-14.13,4.21-5.12,6.93,11.96,3.62,27.5,4.89,38.44,9.57,3.52,1.51,9.32,3.5,8.59,8.38-20.39.27-40.07-4.63-59.96-8-1.12,9.92-7.18,64.93-13.03,67.96-3.48,1.8-4.5-5.12-4.78-7.16-2.71-19.8,4.49-39.24,5.79-58.78L6.09,111.08C4.15,113.14-.04,110.16,0,108.91c.22-6.91,49.14-30.13,57.92-33.01l-34.64-16.29c-4.51-1.67-7.72-8.24-2.24-9.65,3.81-.98,39.58,14.62,46.87,15.98C70.48,57.27,83.16.3,88.93,0c3.24-.17,3.16,8.59,3.02,10.9-.45,7.7-12.42,46.18-10,49.03Z" />
                </g>
              </svg>
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
