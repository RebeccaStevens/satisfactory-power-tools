import { Option } from "effect";

import type { FGImage } from "~/types";

export type FGImgProps = {
  image: Option.Option<FGImage>;
  alt: string;
  size: (typeof FGImgSize)[number];
  className?: string;
};

export const FGImgFormats = ["jxl", "avif"] as const;
export const FGImgSize = [32, 64, 96, 128, 256] as const;

export function FGImg({ image, alt, className, size }: FGImgProps) {
  if (Option.isSome(image)) {
    const imagePath = `/images/vendor/${image.value}`;

    const mut_jxlSrcSet = [];
    const mut_avifSrcSet = [];

    // eslint-disable-next-line functional/no-loop-statements
    for (const sourceSize of FGImgSize) {
      const scale = (sourceSize / size).toFixed(2);
      mut_jxlSrcSet.push(`${imagePath}_${sourceSize}.jxl ${scale}x`);
      mut_avifSrcSet.push(`${imagePath}_${sourceSize}.avif ${scale}x`);
    }

    return (
      <picture>
        <source srcSet={mut_jxlSrcSet.join(",")} type="image/jxl" />
        <source srcSet={mut_avifSrcSet.join(",")} type="image/avif" />
        <img alt={alt} className={className} />
      </picture>
    );
  }
  return <div className={className} />;
}
