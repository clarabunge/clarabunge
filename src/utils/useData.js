import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity/sanity-utils";

export function useIntroUrl() {
  return useQuery({
    queryKey: ["introUrl"],
    queryFn: sanityUtils.getIntroUrl,
  });
}

export function useMainContent() {
  return useQuery({
    queryKey: ["initialData"],
    queryFn: sanityUtils.getMainContent,
  });
}

export function useImageGallery(slug) {
  return useQuery({
    queryKey: ["imageGallery", slug],
    queryFn: () => sanityUtils.getImageGallery(slug),
  });
}
