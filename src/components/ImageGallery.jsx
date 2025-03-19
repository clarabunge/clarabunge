import { useImageGallery } from "../utils/useData";

export default function ImageGallery({ slug }) {
  const { data, isLoading, error } = useImageGallery(slug);

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
    <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
      {data.images.map((image) => (
        <div key={image._key} className="pb-4">
          <img
            src={image.url + "?h=500&fm=webp"}
            alt={image.alt}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
}
