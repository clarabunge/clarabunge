import { client } from "./sanity-client";

export async function getIntroUrl() {
  return client.fetch(`*[_type == 'siteConfig'][0]{introUrl}`);
}

export async function getMainContent() {
  return client.fetch(`{
    'about': *[_type == 'about'][0]{
        bio, 
        contact, 
        cv{asset->{url}},
        image{'url': asset->url}},
    'projects': *[_type == 'project']{
        _id, 
        title, 
        slug, 
        date,
        typeOfProject->{_id, type},
        image{'url': asset->url,}, 
        videoUrl,
        isTrailer,
        previewUrl,
        description, 
        location,
        linksSectionTitle,
        links,
        acknowledgements[]{_key, image{'url': asset->url,}, link},
        credits,
    },
  }`);
}

export async function getImageGallery(slug) {
  return client.fetch(
    `*[_type == 'project' && slug.current == $slug][0]{
        images[]{_key, 'url': asset->url,} 
    }`,
    { slug },
  );
}
