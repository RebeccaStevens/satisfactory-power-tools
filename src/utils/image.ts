type ImageSrcs = Array<{
  src: string;
  size: number;
  format: string;
}>;

/**
 * Create a srcset from the given image meta data.
 */
export function createSrcset(images: Readonly<ImageSrcs>) {
  return Object.values(images)
    .map((image) => `${image.src} ${image.size}w`)
    .join(", ");
}
