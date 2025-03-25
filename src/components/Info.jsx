import { PortableText } from "@portabletext/react";
import { useMainContent } from "../utils/useData";
import useLanguage from "../utils/useLanguage";
import { motion } from "motion/react";

export default function Info() {
  const { data } = useMainContent();
  const { language } = useLanguage();

  const components = {
    block: {
      normal: (props) => (
        <p className="break-inside-avoid pb-4">{props.children}</p>
      ),
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center text-white backdrop-brightness-5 backdrop-grayscale-100 md:text-xl md:backdrop-brightness-20"
    >
      <div className="relative gap-8 overflow-y-auto px-4 pt-24 pb-12 md:max-w-3/4 md:columns-2 md:p-0 md:pt-32">
        <PortableText
          components={components}
          value={data?.about?.bio[language]}
        />

        <div className="text-secondary-dim mt-14 flex flex-col items-start text-base uppercase">
          {data?.about?.contact.email && (
            <a
              href={`mailto:${data?.about?.contact.email}`}
              className="transition-colors hover:text-white"
            >
              {data.about.contact.email}
            </a>
          )}
          {data.about.contact.phone && (
            <div className="font-[detail] transition-colors hover:text-white">
              {data.about.contact.phone}
            </div>
          )}
          {data.about.contact.instagram && (
            <a
              href={`https://instagram.com/${data.about.contact.instagram}`}
              target="_blank"
              className="transition-colors hover:text-white"
            >
              instagram
            </a>
          )}
          {data?.about?.cv?.asset?.url && (
            <a
              href={data?.about?.cv?.asset?.url}
              target="_blank"
              className="text-secondary-dim text-lg transition-colors hover:text-white"
            >
              CV
            </a>
          )}
        </div>

        <img
          src="/img/corazon.svg"
          alt=""
          className="absolute right-8 size-16 rotate-[20deg] opacity-50 select-none md:right-1/4 md:-bottom-10"
        />
      </div>
      {/* {data?.about?.image?.url && (
        <img
          src={data?.about?.image?.url + "?h=500&fm=webp"}
          alt="Clara Bunge"
        />
      )} */}
    </motion.div>
  );
}
