import { PortableText } from "@portabletext/react";
import { useMainContent } from "../utils/useData";
import useLanguage from "../utils/useLanguage";
import { motion } from "motion/react";

export default function Info() {
  const { data } = useMainContent();
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center font-[Nimbus-Cond] text-2xl backdrop-brightness-20 backdrop-grayscale-100"
    >
      <div className="relative max-w-3/4 columns-2 gap-8">
        <div className="flex flex-col gap-4">
          <PortableText value={data?.about?.bio[language]} />
        </div>

        <div className="mt-8 flex flex-col items-start text-lg text-[var(--secondary)] uppercase">
          {data?.about?.contact.email && (
            <a
              href={`mailto:${data?.about?.contact.email}`}
              className="transition-colors hover:text-white"
            >
              {data.about.contact.email}
            </a>
          )}
          {data.about.contact.phone && (
            <div className="font-[display] transition-colors hover:text-white">
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
              className="text-lg text-[var(--secondary)] transition-colors hover:text-white"
            >
              CV
            </a>
          )}
        </div>

        <img
          src="/img/corazon.svg"
          alt=""
          className="absolute right-1/4 -bottom-10 size-16 rotate-[20deg] opacity-50"
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
