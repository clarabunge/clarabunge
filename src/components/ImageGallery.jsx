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
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
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
      <div className="columns-1 gap-8 pt-4 transition-all duration-300 sm:columns-2 md:columns-3 md:px-4 xl:columns-4 2xl:columns-5">
        {data.images.map((image) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            key={image._key}
            className={`${isMobile ? "" : "cursor-pointer"} mb-8 break-inside-avoid-column rounded-sm`}
            onClick={() => {
              if (!isMobile) {
                setCurrentImage(image.url + "?fm=webp");
                setIsLightboxOpen(true);
              }
            }}
            style={{
              backgroundImage: `url(${image.url}?h=10&blur=30&fm=webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: `${image.dimensions.aspectRatio}/1`,
            }}
          >
            <img
              src={image.url + "?h=1000&fm=webp"}
              alt={image.alt}
              className="w-full rounded-sm transition-opacity duration-300"
              loading="lazy"
              style={{ opacity: 0 }}
              onLoad={(e) => {
                e.target.style.opacity = 1;
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
