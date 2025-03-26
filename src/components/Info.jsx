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
      className="no-doc-scroll fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center text-white backdrop-brightness-5 backdrop-grayscale-100 md:backdrop-brightness-10 lg:text-xl"
    >
      <div className="relative gap-8 px-4 pt-24 pb-12 max-sm:h-full max-sm:overflow-y-auto md:max-w-3/4 md:columns-2 md:p-0 md:pt-32">
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

        <svg
          className="absolute right-8 size-16 opacity-50 select-none md:right-1/6 md:-bottom-6"
          fill="var(--color-primary)"
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 87.33 138.49"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M39.54,58.55c12.77-9.44,25.85-31.55,44.66-25.68,2.85.89,3.91,3.02,2.53,5.78L13.54,138.49c3.43-19.94-5.98-39.64-9.38-59.59-3.69-21.64-7.12-45.53-.07-66.78,5.64-16.98,17.76-14.87,26.33-1.47,8.58,13.42,6.59,32.67,9.11,47.88ZM29.54,74.54c7.24-15.45,6.88-53.51-4.92-66.05C14.5-2.26,9.81,3.4,6.52,14.54c-10.82,36.67,6.45,75.79,11.03,111.97L83.5,36.58c-15.79-2.08-33.11,14.65-43.08,25.87-3.68,4.14-3.33,10.76-10.88,12.09Z" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
