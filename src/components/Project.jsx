import { useState } from "react";
import { useMainContent } from "../utils/useData";
import VideoPlayer from "./VideoPlayer";
import ImageGallery from "./ImageGallery";
import { PortableText } from "@portabletext/react";
import useLanguage from "../utils/useLanguage";

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
      {playerIsOpen && (
        <div className="fixed top-0 left-0 z-100 flex h-screen w-full items-center justify-center bg-black">
          <button
            className="absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black p-2 text-white"
            onClick={() => setPlayerIsOpen(false)}
          >
            close
          </button>
          <VideoPlayer videoUrl={projectData?.videoUrl} />
        </div>
      )}
      <section className="px-4">
        <div
          className="cursor-pointer py-16"
          onClick={() => setPlayerIsOpen(true)}
        >
          <img src={projectData?.image?.url + "?h=1080&fm=webp"} alt="" />
        </div>
        <h2 className="font-[Nimbus-Bold] text-4xl">{projectData?.title}</h2>
        <div className="pt-2 font-[Mplus] text-xs">
          <div>{projectData?.typeOfProject?.type?.[language]}</div>
          <div>{projectData?.date?.split("-")[0]}</div>
        </div>
        <div className="py-8">
          <PortableText value={projectData?.description?.[language]} />
        </div>
        <div className="text-end font-[Mplus] text-xs">
          <div>
            {projectData?.location?.city}, {projectData?.location?.country}
          </div>
          <div>{projectData?.location?.coordinates}</div>
        </div>
        {projectData?.links && (
          <ul className="py-8">
            {projectData.links.map((link) => (
              <li key={link._key}>
                <a href={link.url} target="_blank">
                  {link.title[language]}
                </a>
              </li>
            ))}
          </ul>
        )}
        <ImageGallery slug={projectData?.slug?.current} />
      </section>
    </>
  );
}
