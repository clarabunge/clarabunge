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
    <div className="grid grid-cols-3 gap-2">
      {data.images.map((image) => (
        <img
          key={image._key}
          src={image.url + "?h=500&fm=webp"}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
