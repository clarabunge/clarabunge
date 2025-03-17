import { PortableText } from "@portabletext/react";
import { useMainContent } from "../utils/useData";
import useLanguage from "../utils/useLanguage";

export default function Info() {
  const { data } = useMainContent();
  const { language } = useLanguage();

  return (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center font-[Nimbus-Cond] text-2xl backdrop-brightness-20 backdrop-grayscale-100">
      <div className="max-w-3/4 columns-2 gap-8">
        <div className="flex flex-col gap-4">
          <PortableText value={data?.about?.bio[language]} />
        </div>
        {data?.about?.contact && (
          <div className="my-8 text-xl text-white/70 uppercase">
            <a href={`mailto:${data?.about?.contact.email}`}>
              {data?.about?.contact.email}
            </a>
            <div>{data?.about?.contact.phone}</div>
          </div>
        )}
      </div>
    </div>
  );
}
