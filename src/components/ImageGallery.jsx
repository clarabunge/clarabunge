import { useState } from "react";
import { useImageGallery } from "../utils/useData";
import { motion, AnimatePresence } from "motion/react";
import useIsMobile from "../utils/useIsMobile";

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
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-doc-scroll fixed inset-0 z-100 flex h-screen w-screen cursor-zoom-out items-center justify-center backdrop-brightness-20 backdrop-grayscale-100"
            onClick={() => setIsLightboxOpen(false)}
          >
            <img
              src={currentImage}
              alt=""
              className="h-auto max-h-[95vh] w-auto max-w-[95vw]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {data.images.map((image) => (
          <div
            key={image._key}
            className={`${isMobile ? "" : "cursor-pointer"} pb-4`}
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
              className="w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
