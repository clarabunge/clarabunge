import { useState } from "react";
import { useImageGallery } from "../utils/useData";
import { motion, AnimatePresence } from "motion/react";
import useIsMobile from "../utils/useIsMobile";
import Lightbox from "./Lightbox";

export default function ImageGallery({ slug }) {
  const { data, isLoading, error } = useImageGallery(slug);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p>＞﹏＜</p>
      </div>
    );
  }
  if (!data.images) return null;

  return (
    <>
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            key="lightbox"
            currentImage={currentImage}
            setIsLightboxOpen={setIsLightboxOpen}
          />
        )}
      </AnimatePresence>
      <div className="columns-xs gap-8 px-4 pt-4">
        {data.images.map((image) => (
          <div
            key={image._key}
            className={`${isMobile ? "" : "cursor-pointer"} pb-8`}
            onClick={() => {
              if (!isMobile) {
                setCurrentImage(image.url + "?fm=webp");
                setIsLightboxOpen(true);
              }
            }}
          >
            <img
              src={image.url + "?h=1000&fm=webp"}
              alt={image.alt}
              className="w-full rounded-sm"
            />
          </div>
        ))}
      </div>
    </>
  );
}
